/**
 * Import function triggers from their respective submodules:
 *
 * import {onCall} from "firebase-functions/v2/https";
 * import {onDocumentWritten} from "firebase-functions/v2/document";
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

import * as logger from "firebase-functions/logger";
import { onDocumentCreated } from "firebase-functions/v2/firestore";
import { HttpsError, onCall } from "firebase-functions/v2/https";
import * as admin from "firebase-admin";
import { CloudTasksClient } from "@google-cloud/tasks";

admin.initializeApp();

const db = admin.firestore();
const messaging = admin.messaging();

const PROJECT_ID = process.env.GCLOUD_PROJECT || "";
const LOCATION_ID = "us-central1"; // Or your preferred location

const tasksClient = new CloudTasksClient();
const queuePath = tasksClient.queuePath(PROJECT_ID, LOCATION_ID, "reminders-queue");

// Schedules a Cloud Task to send a reminder notification.
export const scheduleReminder = onDocumentCreated("reminders/{reminderId}", async (event) => {
    const snapshot = event.data;
    if (!snapshot) {
        logger.warn("No data associated with the event");
        return;
    }
    const data = snapshot.data();
    const reminderId = event.params.reminderId;

    const { task, date, time } = data;

    const reminderDateTime = new Date(`${date}T${time}`);
    const now = new Date();

    if (reminderDateTime <= now) {
        logger.info(`Reminder ${reminderId} is in the past. Not scheduling.`);
        return;
    }

    const scheduleSeconds = Math.floor(reminderDateTime.getTime() / 1000);

    const taskPayload = {
        reminderId,
        task,
    };
    
    const cloudTask = {
        httpRequest: {
            httpMethod: "POST" as const,
            url: `https://${LOCATION_ID}-${PROJECT_ID}.cloudfunctions.net/sendReminderNotification`,
             headers: {
                "Content-Type": "application/json",
            },
            body: Buffer.from(JSON.stringify(taskPayload)).toString("base64"),
        },
        scheduleTime: {
            seconds: scheduleSeconds,
        },
    };

    try {
        await tasksClient.createTask({
            parent: queuePath,
            task: cloudTask,
        });
        logger.info(`Task created for reminder ${reminderId} to trigger at ${reminderDateTime.toISOString()}`);
    } catch (error) {
        logger.error(`Error scheduling task for reminder ${reminderId}:`, error);
    }
});


// HTTP-triggered function to send the notification.
export const sendReminderNotification = onCall({ cors: true }, async (request) => {
    const { reminderId, task } = request.data;
    
    if (!reminderId || !task) {
        throw new HttpsError("invalid-argument", "The function must be called with 'reminderId' and 'task'.");
    }
    
    logger.info(`Sending notification for reminder task: "${task}"`);

    const tokensSnapshot = await db.collection('fcm_tokens').get();
    if (tokensSnapshot.empty) {
        logger.info("No device tokens found. No notifications sent.");
        return { success: true, message: "No device tokens found." };
    }

    const tokens = tokensSnapshot.docs.map(doc => doc.data().token);

    const message: admin.messaging.MulticastMessage = {
        tokens,
        notification: {
            title: "Farm Reminder",
            body: task,
        },
        webpush: {
            fcmOptions: {
                link: '/reminders',
            },
        },
    };

    try {
        const batchResponse = await messaging.sendEachForMulticast(message);
        logger.info(`Successfully sent ${batchResponse.successCount} messages.`);
        if (batchResponse.failureCount > 0) {
            logger.warn(`Failed to send ${batchResponse.failureCount} messages.`);
        }
        return { success: true, ...batchResponse };
    } catch (error) {
        logger.error("Error sending notifications:", error);
        throw new HttpsError("internal", "Failed to send notifications.");
    }
});
