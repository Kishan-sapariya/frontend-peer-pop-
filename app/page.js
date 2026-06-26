import { redirect } from "next/navigation";

// The public landing page now lives at /home. The old waitlist landing was removed.
export default function RootPage() {
  redirect("/home");
}
