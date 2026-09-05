import React from 'react';
import { 
  CheckCircle2, 
  Search, 
  FileCheck2, 
  Ship, 
  ShieldCheck, 
  Anchor, 
  Truck, 
  Sparkles, 
  KeyRound,
  AlertCircle,
  Clock,
  ArrowRight
} from 'lucide-react';
import { SectionHeader, CTASection } from '../components/ui/SectionHeader';

interface ImportProcessPageProps {
  onNavigate: (route: string) => void;
  whatsappNumber?: string;
}

export const ImportProcessPage: React.FC<ImportProcessPageProps> = ({
  onNavigate,
  whatsappNumber = '2349064153303',
}) => {
  const steps = [
    {
      step: '01',
      title: 'Vehicle Consultation & Specification',
      duration: 'Day 1',
      icon: <Search className="w-5 h-5 text-amber-600" />,
      description:
        'You consult with our automotive procurement directors on your desired make, model, trim, acceptable mileage range, and total landed budget in Naira or USD.',
    },
    {
      step: '02',
      title: 'Global Sourcing & Direct IAA / Copart Auction Access',
      duration: 'Day 2 – 4',
      icon: <FileCheck2 className="w-5 h-5 text-amber-600" />,
      description:
        'As an accredited registered member of IAA and Copart auction networks, alongside top dealer-only channels across North America, Germany, and Japan, we bid directly with institutional wholesale pricing and authentic run-and-drive certifications.',
    },
    {
      step: '03',
      title: 'Pre-Purchase History & Technical Audit',
      duration: 'Day 3 – 5',
      icon: <ShieldCheck className="w-5 h-5 text-amber-600" />,
      description:
        'Every vehicle undergoes an exhaustive Carfax, AutoCheck, or European DEKRA report check. We verify title cleanliness, verify odometer truthfulness, and confirm no flood, frame, or structural salvage history.',
    },
    {
      step: '04',
      title: 'Secure Acquisition & Title Transfer',
      duration: 'Day 5 – 7',
      icon: <KeyRound className="w-5 h-5 text-amber-600" />,
      description:
        'Upon your approval of the inspection report and cost schedule, Mosobalaje acquires the vehicle directly and secures legal export title in the origin country.',
    },
    {
      step: '05',
      title: 'Export Documentation & Port Delivery',
      duration: 'Day 7 – 12',
      icon: <Truck className="w-5 h-5 text-amber-600" />,
      description:
        'The vehicle is transported via enclosed or open carrier to the export terminal (e.g. Port of Newark, Houston, or Antwerp). Origin customs export clearance is completed.',
    },
    {
      step: '06',
      title: 'Ocean Freight & Maritime Tracking',
      duration: '3 to 5 Weeks',
      icon: <Ship className="w-5 h-5 text-amber-600" />,
      description:
        'The vehicle is securely loaded onto a Roll-on/Roll-off (RORO) specialized car carrier or container vessel destined for Lagos, Nigeria. A Bill of Lading with tracking details is provided.',
    },
    {
      step: '07',
      title: 'Tin Can Island / Apapa Port Arrival',
      duration: 'Day 35 – 42',
      icon: <Anchor className="w-5 h-5 text-amber-600" />,
      description:
        'The shipping vessel arrives and berths at the Port in Lagos. Terminal operators discharge the cargo and lodge manifestation with the Nigeria Customs Service (NCS).',
    },
    {
      step: '08',
      title: 'Nigeria Customs Clearing & Duty Settlement',
      duration: '5 to 9 Working Days',
      icon: <FileCheck2 className="w-5 h-5 text-amber-600" />,
      description:
        'Our licensed clearing agents process the Single Goods Declaration (SGD), pay official assessment tariffs, undergo physical customs examination, and obtain legitimate terminal exit passes.',
    },
    {
      step: '09',
      title: 'Final Quality Detailing & Executive Handover',
      duration: 'Within 24 Hours of Port Release',
      icon: <Sparkles className="w-5 h-5 text-amber-600" />,
      description:
        'The vehicle is brought to our Lagos logistics facility for complete multi-point mechanical inspection, computer diagnostic scan, interior leather conditioning, and exterior detailing. Key handover in Lagos or enclosed transit nationwide.',
    },
  ];

  return (
    <div id="import-process-page" className="py-12 bg-[#fcfbf9] min-h-screen">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold uppercase tracking-widest text-amber-700 bg-amber-50 px-3.5 py-1.5 rounded-full border border-amber-200 inline-block mb-3">
            Total Provenance Transparency
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-stone-950 tracking-tight">
            The Mosobalaje 9-Step Vehicle Importation Process
          </h1>
          <p className="text-stone-600 text-base sm:text-lg mt-4 leading-relaxed">
            Importing a luxury automobile into Nigeria should not be a gamble. Discover how our structured international pipeline ensures authentic condition, real duty clearance, and predictable delivery.
          </p>
        </div>

        {/* 9-Step Timeline */}
        <div className="space-y-6 relative mb-16">
          {/* Vertical line indicator */}
          <div className="hidden md:block absolute left-8 top-6 bottom-6 w-0.5 bg-stone-200"></div>

          {steps.map((item, idx) => (
            <div
              key={item.step}
              className="relative bg-white rounded-2xl border border-stone-200/90 p-6 sm:p-8 shadow-2xs transition-all hover:shadow-md hover:border-amber-400/80 flex flex-col md:flex-row items-start md:items-center gap-6"
            >
              {/* Step Badge */}
              <div className="flex items-center gap-4 md:w-48 shrink-0">
                <div className="relative z-10 w-16 h-16 rounded-2xl bg-stone-950 text-white font-mono font-black text-xl flex items-center justify-center border-4 border-[#fcfbf9] shadow-sm">
                  {item.step}
                </div>
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-amber-700 block">
                    Timeline
                  </span>
                  <span className="text-xs font-bold text-stone-700 flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-stone-400" />
                    {item.duration}
                  </span>
                </div>
              </div>

              {/* Step Info */}
              <div className="flex-1 space-y-1.5">
                <div className="flex items-center gap-2">
                  <div className="p-1.5 rounded-lg bg-amber-50 border border-amber-200">
                    {item.icon}
                  </div>
                  <h3 className="text-base sm:text-lg font-bold text-stone-950">
                    {item.title}
                  </h3>
                </div>
                <p className="text-xs sm:text-sm text-stone-600 leading-relaxed pl-8">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Clear Customs & Duty Assurance Banner */}
        <div className="bg-stone-900 text-white p-8 sm:p-10 rounded-3xl border border-stone-800 shadow-xl mb-16 space-y-4">
          <div className="flex items-center gap-3">
            <ShieldCheck className="w-7 h-7 text-amber-400 shrink-0" />
            <h3 className="text-xl sm:text-2xl font-bold text-white">
              Official Nigeria Customs Service (NCS) Compliance Guarantee
            </h3>
          </div>
          <p className="text-stone-300 text-xs sm:text-sm leading-relaxed max-w-4xl">
            In Nigeria, thousands of imported vehicles are confiscated yearly due to compromised duty papers and forged Single Goods Declarations (SGD). At Mosobalaje, every vehicle duty assessment is settled directly into Federal Government designated accounts. We hand you the original SGD, customs payment assessment, and bank tellers for verifiable peace of mind.
          </p>
          <div className="pt-2 flex flex-wrap gap-4 text-xs font-semibold text-amber-300">
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-amber-400" /> Verifiable VIN on Customs Portal
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-amber-400" /> Zero Risk of Port Command Seizures
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-amber-400" /> Authentic Assessment Valuation
            </span>
          </div>
        </div>

        {/* Final CTA */}
        <CTASection onNavigate={onNavigate} whatsappNumber={whatsappNumber} />
      </div>
    </div>
  );
};
