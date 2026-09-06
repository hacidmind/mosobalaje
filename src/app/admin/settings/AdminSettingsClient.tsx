'use client';

import React, { useState } from 'react';
import { Save } from 'lucide-react';
import { useToast } from '@/src/components/ui/Toast';
import { updateSettings } from '@/src/lib/data';
import { WebsiteContentSettings } from '@/src/lib/types';

interface Props {
  settings: WebsiteContentSettings;
}

export function AdminSettingsClient({ settings: initialSettings }: Props) {
  const { toast } = useToast();
  const [settings, setSettings] = useState(initialSettings);
  const [saving, setSaving] = useState(false);

  const handleChange = (field: keyof WebsiteContentSettings, value: string) => {
    setSettings(prev => ({ ...prev, [field]: value }));
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      await updateSettings(settings);
      toast({ type: 'success', title: 'Settings Saved', message: 'Website content settings have been updated.' });
    } catch (err) {
      toast({ type: 'error', title: 'Save Failed', message: err instanceof Error ? err.message : 'Could not save settings.' });
    } finally {
      setSaving(false);
    }
  };

  const fields: { label: string; key: keyof WebsiteContentSettings; type: string }[] = [
    { label: 'Hero Headline', key: 'heroHeadline', type: 'text' },
    { label: 'Hero Subheadline', key: 'heroSubheadline', type: 'textarea' },
    { label: 'Company Description', key: 'companyDescription', type: 'textarea' },
    { label: 'Phone Number', key: 'phone', type: 'text' },
    { label: 'Email', key: 'email', type: 'email' },
    { label: 'WhatsApp Number', key: 'whatsappNumber', type: 'text' },
    { label: 'Office Address', key: 'officeAddress', type: 'text' },
    { label: 'Business Hours', key: 'businessHours', type: 'text' },
    { label: 'Instagram URL', key: 'instagramUrl', type: 'url' },
    { label: 'Facebook URL', key: 'facebookUrl', type: 'url' },
    { label: 'LinkedIn URL', key: 'linkedinUrl', type: 'url' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-extrabold text-stone-900">Website Settings</h1>
          <p className="text-sm text-stone-500 mt-1">Manage public-facing content and contact details</p>
        </div>
        <button onClick={handleSave} disabled={saving} className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-stone-900 text-white text-sm font-bold hover:bg-stone-800 transition-colors disabled:opacity-50">
          <Save className="w-4 h-4" /> {saving ? 'Saving...' : 'Save Changes'}
        </button>
      </div>

      <div className="bg-white rounded-2xl border border-stone-200 p-6 space-y-5">
        {fields.map((f) => (
          <div key={f.key}>
            <label className="block text-xs font-semibold text-stone-700 mb-1.5 uppercase tracking-wide">{f.label}</label>
            {f.type === 'textarea' ? (
              <textarea value={settings[f.key] || ''} onChange={(e) => handleChange(f.key, e.target.value)} rows={2} className="w-full px-3 py-2 rounded-lg border border-stone-300 text-sm text-stone-900 focus:outline-none focus:ring-2 focus:ring-amber-500/30 focus:border-amber-500 resize-none" />
            ) : (
              <input type={f.type} value={settings[f.key] || ''} onChange={(e) => handleChange(f.key, e.target.value)} className="w-full px-3 py-2 rounded-lg border border-stone-300 text-sm text-stone-900 focus:outline-none focus:ring-2 focus:ring-amber-500/30 focus:border-amber-500" />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}