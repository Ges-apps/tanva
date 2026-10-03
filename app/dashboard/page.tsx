import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import DashboardClient from "./DashboardClient";
import { redirect } from "next/navigation";

export default async function Dashboard() {
  const { isAuthenticated } = getKindeServerSession();

  const authenticated = await isAuthenticated();

  if (!authenticated) {
    redirect("/");
  }

  return <DashboardClient />;
}