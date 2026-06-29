// Server component (NO "use client") so it can export generateMetadata for
// Open Graph / Twitter link previews. The child profile pages stay client
// components; this wrapper only adds per-profile metadata.

import { buildProfileMetadata } from "@/lib/profileMetadata";

export async function generateMetadata({ params }) {
  const { username } = await params;
  return buildProfileMetadata(username);
}

export default function ProfileUsernameLayout({ children }) {
  return children;
}
