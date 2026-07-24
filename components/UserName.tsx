import { auth } from '@/auth';

export default async function DashboardPage() {
  const session = await auth();
  const user = session?.user;

  console.log("[Session UserName]", JSON.stringify(session, null, 2));

  return <p>Welcome, {user?.name}!</p>;
}