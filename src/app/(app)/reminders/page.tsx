
import { getReminders } from './actions';
import { RemindersClient } from './components/reminders-client';

export default async function RemindersPage() {
    const reminders = await getReminders();

    return <RemindersClient initialReminders={reminders} />;
}
