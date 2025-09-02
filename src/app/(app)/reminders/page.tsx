
import { getReminders } from './actions';
import { RemindersClient } from './components/reminders-client';
import { getDictionary } from '@/locales/dictionaries';
import { getLocaleFromCookie } from '@/lib/utils';


export default async function RemindersPage() {
    const reminders = await getReminders();
    const locale = getLocaleFromCookie();
    const t = await getDictionary(locale);

    return <RemindersClient initialReminders={reminders} t={t} />;
}
