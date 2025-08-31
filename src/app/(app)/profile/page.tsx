import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Bell } from "lucide-react";

export default function ProfilePage() {
  return (
    <div className="max-w-2xl mx-auto space-y-6">
       <div>
        <h1 className="text-3xl font-bold tracking-tight">Profile</h1>
        <p className="text-muted-foreground">Manage your account settings and personal information.</p>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Personal Information</CardTitle>
          <CardDescription>Update your name and phone number.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Full Name</Label>
            <Input id="name" defaultValue="Rakesh Sharma" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="phone">Phone Number</Label>
            <Input id="phone" type="tel" defaultValue="+91 98765 43210" />
          </div>
        </CardContent>
        <CardFooter>
          <Button>Save Changes</Button>
        </CardFooter>
      </Card>
      <Card>
        <CardHeader>
            <CardTitle>Notifications</CardTitle>
            <CardDescription>Manage how you receive notifications from the app.</CardDescription>
        </CardHeader>
        <CardContent>
           <div className="flex items-center justify-between p-4 rounded-lg bg-secondary/30">
                <div className="flex items-center gap-3">
                    <Bell className="h-5 w-5 text-primary"/>
                    <div>
                        <p className="font-medium">SMS Reminders</p>
                        <p className="text-sm text-muted-foreground">Receive reminders for fertilizer application.</p>
                    </div>
                </div>
                <Switch defaultChecked />
           </div>
        </CardContent>
      </Card>
    </div>
  );
}
