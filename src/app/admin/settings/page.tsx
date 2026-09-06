import { getSettings } from '@/src/lib/data';
import { WebsiteContentSettings } from '@/src/lib/types';

export const dynamic = 'force-dynamic';

export default async function AdminSettingsPage() {
  const settings = await getSettings();

  const fields: { label: string; key: string }[] = [
    { label: 'Hero Headline', key: 'heroHeadline' },
    { label: 'Hero Subheadline', key: 'heroSubheadline' },
    { label: 'Company Description', key: 'companyDescription' },
    { label: 'Phone Number', key: 'phone' },
    { label: 'Email', key: 'email' },
    { label: 'WhatsApp Number', key: 'whatsappNumber' },
    { label: 'Office Address', key: 'officeAddress' },
    { label: 'Business Hours', key: 'businessHours' },
    { label: 'Instagram URL', key: 'instagramUrl' },
    { label: 'Facebook URL', key: 'facebookUrl' },
    { label: 'LinkedIn URL', key: 'linkedinUrl' },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-extrabold text-stone-900">Website Settings</h1>
        <p className="text-sm text-stone-500 mt-1">Current public-facing content configuration</p>
      </div>

      <div className="bg-white rounded-2xl border border-stone-200 p-6 space-y-5">
        {fields.map((f) => (
          <div key={f.key}>
            <label className="block text-xs font-semibold text-stone-700 mb-1.5 uppercase tracking-wide">{f.label}</label>
            <div className="px-3 py-2 rounded-lg border border-stone-200 bg-stone-50 text-sm text-stone-700">
              {(settings as WebsiteContentSettings)[f.key as keyof WebsiteContentSettings] || '—'}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}