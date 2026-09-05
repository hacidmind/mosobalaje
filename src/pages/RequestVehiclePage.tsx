import React from 'react';
import { 
  Sparkles, 
  ShieldCheck, 
  Search, 
  FileCheck2, 
  Globe2, 
  Clock, 
  CheckCircle2, 
  HelpCircle,
  PhoneCall
} from 'lucide-react';
import { VehicleRequestForm } from '../components/forms/VehicleRequestForm';
import { SectionHeader } from '../components/ui/SectionHeader';

interface RequestVehiclePageProps {
  whatsappNumber?: string;
}

export const RequestVehiclePage: React.FC<RequestVehiclePageProps> = ({
  whatsappNumber = '2349064153303',
}) => {
  return (
    <div id="request-vehicle-page" className="py-12 bg-[#fcfbf9] min-h-screen">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs font-bold uppercase tracking-widest text-amber-700 bg-amber-50 px-3.5 py-1.5 rounded-full border border-amber-200 inline-block mb-3">
            Bespoke International Procurement
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-stone-950 tracking-tight">
            Can’t Find Your Exact Specification?
          </h1>
          <p className="text-stone-600 text-base sm:text-lg mt-3 leading-relaxed">
            Tell us the exact make, model, color, and trim package you require. As a registered member of IAA and Copart auction networks, we source directly from wholesale dealer auctions in North America, Europe, and Asia with verified Carfax histories and door-to-door Nigerian delivery.
          </p>
        </div>

        {/* Benefits Strip */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
          <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-2xs flex items-start gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center shrink-0 border border-amber-200">
              <Search className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-stone-900">Direct Auction Bidding</h4>
              <p className="text-xs text-stone-500 mt-1 leading-relaxed">
                Manheim, Copart, Adesa, and European dealer syndicates without retail markups.
              </p>
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-2xs flex items-start gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center shrink-0 border border-amber-200">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-stone-900">Guaranteed Pre-Purchase Audit</h4>
              <p className="text-xs text-stone-500 mt-1 leading-relaxed">
                Physical multi-point inspection, engine scan, and clean Carfax/AutoCheck authentication.
              </p>
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-2xs flex items-start gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center shrink-0 border border-amber-200">
              <FileCheck2 className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-stone-900">Legitimate Customs Clearance</h4>
              <p className="text-xs text-stone-500 mt-1 leading-relaxed">
                Full Single Goods Declaration (SGD) cleared with authentic Nigeria Customs duties.
              </p>
            </div>
          </div>
        </div>

        {/* Main Request Form */}
        <VehicleRequestForm whatsappNumber={whatsappNumber} />

        {/* FAQ & How It Works */}
        <div className="mt-16 pt-12 border-t border-stone-200">
          <div className="text-center mb-10">
            <h3 className="text-2xl font-bold text-stone-950">How Custom Sourcing Works</h3>
            <p className="text-xs text-stone-500 mt-1">Four simple steps from request to driveway</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 text-xs text-stone-600">
            <div className="bg-white p-5 rounded-2xl border border-stone-200">
              <span className="font-mono text-amber-700 font-bold block mb-1">01. SHORTLISTING</span>
              <h5 className="font-bold text-stone-900 text-sm mb-1">24–48hr Search</h5>
              <p>We provide 2–4 vetted vehicle matches currently in auction or dealer showrooms with photos and Carfax.</p>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-stone-200">
              <span className="font-mono text-amber-700 font-bold block mb-1">02. SELECTION & WIRE</span>
              <h5 className="font-bold text-stone-900 text-sm mb-1">Transparent Costing</h5>
              <p>You review total landed cost (Vehicle price + shipping + customs duty). Commit with a structured deposit.</p>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-stone-200">
              <span className="font-mono text-amber-700 font-bold block mb-1">03. OCEAN SHIPPING</span>
              <h5 className="font-bold text-stone-900 text-sm mb-1">Vessel Tracking</h5>
              <p>Container or RORO vessel departure from Newark/Houston/Antwerp with real-time tracking to Lagos.</p>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-stone-200">
              <span className="font-mono text-amber-700 font-bold block mb-1">04. PORT CLEAR & KEY</span>
              <h5 className="font-bold text-stone-900 text-sm mb-1">Doorstep Handover</h5>
              <p>Customs duty cleared at Tin Can Port, final detailing, and delivery to your address in Lagos or nationwide.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
