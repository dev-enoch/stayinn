import { PrismaClient, Role, HotelStatus, Amenity, RoomStatus } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding database...');
  
  // Clear existing data (optional, for safety, we might skip clearing to avoid wiping real data)
  // Let's rely on upsert or just create unique items if they don't exist.
  
  const passwordHash = await bcrypt.hash('password123', 10);

  const manager = await prisma.user.upsert({
    where: { email: 'manager@stayinn.com' },
    update: {},
    create: {
      email: 'manager@stayinn.com',
      phone: '+2348000000001',
      passwordHash,
      fullName: 'Stayinn Manager',
      role: Role.HOTEL_MANAGER,
    },
  });

  const admin = await prisma.user.upsert({
    where: { email: 'admin@stayinn.com' },
    update: {},
    create: {
      email: 'admin@stayinn.com',
      phone: '+2348000000002',
      passwordHash,
      fullName: 'Stayinn Admin',
      role: Role.ADMIN,
    },
  });

  // Hotel 1
  const hotel1 = await prisma.hotel.upsert({
    where: { id: 'hotel-1-ikoyi' },
    update: { latitude: 6.4520, longitude: 3.4350 },
    create: {
      id: 'hotel-1-ikoyi',
      managerId: manager.id,
      name: 'The Courtyard Residence',
      description: 'Luxury Boutique Serviced Residence with 24/7 Power',
      address: 'Ikoyi, Lagos',
      latitude: 6.4520,
      longitude: 3.4350,
      coverImage: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&q=80',
      status: HotelStatus.APPROVED,
    }
  });

  // Ensure amenities exist
  // (We're skipping Amenity for now to just create room types)
  
  await prisma.roomType.upsert({
    where: { id: 'room-1-hotel-1' },
    update: {},
    create: {
      id: 'room-1-hotel-1',
      hotelId: hotel1.id,
      name: 'Executive Suite',
      description: 'Spacious suite with king-size bed and city views.',
      pricePerNight: 150000,
      capacity: 2,
      quantity: 5,
      status: RoomStatus.ACTIVE,
    }
  });

  // Hotel 2
  const hotel2 = await prisma.hotel.upsert({
    where: { id: 'hotel-2-lekki' },
    update: { latitude: 6.4428, longitude: 3.4715 },
    create: {
      id: 'hotel-2-lekki',
      managerId: manager.id,
      name: 'Lekki Phase 1 Loft',
      description: 'Creative and Tech Hub Loft with Dedicated Fiber',
      address: 'Lekki Phase 1, Lagos',
      latitude: 6.4428,
      longitude: 3.4715,
      coverImage: 'https://images.unsplash.com/photo-1626245107068-18e404bf7cba?auto=format&fit=crop&q=80',
      status: HotelStatus.APPROVED,
    }
  });

  await prisma.roomType.upsert({
    where: { id: 'room-1-hotel-2' },
    update: {},
    create: {
      id: 'room-1-hotel-2',
      hotelId: hotel2.id,
      name: 'Studio Loft',
      description: 'Modern studio with open-concept design and blazing fast internet.',
      pricePerNight: 95000,
      capacity: 2,
      quantity: 10,
      status: RoomStatus.ACTIVE,
    }
  });

  // Hotel 3
  const hotel3 = await prisma.hotel.upsert({
    where: { id: 'hotel-3-maitama' },
    update: { latitude: 9.0833, longitude: 7.4933 },
    create: {
      id: 'hotel-3-maitama',
      managerId: manager.id,
      name: 'Maitama Diplomatic Villa',
      description: 'Exclusive villa in the heart of Abuja\'s diplomatic zone.',
      address: 'Maitama, Abuja',
      latitude: 9.0833,
      longitude: 7.4933,
      coverImage: 'https://images.unsplash.com/photo-1577977461421-4f1647413a96?auto=format&fit=crop&q=80',
      status: HotelStatus.APPROVED,
    }
  });

  await prisma.roomType.upsert({
    where: { id: 'room-1-hotel-3' },
    update: {},
    create: {
      id: 'room-1-hotel-3',
      hotelId: hotel3.id,
      name: 'Presidential Villa',
      description: 'Entire 5-bedroom villa with private pool.',
      pricePerNight: 500000,
      capacity: 10,
      quantity: 1,
      status: RoomStatus.ACTIVE,
    }
  });

  // Hotel 4
  const hotel4 = await prisma.hotel.upsert({
    where: { id: 'hotel-4-vi' },
    update: { latitude: 6.4281, longitude: 3.4219 },
    create: {
      id: 'hotel-4-vi',
      managerId: manager.id,
      name: 'Victoria Island Penthouse',
      description: 'High-rise luxury living in the financial center.',
      address: 'Victoria Island, Lagos',
      latitude: 6.4281,
      longitude: 3.4219,
      coverImage: 'https://images.unsplash.com/photo-1590483736622-398bb2c45980?auto=format&fit=crop&q=80',
      status: HotelStatus.APPROVED,
    }
  });

  await prisma.roomType.upsert({
    where: { id: 'room-1-hotel-4' },
    update: {},
    create: {
      id: 'room-1-hotel-4',
      hotelId: hotel4.id,
      name: 'Panoramic Penthouse',
      description: 'Stunning city and ocean views.',
      pricePerNight: 200000,
      capacity: 4,
      quantity: 2,
      status: RoomStatus.ACTIVE,
    }
  });

  console.log('Seeding finished.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
