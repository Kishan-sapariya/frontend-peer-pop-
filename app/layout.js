import "./globals.css";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import ClientLayout from "./ClientLayout";

const SITE_URL = "https://peerpop.in";
const TITLE = "PeerPop — Where Creators Meet Opportunity";
const DESCRIPTION =
  "PeerPop is the professional network for creators to connect, collaborate, and grow together. Discover endless opportunities with brands and fellow creators.";

export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: TITLE,
    template: "%s | PeerPop",
  },
  description: DESCRIPTION,
  keywords: [
    "creator network",
    "creator collaboration",
    "influencer marketing",
    "brand partnerships",
    "PeerPop",
  ],
  icons: { icon: "/logo.png" },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: SITE_URL,
    siteName: "PeerPop",
    type: "website",
    images: [
      { url: "/og-image.jpg", width: 1200, height: 630, alt: "PeerPop — Where Creators Meet Opportunity" },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
    images: ["/og-image.jpg"],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-KJPGS7SS');`,
          }}
        />
      </head>

      <body
        className={`${GeistSans.variable} ${GeistMono.variable} antialiased overflow-x-hidden`}
      >
        <div
          dangerouslySetInnerHTML={{
            __html: `<noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-KJPGS7SS"
      height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>`,
          }}
        />

        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
