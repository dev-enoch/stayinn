import { PrismaClient, Role, HotelStatus, RoomStatus } from '@prisma/client';

const prisma = new PrismaClient();

const cities = [
  { name: 'Lagos, Nigeria', lat: 6.5244, lng: 3.3792 },
  { name: 'Abuja, Nigeria', lat: 9.0579, lng: 7.4951 },
  { name: 'Port Harcourt, Nigeria', lat: 4.8156, lng: 7.0498 },
  { name: 'Ibadan, Nigeria', lat: 7.3775, lng: 3.9470 },
  { name: 'Enugu, Nigeria', lat: 6.4584, lng: 7.5464 },
  { name: 'Calabar, Nigeria', lat: 4.9757, lng: 8.3417 },
  { name: 'Kano, Nigeria', lat: 12.0022, lng: 8.5920 },
];

const hotelNames = [
  'Grand', 'Royal', 'Luxury', 'Continental', 'Boutique', 'Palace', 'Oasis', 'Heritage', 'View', 'Springs', 'Gardens', 'Suites', 'Resort', 'Lodge'
];

const images = [
  'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80',
  'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800&q=80',
  'https://images.unsplash.com/photo-1542314831-c6a4d142104d?w=800&q=80',
  'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=800&q=80',
  'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800&q=80',
  'https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=800&q=80',
  'https://images.unsplash.com/photo-1590490360182-c33d57733427?w=800&q=80',
  'https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=800&q=80'
];

async function main() {
  console.log('Starting seed...');

  // 1. Create Admin User
  const adminEmail = process.env.ADMIN_EMAIL || 'admin@stayinn.ng';
  const adminPasswordHash = '$2a$12$R9h/cIPz0gi.URNNX3kh2OPST9/PgBkqquzi.Ss7KIUgO2t0jWMUW'; // 'admin123'

  const admin = await prisma.user.upsert({
    where: { email: adminEmail },
    update: {},
    create: {
      email: adminEmail,
      phone: '+2348000000000',
      passwordHash: adminPasswordHash,
      fullName: 'System Admin',
      role: Role.ADMIN,
    },
  });
  console.log(`Admin user created: ${admin.email}`);

  // 2. Create Manager User
  const manager = await prisma.user.upsert({
    where: { email: 'manager@stayinn.ng' },
    update: {},
    create: {
      email: 'manager@stayinn.ng',
      phone: '+2349000000000',
      passwordHash: adminPasswordHash,
      fullName: 'Test Manager',
      role: Role.HOTEL_MANAGER,
    },
  });

  // 3. Create Commission Setting (10%)
  await prisma.commissionSetting.create({
    data: {
      rate: 0.1000,
      active: true,
    },
  });

  // 4. Create 30 Hotels
  console.log('Seeding 30 hotels...');
  for (let i = 1; i <= 30; i++) {
    const city = cities[i % cities.length];
    const namePrefix = hotelNames[i % hotelNames.length];
    const nameSuffix = hotelNames[(i + 3) % hotelNames.length];
    const price = Math.floor(Math.random() * (250000 - 30000 + 1) + 30000); // 30k to 250k NGN
    
    await prisma.hotel.create({
      data: {
        managerId: manager.id,
        name: `The ${namePrefix} ${nameSuffix} ${city.name.split(',')[0]}`,
        description: `Experience the finest luxury at this premium destination located in the heart of ${city.name}. Offering breathtaking views and uncompromising comfort.`,
        address: city.name,
        latitude: city.lat + (Math.random() * 0.1 - 0.05),
        longitude: city.lng + (Math.random() * 0.1 - 0.05),
        coverImage: images[i % images.length],
        status: HotelStatus.APPROVED,
        roomTypes: {
          create: [
            {
              name: 'Deluxe Room',
              description: 'A beautiful deluxe room with modern amenities.',
              pricePerNight: price,
              capacity: 2,
              quantity: Math.floor(Math.random() * 10) + 2,
              status: RoomStatus.ACTIVE
            }
          ]
        }
      }
    });
  }

  console.log('Seed completed successfully. Added 30 hotels.');
}

main()
  .catch((e) => {
    console.error('Error during seed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
