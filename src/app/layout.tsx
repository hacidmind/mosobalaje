import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: {
    default: 'Mosobalaje Vehicle Imports | Premium Automotive Sourcing & Sales Nigeria',
    template: '%s | Mosobalaje Vehicle Imports',
  },
  description: 'Mosobalaje Vehicle Imports is Nigeria\'s trusted automotive sourcing and importation specialist. Transparent vehicle clearance, verified inspections, and direct delivery across Nigeria.',
  metadataBase: new URL(process.env.APP_URL || 'https://mosobalajeimports.ng'),
  openGraph: {
    type: 'website',
    locale: 'en_NG',
    siteName: 'Mosobalaje Vehicle Imports',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-[#fcfbf9] text-stone-900 font-sans selection:bg-amber-500 selection:text-stone-950 antialiased overflow-x-hidden">
        {children}
      </body>
    </html>
  );
}
