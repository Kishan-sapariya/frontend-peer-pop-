// Builds Next.js Metadata for a profile from the PUBLIC (unauthenticated) meta
// endpoint, so shared profile links render rich Open Graph / Twitter previews
// for logged-out viewers and crawlers.

const API_URL = process.env.NEXT_PUBLIC_BASE_API_URL;

const TYPE_LABEL = {
  YOUTUBER: "YouTuber",
  INFLUENCER: "Influencer",
  COMEDIAN: "Comedian",
  DANCER: "Dancer",
  MUSICIAN: "Musician",
  FILMMAKER: "Filmmaker",
  BUSINESS: "Business",
};

export async function buildProfileMetadata(username) {
  try {
    const res = await fetch(`${API_URL}/public/profile/${username}`, {
      cache: "no-store",
    });
    if (!res.ok) throw new Error("not found");
    const p = await res.json();

    const name = p.name || username;
    const role = p.creatorType
      ? TYPE_LABEL[p.creatorType] || "Creator"
      : "Creator";
    // Document <title> — the root layout template appends " | PeerPop".
    const title = role !== "Creator" ? `${name} — ${role}` : name;
    // OG/Twitter titles don't go through the template, so brand them here.
    const fullTitle = `${title} | PeerPop`;
    const description =
      p.bio ||
      `${name}${p.niche ? ` — ${p.niche}` : ""} · ${role} on PeerPop, the professional network where creators connect, collaborate, and grow.`;
    const images = p.image
      ? [{ url: p.image, width: 400, height: 400, alt: name }]
      : [];

    return {
      title,
      description,
      openGraph: {
        title: fullTitle,
        description,
        type: "profile",
        url: `/profile/${username}`,
        siteName: "PeerPop",
        images,
      },
      twitter: {
        card: "summary",
        title: fullTitle,
        description,
        images: p.image ? [p.image] : [],
      },
    };
  } catch {
    return {
      title: `${username} · PeerPop`,
      description: "A creator profile on PeerPop.",
    };
  }
}
