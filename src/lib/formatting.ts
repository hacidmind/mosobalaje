export function formatNaira(amount: number): string {
  return new Intl.NumberFormat('en-NG', {
    style: 'currency',
    currency: 'NGN',
    maximumFractionDigits: 0,
  }).format(amount).replace('NGN', '\u20A6');
}

export function getWhatsAppUrl(
  whatsappNumber?: string,
  vehicleName?: string,
  vehicleRef?: string,
): string {
  const numStr = String(whatsappNumber || '2349064153303');
  let cleanNumber = numStr.replace(/[^0-9]/g, '');
  if (cleanNumber.startsWith('0')) {
    cleanNumber = '234' + cleanNumber.slice(1);
  }
  if (!cleanNumber) cleanNumber = '2349064153303';

  let message = 'Hello Mosobalaje Vehicle Imports, I would like to inquire about your vehicle importation services.';
  if (vehicleName) {
    message = `Hello Mosobalaje Vehicle Imports, I am interested in the ${vehicleName}${vehicleRef ? ` (Ref: ${vehicleRef})` : ''} listed on your website. Kindly provide inspection availability, clearing paperwork verification, and purchase details.`;
  }

  return `https://wa.me/${cleanNumber}?text=${encodeURIComponent(message)}`;
}
