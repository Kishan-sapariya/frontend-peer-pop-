// Server wrapper for business profiles (separate route path) — adds Open Graph
// / Twitter metadata for link previews. Child page stays a client component.

import { buildProfileMetadata } from "@/lib/profileMetadata";

export async function generateMetadata({ params }) {
  const { username } = await params;
  return buildProfileMetadata(username);
}

export default function BusinessProfileLayout({ children }) {
  return children;
}
