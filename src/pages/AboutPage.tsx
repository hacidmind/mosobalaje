import React from 'react';
import { ShieldCheck, Award, Globe2, MapPin, Users, CheckCircle2, ArrowRight } from 'lucide-react';
import { SectionHeader, CTASection } from '../components/ui/SectionHeader';

interface AboutPageProps {
  onNavigate: (route: string) => void;
  whatsappNumber?: string;
}

export const AboutPage: React.FC<AboutPageProps> = ({
  onNavigate,
  whatsappNumber = '2349064153303',
}) => {
  return (
    <div id="about-page" className="py-12 bg-[#fcfbf9] min-h-screen">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Banner */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold uppercase tracking-widest text-amber-700 bg-amber-50 px-3.5 py-1.5 rounded-full border border-amber-200 inline-block mb-3">
            Company Story & Values
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-stone-950 tracking-tight">
            Redefining Automobile Importation in Nigeria
          </h1>
          <p className="text-stone-600 text-base sm:text-lg mt-4 leading-relaxed">
            Founded with a singular conviction: Nigerian automotive buyers deserve pristine provenance, uncompromised safety, and legitimate customs documentation.
          </p>
        </div>

        {/* Story Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-20">
          <div className="lg:col-span-6 relative">
            <div className="aspect-4/3 rounded-3xl overflow-hidden shadow-xl border border-stone-200">
              <img
                src="https://images.unsplash.com/photo-1563720223185-11003d516935?q=80&w=1200&auto=format&fit=crop"
                alt="Luxury Automobile Dealership"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -bottom-6 -right-6 bg-stone-950 text-white p-6 rounded-2xl shadow-xl max-w-xs hidden sm:block border border-stone-800">
              <span className="text-amber-400 font-serif text-2xl font-bold block mb-1">100%</span>
              <p className="text-xs text-stone-300">
                Single Goods Declaration verified documentation on every imported automobile.
              </p>
            </div>
          </div>

          <div className="lg:col-span-6 space-y-5 text-stone-700 text-sm leading-relaxed">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-stone-950 tracking-tight">
              A Culture of Provenance Over Speculation
            </h2>
            <p>
              For decades, purchasing an imported vehicle in Nigeria has been fraught with anxiety. Buyers often discover rolled-back digital odometers, concealed flood and structural accident damages, or fraudulent Nigeria Customs duty stamps that leave their investments subject to road impoundment.
            </p>
            <p>
              <strong>Mosobalaje Vehicle Imports</strong> was established to dismantle this culture of uncertainty. By bridging direct institutional access as a <strong>registered member of IAA & Copart</strong> auction networks across North America, alongside certified sourcing partners in Germany and Japan, we guarantee that every vehicle is mathematically and mechanically true to its specification.
            </p>
            <div className="pt-2 grid grid-cols-2 gap-4 text-xs font-semibold text-stone-900">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-amber-600" />
                <span>Zero Odometer Rollbacks</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-amber-600" />
                <span>Authentic Auction Reports</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-amber-600" />
                <span>Legitimate NCS Clearing</span>
              </div>
              <div className="flex items-center gap-2">
                <Award className="w-4 h-4 text-amber-600" />
                <span>Registered Member: IAA & Copart</span>
              </div>
            </div>
          </div>
        </div>

        {/* Core Pillars */}
        <div className="mb-20">
          <SectionHeader
            badge="The Three Pillars"
            title="Our Non-Negotiable Operational Principles"
            subtitle="How we maintain institutional integrity at every touchpoint of vehicle acquisition."
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-3xl border border-stone-200/90 shadow-2xs space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-stone-950 text-amber-400 flex items-center justify-center">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-stone-950">1. Mechanical Integrity</h3>
              <p className="text-xs text-stone-600 leading-relaxed">
                We never purchase rebuilt or salvage-title vehicles with frame damage or airbag deployments. Every car is certified with a clean title and full physical mechanic examination prior to export.
              </p>
            </div>

            <div className="bg-white p-8 rounded-3xl border border-stone-200/90 shadow-2xs space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-stone-950 text-amber-400 flex items-center justify-center">
                <Award className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-stone-950">2. Complete Legal Clearance</h3>
              <p className="text-xs text-stone-600 leading-relaxed">
                We take immense pride in authentic documentation. We clear through licensed customs brokers with official tariffs paid directly to the Federal Government, protecting you from future impounds.
              </p>
            </div>

            <div className="bg-white p-8 rounded-3xl border border-stone-200/90 shadow-2xs space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-stone-950 text-amber-400 flex items-center justify-center">
                <Users className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-stone-950">3. White-Glove Handover</h3>
              <p className="text-xs text-stone-600 leading-relaxed">
                From our dedicated Lagos bonded facility and operations hub to executive doorstep delivery nationwide across Nigeria, your vehicle arrives fully detailed and ready for immediate registration.
              </p>
            </div>
          </div>
        </div>

        {/* IAA & Copart Membership & Visual Trust Badge Section */}
        <div id="iaa-copart-accreditation" className="bg-stone-950 text-white rounded-3xl p-8 sm:p-12 border border-stone-800 shadow-2xl mb-16 relative overflow-hidden">
          {/* Subtle glow effect */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-red-950/20 rounded-full blur-3xl pointer-events-none" />
          
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left Visual Badge Showcase */}
            <div className="lg:col-span-5 flex flex-col sm:flex-row lg:flex-col items-center gap-6 p-6 rounded-2xl bg-stone-900/80 border border-stone-800 shadow-inner">
              <div className="relative shrink-0">
                <img
                  src="/logo.jpg"
                  alt="Mosobalaje Vehicle Imports Official Crest"
                  className="w-28 h-28 object-contain rounded-2xl border-2 border-stone-700 shadow-xl bg-black p-1"
                />
                <div className="absolute -bottom-2.5 -right-2.5 bg-red-600 text-white p-1.5 rounded-full shadow-lg border-2 border-stone-950">
                  <Award className="w-4 h-4 text-white" />
                </div>
              </div>

              <div className="text-center sm:text-left lg:text-center space-y-2">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-950/80 border border-red-800/80 text-red-400 text-xs font-bold tracking-wider uppercase">
                  <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                  Official Member
                </div>
                <h4 className="text-lg font-bold text-white tracking-tight">
                  IAA & Copart Registered Member
                </h4>
                <p className="text-xs text-stone-400 max-w-xs">
                  Direct Institutional Member Account with Insurance Auto Auctions (IAA) and Copart Auto Auctions USA & Canada.
                </p>
              </div>
            </div>

            {/* Right Information & Benefits */}
            <div className="lg:col-span-7 space-y-5">
              <div className="space-y-2">
                <span className="text-xs font-bold uppercase tracking-widest text-amber-400 flex items-center gap-2">
                  <Award className="w-4 h-4 text-red-500" />
                  Institutional Accreditation & Wholesale Bidding Access
                </span>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                  Direct Wholesale Auction Member Privileges
                </h3>
                <p className="text-stone-300 text-sm leading-relaxed">
                  As an accredited member of both <strong>Insurance Auto Auctions (IAA)</strong> and <strong>Copart</strong>, Mosobalaje Vehicle Imports grants Nigerian clients direct broker access to premier salvage and clean-title vehicle runs without middleman broker markups.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                <div className="p-3.5 rounded-xl bg-stone-900/60 border border-stone-800 flex items-start gap-3">
                  <CheckCircle2 className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-xs font-bold text-white block">Direct Wholesale Rates</strong>
                    <span className="text-[11px] text-stone-400">Bid directly at auction floor value with verifiable settlement invoices.</span>
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-stone-900/60 border border-stone-800 flex items-start gap-3">
                  <CheckCircle2 className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-xs font-bold text-white block">Condition Reports & Run-and-Drive</strong>
                    <span className="text-[11px] text-stone-400">High-definition yard imagery, mechanical diagnostic checks, and verified titles.</span>
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-stone-900/60 border border-stone-800 flex items-start gap-3">
                  <CheckCircle2 className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-xs font-bold text-white block">Guaranteed Zero Tampering</strong>
                    <span className="text-[11px] text-stone-400">Authentic digital odometer readings verified against Carfax & AutoCheck records.</span>
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-stone-900/60 border border-stone-800 flex items-start gap-3">
                  <CheckCircle2 className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-xs font-bold text-white block">Full Customs Clearance</strong>
                    <span className="text-[11px] text-stone-400">Genuine Single Goods Declaration (SGD) duty documentation stamped by NCS.</span>
                  </div>
                </div>
              </div>

              <div className="pt-2 flex flex-wrap items-center gap-4">
                <button
                  onClick={() => onNavigate('/request-vehicle')}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-sm shadow-md transition-colors cursor-pointer"
                >
                  <span>Request Custom Auction Sourcing</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
                <button
                  onClick={() => onNavigate('/contact')}
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-stone-900 hover:bg-stone-800 text-stone-200 font-semibold text-sm border border-stone-700 transition-colors cursor-pointer"
                >
                  <span>Speak With a Sourcing Specialist</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* CTA */}
        <CTASection onNavigate={onNavigate} whatsappNumber={whatsappNumber} />
      </div>
    </div>
  );
};
