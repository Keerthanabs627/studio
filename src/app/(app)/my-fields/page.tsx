import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function MyFieldsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">My Fields</h1>
        <p className="text-muted-foreground">Manage your fields and track your crops.</p>
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
