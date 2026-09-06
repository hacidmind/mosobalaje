import { ToastProvider } from '@/src/components/ui/Toast';
import { Navbar } from '@/src/components/layout/Navbar';
import { Footer } from '@/src/components/layout/Footer';
import { getSettings } from '@/src/lib/data';

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
        <Navbar settings={settings} />
        <main className="flex-1">{children}</main>
        <Footer settings={settings} />
      </div>
    </ToastProvider>
  );
}