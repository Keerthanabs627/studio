import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function RemindersPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Reminders</h1>
        <p className="text-muted-foreground">Set and manage your farming reminders.</p>
      </div>
       <Card>
        <CardHeader>
          <CardTitle>Coming Soon</CardTitle>
        </CardHeader>
        <CardContent>
          <p>This feature is under construction. Please check back later.</p>
        </CardContent>
      </Card>
    </div>
  );
}
