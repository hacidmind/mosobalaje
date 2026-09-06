import { ToastProvider } from '@/src/components/ui/Toast';
import { Navbar } from '@/src/components/layout/Navbar';
import { Footer } from '@/src/components/layout/Footer';
import { getSettings } from '@/src/lib/data';

// Site settings are editable; read them at request time, not during builds.
export const dynamic = 'force-dynamic';

export default async function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const settings = await getSettings().catch(() => ({
    phone: '0906 415 3303',
    whatsappNumber: '2349064153303',
  }));

  return (
    <ToastProvider>
      <div className="min-h-screen flex flex-col">
        <a href="#main-content" className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:rounded-xl focus:bg-white focus:px-5 focus:py-3 focus:text-stone-900">Skip to content</a>
        <Navbar settings={settings} />
        <main id="main-content" tabIndex={-1} className="flex-1">{children}</main>
        <Footer settings={settings} />
      </div>
    </ToastProvider>
  );
}