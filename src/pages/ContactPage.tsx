import React from 'react';
import { 
  MapPin, 
  Phone, 
  Mail, 
  MessageCircle, 
  Clock, 
  ShieldCheck,
  Calendar,
  Award
} from 'lucide-react';
import { ContactForm } from '../components/forms/ContactForm';
import { WebsiteContentSettings } from '../types';
import { getWhatsAppUrl } from '../lib/store';
import { INITIAL_CONTENT_SETTINGS } from '../lib/initialData';

interface ContactPageProps {
  settings?: WebsiteContentSettings;
}

export const ContactPage: React.FC<ContactPageProps> = ({ settings }) => {
  const s = { ...INITIAL_CONTENT_SETTINGS, ...(settings || {}) };
  const whatsappUrl = getWhatsAppUrl(s.whatsappNumber, 'Showroom Appointment / Vehicle Inquiry');

  return (
    <div id="contact-page" className="py-12 bg-[#fcfbf9] min-h-screen">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold uppercase tracking-widest text-amber-700 bg-amber-50 px-3.5 py-1.5 rounded-full border border-amber-200 inline-block mb-3">
            Client Relations Desk
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-stone-950 tracking-tight">
            Connect with Mosobalaje
          </h1>
          <p className="text-stone-600 text-base sm:text-lg mt-3 leading-relaxed">
            Schedule a physical vehicle inspection in Lagos, discuss custom importation requirements, or verify Nigeria Customs documentation with our automotive consultants.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Contact Cards & Office Details */}
          <div className="lg:col-span-5 space-y-6">
            {/* Quick Action Box */}
            <div className="bg-stone-950 text-white p-6 sm:p-8 rounded-3xl border border-stone-800 shadow-xl space-y-5">
              <h3 className="text-xl font-bold text-white tracking-tight">
                Direct Executive Channels
              </h3>
              <p className="text-xs text-stone-400 leading-relaxed">
                For prompt response, message our director desk directly via verified WhatsApp or telephone.
              </p>

              <div className="space-y-3 pt-2">
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-3.5 rounded-2xl bg-emerald-600/90 hover:bg-emerald-600 text-white text-xs font-bold transition-colors"
                >
                  <MessageCircle className="w-5 h-5 text-white" />
                  <div>
                    <span className="block text-[10px] text-emerald-200 uppercase font-semibold">Instant Response</span>
                    <span>Chat on WhatsApp: {s.phone || '0906 415 3303'}</span>
                  </div>
                </a>

                <a
                  href={`tel:${s.phone.replace(/[^0-9+]/g, '')}`}
                  className="flex items-center gap-3 p-3.5 rounded-2xl bg-stone-900 hover:bg-stone-800 text-white text-xs font-bold border border-stone-800 transition-colors"
                >
                  <Phone className="w-5 h-5 text-amber-400" />
                  <div>
                    <span className="block text-[10px] text-stone-400 uppercase font-semibold">Direct Telephone</span>
                    <span>{s.phone}</span>
                  </div>
                </a>

                <a
                  href={`mailto:${s.email}`}
                  className="flex items-center gap-3 p-3.5 rounded-2xl bg-stone-900 hover:bg-stone-800 text-white text-xs font-bold border border-stone-800 transition-colors"
                >
                  <Mail className="w-5 h-5 text-amber-400" />
                  <div>
                    <span className="block text-[10px] text-stone-400 uppercase font-semibold">Official Email</span>
                    <span>{s.email}</span>
                  </div>
                </a>
              </div>
            </div>

            {/* Physical Locations */}
            <div className="bg-white p-6 sm:p-8 rounded-3xl border border-stone-200 shadow-2xs space-y-6">
              <div className="flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center shrink-0 border border-amber-200">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-amber-700 block">
                    Operations & Logistics Hub
                  </span>
                  <h4 className="text-base font-bold text-stone-900 mt-0.5">Lagos Logistics Center</h4>
                  <p className="text-xs text-stone-600 mt-1 leading-relaxed">
                    {s.officeAddress}
                  </p>
                </div>
              </div>

              <div className="border-t border-stone-100 pt-5 flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-stone-50 text-red-600 flex items-center justify-center shrink-0 border border-red-200">
                  <Award className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-red-600 block">
                    Institutional Accreditation
                  </span>
                  <h4 className="text-base font-bold text-stone-900 mt-0.5">IAA & Copart Registered Member</h4>
                  <p className="text-xs text-stone-600 mt-1 leading-relaxed">
                    Direct member bidding across North American wholesale auto auctions with insured flatbed delivery to your doorstep nationwide.
                  </p>
                </div>
              </div>

              <div className="border-t border-stone-100 pt-5 flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-stone-50 text-stone-700 flex items-center justify-center shrink-0 border border-stone-200">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-stone-900">Operating Hours</h4>
                  <div className="text-xs text-stone-600 mt-1 space-y-1">
                    <p>Monday – Friday: 8:30 AM – 6:30 PM</p>
                    <p>Saturday: 10:00 AM – 5:00 PM</p>
                    <p className="text-stone-400">Sunday: Closed (Private viewings by appointment)</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Contact Form */}
          <div className="lg:col-span-7 bg-white p-6 sm:p-10 rounded-3xl border border-stone-200 shadow-sm space-y-6">
            <div>
              <h3 className="text-xl font-bold text-stone-950">
                Send a Message to Customer Relations
              </h3>
              <p className="text-xs text-stone-500 mt-1">
                Fill in the details below and an automotive consultant will respond within 30 minutes during showroom hours.
              </p>
            </div>

            <ContactForm />
          </div>
        </div>
      </div>
    </div>
  );
};
