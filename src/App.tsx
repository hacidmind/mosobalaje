import React, { useState, useEffect } from 'react';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { HomePage } from './pages/HomePage';
import { VehiclesPage } from './pages/VehiclesPage';
import { VehicleDetailPage } from './pages/VehicleDetailPage';
import { RequestVehiclePage } from './pages/RequestVehiclePage';
import { ImportProcessPage } from './pages/ImportProcessPage';
import { AboutPage } from './pages/AboutPage';
import { ContactPage } from './pages/ContactPage';
import { AdminPage } from './pages/AdminPage';
import { ToastProvider } from './components/ui/Toast';
import { store } from './lib/store';
import { Vehicle, WebsiteContentSettings } from './types';

export default function App() {
  const [currentRoute, setCurrentRoute] = useState<string>(() => {
    return window.location.pathname || '/';
  });

  const [vehicles, setVehicles] = useState<Vehicle[]>(() => store.getVehicles());
  const [settings, setSettings] = useState<WebsiteContentSettings>(() => store.getContentSettings());
  const [selectedVehicle, setSelectedVehicle] = useState<Vehicle | null>(null);

  // Search query & make filter state for navigation from home to /vehicles
  const [initialSearchQuery, setInitialSearchQuery] = useState('');
  const [initialMakeFilter, setInitialMakeFilter] = useState('');

  // Handle URL changes & popstate (browser back/forward navigation)
  useEffect(() => {
    const handleLocationChange = () => {
      const path = window.location.pathname || '/';
      const search = window.location.search;
      const params = new URLSearchParams(search);

      const q = params.get('q') || '';
      const make = params.get('make') || '';
      setInitialSearchQuery(q);
      setInitialMakeFilter(make);

      setCurrentRoute(path);

      // Check if it's a vehicle detail route: /vehicles/[slug]
      if (path.startsWith('/vehicles/') && path !== '/vehicles') {
        const slug = path.replace('/vehicles/', '');
        const found = store.getVehicleBySlug(slug);
        if (found) {
          setSelectedVehicle(found);
        }
      }
    };

    window.addEventListener('popstate', handleLocationChange);
    handleLocationChange();

    return () => window.removeEventListener('popstate', handleLocationChange);
  }, []);

  // Update vehicles and settings when store changes or route changes
  useEffect(() => {
    const syncData = () => {
      setVehicles(store.getVehicles());
      setSettings(store.getContentSettings());
    };
    syncData();
    const unsubscribe = store.subscribe(syncData);
    return unsubscribe;
  }, [currentRoute]);

  const activeWhatsappNumber = settings?.whatsappNumber || '2349064153303';
  const activePhone = settings?.phone || '0906 415 3303';

  const navigateTo = (route: string) => {
    window.scrollTo({ top: 0, behavior: 'smooth' });

    // Parse path and query
    const [path, query] = route.split('?');
    if (query) {
      const params = new URLSearchParams(query);
      setInitialSearchQuery(params.get('q') || '');
      setInitialMakeFilter(params.get('make') || '');
    } else {
      setInitialSearchQuery('');
      setInitialMakeFilter('');
    }

    // Check if route is a vehicle slug
    if (path.startsWith('/vehicles/') && path !== '/vehicles') {
      const slug = path.replace('/vehicles/', '');
      const found = store.getVehicleBySlug(slug);
      if (found) {
        setSelectedVehicle(found);
      }
    } else if (path === '/vehicles') {
      setSelectedVehicle(null);
    }

    try {
      window.history.pushState({}, '', route);
    } catch {
      // In restricted iframe environments fallback gracefully
    }
    setCurrentRoute(path);
  };

  const handleSelectVehicle = (vehicle: Vehicle) => {
    setSelectedVehicle(vehicle);
    navigateTo(`/vehicles/${vehicle.slug}`);
  };

  // If on Admin view, render dedicated admin workspace without public nav/footer
  if (currentRoute === '/admin') {
    return (
      <ToastProvider>
        <AdminPage onExitToWebsite={() => navigateTo('/')} />
      </ToastProvider>
    );
  }

  // Render appropriate public page view
  const renderCurrentPage = () => {
    // 1. Vehicle Detail View
    if (selectedVehicle || (currentRoute.startsWith('/vehicles/') && currentRoute !== '/vehicles')) {
      const current = selectedVehicle || store.getVehicleBySlug(currentRoute.replace('/vehicles/', '')) || vehicles[0];
      return (
        <VehicleDetailPage
          vehicle={current}
          allVehicles={vehicles}
          onBack={() => {
            setSelectedVehicle(null);
            navigateTo('/vehicles');
          }}
          onSelectVehicle={handleSelectVehicle}
          whatsappNumber={activeWhatsappNumber}
        />
      );
    }

    // 2. Vehicles Inventory Page
    if (currentRoute === '/vehicles') {
      return (
        <VehiclesPage
          vehicles={vehicles}
          onSelectVehicle={handleSelectVehicle}
          whatsappNumber={activeWhatsappNumber}
          initialSearchQuery={initialSearchQuery}
          initialMake={initialMakeFilter}
          onNavigate={navigateTo}
        />
      );
    }

    // 3. Request Vehicle Page
    if (currentRoute === '/request-vehicle') {
      return <RequestVehiclePage whatsappNumber={activeWhatsappNumber} />;
    }

    // 4. Import Process Page
    if (currentRoute === '/import-process') {
      return <ImportProcessPage onNavigate={navigateTo} whatsappNumber={activeWhatsappNumber} />;
    }

    // 5. About Page
    if (currentRoute === '/about') {
      return <AboutPage onNavigate={navigateTo} whatsappNumber={activeWhatsappNumber} />;
    }

    // 6. Contact Page
    if (currentRoute === '/contact') {
      return <ContactPage settings={settings} />;
    }

    // Default: Home Page
    return (
      <HomePage
        vehicles={vehicles}
        onNavigate={navigateTo}
        onSelectVehicle={handleSelectVehicle}
        settings={settings}
      />
    );
  };

  return (
    <ToastProvider>
      <div className="min-h-screen flex flex-col bg-[#fcfbf9] text-stone-900 font-sans selection:bg-amber-500 selection:text-stone-950">
        {/* Top Navigation Bar */}
        <Navbar
          currentRoute={currentRoute}
          onNavigate={navigateTo}
          settings={settings}
          whatsappNumber={activeWhatsappNumber}
          phone={activePhone}
          isAdmin={store.isAdminLoggedIn()}
        />

        {/* Dynamic Page Content */}
        <main className="flex-1">{renderCurrentPage()}</main>

        {/* Global Footer */}
        <Footer onNavigate={navigateTo} settings={settings} />
      </div>
    </ToastProvider>
  );
}
