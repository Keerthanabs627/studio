
import { DashboardClient } from "./components/dashboard-client";

export default function DashboardPage() {
    // This is now a simple, fast-loading server component.
    // The DashboardClient will handle all the data fetching on the client-side.
    return (
        <div>
            <DashboardClient profile={null} />
        </div>
    );
}
