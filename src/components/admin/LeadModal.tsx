import React, { useState, useEffect } from 'react';
import { Lead, LeadStatus } from '../../types';
import { Modal } from '../ui/Modal';

interface LeadModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: Partial<Lead>) => void;
  lead?: Lead | null;
}

export const LeadModal: React.FC<LeadModalProps> = ({
  isOpen,
  onClose,
  onSave,
  lead,
}) => {
  const isEditing = Boolean(lead);

  const [formData, setFormData] = useState<Partial<Lead>>({
    name: '',
    phone: '',
    email: '',
    vehicleName: '',
    budget: '',
    source: 'Website Inquiry',
    status: 'New',
    notes: '',
    assignedTo: 'Mosobalaje Specialist',
  });

  useEffect(() => {
    if (lead) {
      setFormData({ ...lead });
    } else {
      setFormData({
        name: '',
        phone: '',
        email: '',
        vehicleName: '',
        budget: '',
        source: 'Website Inquiry',
        status: 'New',
        notes: '',
        assignedTo: 'Mosobalaje Specialist',
      });
    }
  }, [lead, isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
    onClose();
  };

  const statuses: LeadStatus[] = ['New', 'Contacted', 'Qualified', 'Negotiating', 'Won', 'Lost'];

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={isEditing ? `Edit Customer Lead: ${lead?.name}` : 'Create CRM Sales Lead'}
      subtitle="Track negotiation notes, budget, and assigned sales executive"
      maxWidth="lg"
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-xs font-bold text-stone-700 mb-1">Customer Name *</label>
          <input
            type="text"
            required
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full bg-stone-50 border border-stone-200 rounded-lg p-2.5 text-xs font-semibold"
          />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-bold text-stone-700 mb-1">Phone Number *</label>
            <input
              type="tel"
              required
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              className="w-full bg-stone-50 border border-stone-200 rounded-lg p-2 text-xs"
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-stone-700 mb-1">Email</label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full bg-stone-50 border border-stone-200 rounded-lg p-2 text-xs"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-bold text-stone-700 mb-1">Vehicle of Interest</label>
            <input
              type="text"
              placeholder="e.g. 2023 Lexus RX 350"
              value={formData.vehicleName}
              onChange={(e) => setFormData({ ...formData, vehicleName: e.target.value })}
              className="w-full bg-stone-50 border border-stone-200 rounded-lg p-2 text-xs"
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-stone-700 mb-1">Customer Budget</label>
            <input
              type="text"
              placeholder="e.g. ₦65,000,000"
              value={formData.budget}
              onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
              className="w-full bg-stone-50 border border-stone-200 rounded-lg p-2 text-xs"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-bold text-stone-700 mb-1">Lead Status</label>
            <select
              value={formData.status}
              onChange={(e) => setFormData({ ...formData, status: e.target.value as LeadStatus })}
              className="w-full bg-stone-50 border border-stone-200 rounded-lg p-2 text-xs font-semibold"
            >
              {statuses.map((st) => (
                <option key={st} value={st}>
                  {st}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-xs font-bold text-stone-700 mb-1">Lead Source</label>
            <select
              value={formData.source}
              onChange={(e) => setFormData({ ...formData, source: e.target.value as unknown as Lead['source'] })}
              className="w-full bg-stone-50 border border-stone-200 rounded-lg p-2 text-xs"
            >
              <option value="Website Inquiry">Website Inquiry</option>
              <option value="Vehicle Request">Vehicle Request</option>
              <option value="WhatsApp">WhatsApp</option>
              <option value="Walk-in">Lagos Facility Walk-in</option>
              <option value="Referral">Referral</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold text-stone-700 mb-1">Assigned Staff / Executive</label>
          <input
            type="text"
            value={formData.assignedTo}
            onChange={(e) => setFormData({ ...formData, assignedTo: e.target.value })}
            className="w-full bg-stone-50 border border-stone-200 rounded-lg p-2 text-xs"
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-stone-700 mb-1">Internal Notes & History</label>
          <textarea
            rows={3}
            placeholder="Document customer test drive feedback, customs documentation sent, wire progress..."
            value={formData.notes}
            onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
            className="w-full bg-stone-50 border border-stone-200 rounded-lg p-2 text-xs resize-none"
          />
        </div>

        <div className="flex items-center justify-end gap-3 pt-3 border-t border-stone-100">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-xl text-stone-600 hover:bg-stone-100 text-xs font-semibold"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-5 py-2.5 rounded-xl bg-stone-900 text-white text-xs font-bold hover:bg-stone-800"
          >
            {isEditing ? 'Update Lead' : 'Save Lead'}
          </button>
        </div>
      </form>
    </Modal>
  );
};
