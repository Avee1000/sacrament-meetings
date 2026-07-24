import { auth } from '@/auth';

export default async function DashboardPage() {
  const session = await auth();
  const user = session?.user;

  return <p>Welcome, {user?.name}!</p>;
}