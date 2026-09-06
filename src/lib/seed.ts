import 'dotenv/config';

const INITIAL_VEHICLES = [
  {
    slug: '2023-lexus-rx-350-f-sport',
    make: 'Lexus',
    model: 'RX 350',
    year: 2023,
    trim: 'F-Sport AWD Luxury Package',
    bodyType: 'SUV',
    price: 68500000,
    currency: 'NGN',
    mileage: 14200,
    mileageUnit: 'miles',
    transmission: 'Automatic',
    fuelType: 'Petrol',
    engine: '2.4L Turbocharged 4-Cylinder (275 hp)',
    exteriorColor: 'Caviar Metallic Black',
    interiorColor: 'Circuit Red / Black Leather',
    vinPlaceholder: '2T2HGMCA*PC02****',
    description: 'Direct North American import, clean title with clean Carfax. Equipped with panoramic moonroof, Mark Levinson 21-speaker surround audio, head-up display, adaptive variable suspension, and 21-inch gloss black alloy wheels.',
    features: [
      'Mark Levinson 21-Speaker Premium Audio',
      'Panoramic Glass Sunroof',
      'Head-Up Display (HUD)',
      'Lexus Safety System+ 3.0',
      '360-degree Panoramic View Camera',
      'Adaptive Variable Suspension (AVS)',
      'Wireless Apple CarPlay & Android Auto',
      'Ventilated & Heated Front Seats',
    ],
    images: [
      'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?q=80&w=1400&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?q=80&w=1400&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=1400&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1563720223185-11003d516935?q=80&w=1400&auto=format&fit=crop',
    ],
    status: 'Available',
    importStatus: 'At Lagos Holding Facility',
    location: 'Lagos Holding Bay, Lagos',
    featured: true,
    purchasePrice: 42000,
    sellingPrice: 68500000,
    createdAt: '2026-08-10T10:00:00Z',
    updatedAt: '2026-09-01T14:30:00Z',
  },
  {
    slug: '2022-mercedes-benz-gle-450-4matic',
    make: 'Mercedes-Benz',
    model: 'GLE 450',
    year: 2022,
    trim: '4MATIC AMG Line Premium Plus',
    bodyType: 'SUV',
    price: 89000000,
    currency: 'NGN',
    mileage: 19800,
    mileageUnit: 'miles',
    transmission: 'Automatic',
    fuelType: 'Hybrid',
    engine: '3.0L Inline-6 Turbo with EQ Boost (362 hp)',
    exteriorColor: 'Obsidian Black Metallic',
    interiorColor: 'Macchiato Beige / Espresso Brown Nappa',
    vinPlaceholder: 'W1N1671591A****88',
    description: 'Immaculately maintained Mercedes-Benz GLE 450 4MATIC imported from Munich, Germany. Includes AMG Night Package, AIRMATIC air suspension, Burmester surround sound, panoramic sunroof, and MBUX augmented reality navigation.',
    features: [
      'AIRMATIC Adaptive Air Suspension',
      'Burmester Surround Sound System',
      'AMG Body Styling & 21-inch Wheels',
      'MBUX Dual 12.3-inch Digital Cockpit',
      'Distronic Adaptive Cruise Control',
      'Acoustic Comfort Package',
      'Soft-Close Doors',
      'Ambient Lighting (64 Colors)',
    ],
    images: [
      'https://images.unsplash.com/photo-1617814076367-b759c7d7e738?q=80&w=1400&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1502877338535-766e1452684a?q=80&w=1400&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1542282088-72c9c27ed0cd?q=80&w=1400&auto=format&fit=crop',
    ],
    status: 'Available',
    importStatus: 'At Lagos Holding Facility',
    location: 'Victoria Island Annex, Lagos',
    featured: true,
    purchasePrice: 58000,
    sellingPrice: 89000000,
    createdAt: '2026-08-15T09:00:00Z',
    updatedAt: '2026-09-02T11:00:00Z',
  },
  {
    slug: '2023-toyota-land-cruiser-prado-tx-l',
    make: 'Toyota',
    model: 'Land Cruiser Prado',
    year: 2023,
    trim: 'TX-L 7-Seater 4x4 Leather',
    bodyType: 'SUV',
    price: 94000000,
    currency: 'NGN',
    mileage: 8500,
    mileageUnit: 'km',
    transmission: 'Automatic',
    fuelType: 'Diesel',
    engine: '2.8L D-4D Turbo Diesel (201 hp)',
    exteriorColor: 'Super White II',
    interiorColor: 'Flaxen Leather',
    vinPlaceholder: 'JTEBU3FJ7PK****12',
    description: 'The ultimate Nigerian road conqueror. Brand-new condition GCC specification Land Cruiser Prado with 7 seats, dual air conditioning, kinetic dynamic suspension, cool box, and rugged 4WD low-range transfer case.',
    features: [
      'Dual Fuel Tank (150L total capacity)',
      'Front Center Console Cool Box',
      'Kinetic Dynamic Suspension System (KDSS)',
      'Triple-Zone Independent Climate Control',
      '360 Panoramic Multi-Terrain Monitor',
      'Rear Seat Entertainment Displays',
      'Factory Roof Rails & Side Steps',
      'Keyless Smart Entry with Push Start',
    ],
    images: [
      'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?q=80&w=1400&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?q=80&w=1400&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=1400&auto=format&fit=crop',
    ],
    status: 'Available',
    importStatus: 'At Lagos Holding Facility',
    location: 'Lagos Holding Facility',
    featured: true,
    purchasePrice: 65000,
    sellingPrice: 94000000,
    createdAt: '2026-08-18T12:00:00Z',
    updatedAt: '2026-09-03T16:00:00Z',
  },
  {
    slug: '2022-toyota-camry-xse',
    make: 'Toyota',
    model: 'Camry',
    year: 2022,
    trim: 'XSE V6 Panoramic Cockpit',
    bodyType: 'Sedan',
    price: 43500000,
    currency: 'NGN',
    mileage: 24300,
    mileageUnit: 'miles',
    transmission: 'Automatic',
    fuelType: 'Petrol',
    engine: '3.5L DOHC V6 24V (301 hp)',
    exteriorColor: 'Wind Chill Pearl / Two-Tone Midnight Black Roof',
    interiorColor: 'Cockpit Red Perforated Leather',
    vinPlaceholder: '4T1BZ1HK8NU****45',
    description: 'High-performance Toyota Camry XSE V6 imported directly from Houston, Texas. Dual exhaust with quad chrome tips, JBL premium 9-speaker system, sport-tuned suspension, and birds-eye view camera.',
    features: [
      'Sport-Tuned Suspension with Paddle Shifters',
      'Panoramic Glass Roof with Power Tilt/Slide',
      'JBL Premium Audio with Subwoofer',
      'Toyota Safety Sense 2.5+',
      '19-inch Gloss Black Machined Wheels',
      'Wireless Smartphone Charging Qi Pad',
      'Blind Spot Monitor with Rear Cross-Traffic Alert',
    ],
    images: [
      'https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?q=80&w=1400&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1550355291-bbee04a92027?q=80&w=1400&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1580273916550-e323be2ae537?q=80&w=1400&auto=format&fit=crop',
    ],
    status: 'Available',
    importStatus: 'Customs Cleared',
    location: 'Ikeja Holding Depot, Lagos',
    featured: true,
    purchasePrice: 28000,
    sellingPrice: 43500000,
    createdAt: '2026-08-20T08:30:00Z',
    updatedAt: '2026-09-04T09:15:00Z',
  },
  {
    slug: '2022-toyota-highlander-platinum-awd',
    make: 'Toyota',
    model: 'Highlander',
    year: 2022,
    trim: 'Platinum AWD (Top Specification)',
    bodyType: 'SUV',
    price: 58000000,
    currency: 'NGN',
    mileage: 21500,
    mileageUnit: 'miles',
    transmission: 'Automatic',
    fuelType: 'Petrol',
    engine: '3.5L V6 Dual VVT-i (295 hp)',
    exteriorColor: 'Blueprint Dark Blue',
    interiorColor: 'Glazed Caramel Leather',
    vinPlaceholder: '5TDGZRAH4NS****62',
    description: 'The pinnacle of Nigerian family comfort and executive presence. 3-row, 7-passenger SUV with panoramic moonroof, hands-free power liftgate, and dynamic torque-vectoring AWD.',
    features: [
      '12.3-inch Touchscreen Navigation',
      'JBL 11-Speaker 1200-Watt Audio',
      'Second-Row Captain Chairs with Sunshades',
      'Digital Rearview Mirror with HomeLink',
      'Dynamic Torque-Vectoring AWD',
      'Color Head-Up Display (HUD)',
    ],
    images: [
      'https://images.unsplash.com/photo-1511919884226-fd3cad34687c?q=80&w=1400&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?q=80&w=1400&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?q=80&w=1400&auto=format&fit=crop',
    ],
    status: 'In Transit',
    importStatus: 'Tin Can Island Port Clearing',
    location: 'Tin Can Island Port, Apapa Lagos',
    featured: true,
    estimatedArrival: 'Arrival: 4 Days (Customs Duty Paid)',
    purchasePrice: 36000,
    sellingPrice: 58000000,
    createdAt: '2026-08-25T14:00:00Z',
    updatedAt: '2026-09-05T10:00:00Z',
  },
  {
    slug: '2021-lexus-es-350-ultra-luxury',
    make: 'Lexus',
    model: 'ES 350',
    year: 2021,
    trim: 'Ultra Luxury Edition',
    bodyType: 'Sedan',
    price: 39500000,
    currency: 'NGN',
    mileage: 28400,
    mileageUnit: 'miles',
    transmission: 'Automatic',
    fuelType: 'Petrol',
    engine: '3.5L V6 Direct Injection (302 hp)',
    exteriorColor: 'Eminent White Pearl',
    interiorColor: 'Chateau Semi-Aniline Leather with Linear Dark Mocha Wood',
    vinPlaceholder: '58ABZ1B11MU****99',
    description: 'Renowned for supreme ride quietness, low maintenance cost, and dignified prestige. The Ultra Luxury specification adds lateral performance dampers, semi-aniline leather upholstery, power rear sunshade, and Mark Levinson sound.',
    features: [
      'Semi-Aniline Premium Leather Seating',
      'Performance Dampers for Glide Comfort',
      'Hands-Free Power Open/Close Trunk with Kick Sensor',
      'Power Rear Sunshade & Manual Rear-Door Sunshades',
      'Lexus Interface with 12.3-inch Display',
      'Intuitive Parking Assist with Auto Braking',
    ],
    images: [
      'https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=1400&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?q=80&w=1400&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?q=80&w=1400&auto=format&fit=crop',
    ],
    status: 'Reserved',
    importStatus: 'Customs Cleared',
    location: 'Victoria Island Annex, Lagos',
    featured: false,
    purchasePrice: 25000,
    sellingPrice: 39500000,
    createdAt: '2026-08-28T16:00:00Z',
    updatedAt: '2026-09-04T18:00:00Z',
  },
  {
    slug: '2023-mercedes-benz-c-class-c300',
    make: 'Mercedes-Benz',
    model: 'C-Class',
    year: 2023,
    trim: 'C 300 4MATIC AMG Line Night Edition',
    bodyType: 'Sedan',
    price: 54000000,
    currency: 'NGN',
    mileage: 12100,
    mileageUnit: 'miles',
    transmission: 'Automatic',
    fuelType: 'Hybrid',
    engine: '2.0L Inline-4 Turbo with Mild Hybrid EQ (255 hp)',
    exteriorColor: 'Selenite Grey Metallic',
    interiorColor: 'Sienna Brown / Black MB-Tex',
    vinPlaceholder: 'W1KZF8DB8PN****33',
    description: 'The latest W206 Generation C-Class embodying mini-S-Class luxury. Features the massive portrait-oriented 11.9-inch central OLED touch display, biometric fingerprint scanner, 64-color ambient lighting vents, and AMG styling bumpers.',
    features: [
      '11.9-inch Portrait Center OLED Display',
      'Biometric Fingerprint Authentication',
      'AMG Line Exterior & Interior Packages',
      'Burmester 3D Surround Sound System',
      'Active Blind Spot Assist & Lane Keeping Assist',
      'Panoramic Sunroof & Sport Seats',
    ],
    images: [
      'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?q=80&w=1400&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1617814076367-b759c7d7e738?q=80&w=1400&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1542282088-72c9c27ed0cd?q=80&w=1400&auto=format&fit=crop',
    ],
    status: 'In Transit',
    importStatus: 'On High Seas',
    location: 'En Route to Tin Can Island Port, Lagos',
    featured: true,
    estimatedArrival: 'Arrival at Lagos Port in 12 days',
    purchasePrice: 34000,
    sellingPrice: 54000000,
    createdAt: '2026-08-30T11:00:00Z',
    updatedAt: '2026-09-05T08:00:00Z',
  },
  {
    slug: '2022-honda-accord-touring-2-0t',
    make: 'Honda',
    model: 'Accord',
    year: 2022,
    trim: 'Touring 2.0T (Top Specification)',
    bodyType: 'Sedan',
    price: 36500000,
    currency: 'NGN',
    mileage: 22000,
    mileageUnit: 'miles',
    transmission: 'Automatic',
    fuelType: 'Petrol',
    engine: '2.0L VTEC Turbo (252 hp) with 10-Speed AT',
    exteriorColor: 'San Marino Red',
    interiorColor: 'Black Perforated Leather',
    vinPlaceholder: '1HGCV2F93NA****77',
    description: 'The definitive executive sports sedan with the coveted Civic Type-R derived 2.0L VTEC Turbo powerplant paired with a smooth 10-speed automatic transmission.',
    features: [
      'Adaptive Damper System',
      'Heads-Up Display (HUD)',
      'Ventilated & Heated Front Leather Seats',
      'Wireless Apple CarPlay & Android Auto',
      'Honda Sensing Safety Suite',
      '10-Speaker 450W Audio System',
    ],
    images: [
      'https://images.unsplash.com/photo-1590362891991-f776e747a588?q=80&w=1400&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1550355291-bbee04a92027?q=80&w=1400&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?q=80&w=1400&auto=format&fit=crop',
    ],
    status: 'Available',
    importStatus: 'At Lagos Holding Facility',
    location: 'Lagos Holding Bay, Lagos',
    featured: false,
    purchasePrice: 22000,
    sellingPrice: 36500000,
    createdAt: '2026-08-12T15:00:00Z',
    updatedAt: '2026-09-02T13:00:00Z',
  },
];

const INITIAL_SETTINGS = {
  _key: 'site_settings',
  heroHeadline: 'Find Your Next Vehicle. Imported With Confidence.',
  heroSubheadline: 'Mosobalaje Vehicle Imports connects Nigerian automotive buyers with verified, premium international vehicles sourced from top auctions including IAA and Copart, and tier-1 dealerships in North America, Europe, and Asia. Transparent clearing, zero odometer tampering, guaranteed peace of mind.',
  companyDescription: 'Mosobalaje Vehicle Imports is a premier automotive import and procurement agency based in Lagos, Nigeria. We are a registered member of IAA and Copart auction networks, providing seamless cross-border vehicle acquisition with verified provenance and door-to-door delivery across Nigeria.',
  phone: '0906 415 3303',
  email: 'inquiries@mosobalajeimports.ng',
  whatsappNumber: '2349064153303',
  officeAddress: 'Lagos Operations & Logistics Hub, Victoria Island, Lagos, Nigeria',
  businessHours: 'Monday – Friday: 8:00 AM – 6:00 PM | Saturday: 9:00 AM – 4:00 PM',
  instagramUrl: 'https://instagram.com/mosobalajeimports',
  facebookUrl: 'https://facebook.com/mosobalajeimports',
  linkedinUrl: 'https://linkedin.com/company/mosobalaje-vehicle-imports',
};

const INITIAL_LEADS = [
  {
    name: 'Dr. Adeyemi Balogun',
    phone: '+234 802 334 1190',
    email: 'adeyemi.balogun@medicallag.com',
    vehicleName: '2023 Lexus RX 350 F-Sport',
    budget: '₦65,000,000 - ₦70,000,000',
    source: 'Website Inquiry',
    status: 'Negotiating',
    notes: 'Visited inspection facility on Thursday. Test drive completed with spouse. Discussing trade-in of 2018 Toyota Prado.',
    assignedTo: 'Mosobalaje Senior Specialist',
    createdAt: '2026-09-02T11:20:00Z',
    updatedAt: '2026-09-04T15:00:00Z',
  },
  {
    name: 'Engr. Chukwuma Obi',
    phone: '+234 818 902 4432',
    email: 'c.obi@apexoffshore.ng',
    vehicleName: '2023 Toyota Land Cruiser Prado TX-L',
    budget: '₦90,000,000 - ₦95,000,000',
    source: 'WhatsApp',
    status: 'Qualified',
    notes: 'Needs bulletproofing consultation or heavy duty suspension for Port Harcourt trips.',
    assignedTo: 'Bolanle Alabi',
    createdAt: '2026-09-03T09:45:00Z',
    updatedAt: '2026-09-04T10:30:00Z',
  },
  {
    name: 'Mrs. Folashade Adeleke',
    phone: '+234 703 112 8840',
    email: 'folashade@lagoslawpartners.com',
    vehicleName: '2022 Mercedes-Benz GLE 450 4MATIC',
    budget: '₦85,000,000',
    source: 'Website Inquiry',
    status: 'Contacted',
    notes: 'Inquired about customs clearance documents and VIN check report.',
    assignedTo: 'Mosobalaje Senior Specialist',
    createdAt: '2026-09-04T14:15:00Z',
    updatedAt: '2026-09-04T17:00:00Z',
  },
];

const INITIAL_INQUIRIES = [
  {
    name: 'Dr. Adeyemi Balogun',
    phone: '+234 802 334 1190',
    email: 'adeyemi.balogun@medicallag.com',
    subject: 'Inquiry regarding 2023 Lexus RX 350 F-Sport',
    message: 'Good afternoon, is this RX 350 available for physical inspection this Saturday at your Lagos facility? Also kindly confirm if customs duties are fully settled.',
    vehicleName: '2023 Lexus RX 350 F-Sport',
    inquiryType: 'Vehicle Inquiry',
    status: 'Reviewing',
    internalNotes: 'Inspection scheduled for Saturday 11am. Staff notified.',
    createdAt: '2026-09-02T10:00:00Z',
    updatedAt: '2026-09-02T11:00:00Z',
  },
  {
    name: 'Alhaji Ibrahim Danladi',
    phone: '+234 809 555 7800',
    email: 'i.danladi@kanotrading.com',
    subject: 'Request for Custom Import: 2024 Toyota Land Cruiser VXR',
    message: 'Can you source a 2024 Toyota Land Cruiser 300 VXR directly from Dubai or Japan and clear at Tin Can Port for nationwide delivery?',
    inquiryType: 'Custom Import Quote',
    status: 'Contacted',
    internalNotes: 'Quotation sent for UAE export and ro-ro shipping with 35-day estimate.',
    createdAt: '2026-09-03T16:20:00Z',
    updatedAt: '2026-09-04T09:00:00Z',
  },
];

const INITIAL_REQUESTS = [
  {
    name: 'Senator Farouk Mohammed',
    phone: '+234 803 777 9901',
    email: 'farouk.m@nass.gov.ng',
    preferredMake: 'Mercedes-Benz',
    preferredModel: 'G 63 AMG',
    minYear: 2022,
    maxYear: 2024,
    budget: '₦220,000,000 - ₦260,000,000',
    transmission: 'Automatic',
    fuelType: 'Petrol',
    bodyType: 'SUV',
    requirements: 'Must be Magno Matte Black or Obsidian Black exterior with Bengal Red interior. Clean auction score 4.5+ or dealership certified.',
    status: 'Sourcing Active',
    createdAt: '2026-09-01T14:10:00Z',
  },
  {
    name: 'Tunde Bakare',
    phone: '+234 812 444 3210',
    email: 'tundebakare@fintechinnovations.ng',
    preferredMake: 'Toyota',
    preferredModel: 'Hilux Adventure 4x4',
    minYear: 2021,
    maxYear: 2023,
    budget: '₦45,000,000',
    transmission: 'Automatic',
    fuelType: 'Diesel',
    bodyType: 'Pickup Truck',
    requirements: 'Needed for site operations in Ogun state. Good suspension, genuine mileage under 40,000 km.',
    status: 'Pending Review',
    createdAt: '2026-09-04T12:00:00Z',
  },
];

const INITIAL_ADMIN = {
  name: 'Super Admin',
  email: 'admin@mosobalajeimports.ng',
  passwordHash: '$2b$10$dummy_hash_replace_with_real_bcrypt',
  role: 'Super Admin',
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
};

async function seed() {
  const MONGODB_URI = process.env.MONGODB_URI;
  if (!MONGODB_URI) {
    console.error('MONGODB_URI environment variable is not set');
    process.exit(1);
  }

  console.log('Connecting to MongoDB...');
  const { MongoClient } = await import('mongodb');
  const client = new MongoClient(MONGODB_URI);
  await client.connect();
  const db = client.db(process.env.MONGODB_DB || 'mosobalaje_imports');

  console.log('Dropping existing collections...');
  const collections = await db.listCollections().toArray();
  for (const col of collections) {
    await db.collection(col.name).drop();
  }

  console.log('Creating indexes...');
  await db.collection('vehicles').createIndexes([
    { key: { slug: 1 }, unique: true },
    { key: { status: 1 } },
    { key: { make: 1 } },
    { key: { model: 1 } },
    { key: { year: -1 } },
    { key: { featured: 1 } },
    { key: { createdAt: -1 } },
  ]);
  await db.collection('leads').createIndexes([
    { key: { status: 1 } },
    { key: { createdAt: -1 } },
  ]);
  await db.collection('inquiries').createIndexes([
    { key: { status: 1 } },
    { key: { createdAt: -1 } },
  ]);
  await db.collection('vehicleRequests').createIndexes([
    { key: { status: 1 } },
    { key: { createdAt: -1 } },
  ]);
  await db.collection('adminUsers').createIndexes([
    { key: { email: 1 }, unique: true },
  ]);
  await db.collection('settings').createIndexes([
    { key: { _key: 1 }, unique: true },
  ]);

  console.log('Seeding vehicles...');
  await db.collection('vehicles').insertMany(INITIAL_VEHICLES);

  console.log('Seeding leads...');
  await db.collection('leads').insertMany(INITIAL_LEADS);

  console.log('Seeding inquiries...');
  await db.collection('inquiries').insertMany(INITIAL_INQUIRIES);

  console.log('Seeding vehicle requests...');
  await db.collection('vehicleRequests').insertMany(INITIAL_REQUESTS);

  console.log('Seeding settings...');
  await db.collection('settings').insertOne(INITIAL_SETTINGS);

  console.log('Seeding admin user...');
  await db.collection('adminUsers').insertOne(INITIAL_ADMIN);

  console.log('Seed complete!');
  await client.close();
  process.exit(0);
}

seed().catch((err) => {
  console.error('Seed failed:', err);
  process.exit(1);
});