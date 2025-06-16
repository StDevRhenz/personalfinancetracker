import { redirect } from "next/navigation";

// Home page
export default function HomePage() {
  redirect("/login");
  return null;
}
