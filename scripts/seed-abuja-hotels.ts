import { PrismaClient, Role, Amenity } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Starting Abuja hotels seed...');

  // 1. Create a Manager User
  const manager = await prisma.user.upsert({
    where: { email: 'manager@abuja-hotels.ng' },
    update: {},
    create: {
      email: 'manager@abuja-hotels.ng',
      phone: '+2348012345678',
      passwordHash: '$2a$12$R9h/cIPz0gi.URNNX3kh2OPST9/PgBkqquzi.Ss7KIUgO2t0jWMUW', // 'admin123'
      fullName: 'Abuja Manager',
      role: Role.HOTEL_MANAGER,
    },
  });

  // 2. Define Abuja Hotels Data
  const hotelsData = [
    {
      name: 'Transcorp Hilton Abuja',
      description: 'Luxury hotel located in the heart of Nigeria\'s capital city, offering world-class amenities and dining.',
      address: '1 Aguiyi Ironsi St, Maitama, Abuja',
      latitude: 9.0833,
      longitude: 7.4981,
      coverImage: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
      status: 'APPROVED',
      managerId: manager.id,
      amenities: {
        create: [
          { amenity: Amenity.WIFI },
          { amenity: Amenity.POOL },
          { amenity: Amenity.GYM },
          { amenity: Amenity.RESTAURANT },
          { amenity: Amenity.PARKING },
          { amenity: Amenity.BACKUP_POWER }
        ]
      },
      roomTypes: {
        create: [
          {
            name: 'Standard Guest Room',
            description: 'Comfortable room with city views.',
            pricePerNight: 95000,
            capacity: 2,
            quantity: 50,
            status: 'ACTIVE',
            images: {
              create: [
                { url: 'https://images.unsplash.com/photo-1611892440504-42a792e24d32?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' }
              ]
            }
          },
          {
            name: 'Executive Suite',
            description: 'Spacious suite with lounge access and premium amenities.',
            pricePerNight: 250000,
            capacity: 2,
            quantity: 10,
            status: 'ACTIVE',
            images: {
              create: [
                { url: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' }
              ]
            }
          }
        ]
      }
    },
    {
      name: 'The Envoy Hotel',
      description: 'A sophisticated boutique hotel nestled in the diplomatic enclave of Abuja.',
      address: '305 Diplomatic Drive, Central Business District, Abuja',
      latitude: 9.0558,
      longitude: 7.4883,
      coverImage: 'https://images.unsplash.com/photo-1542314831-c6a4d14d8c85?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
      status: 'APPROVED',
      managerId: manager.id,
      amenities: {
        create: [
          { amenity: Amenity.WIFI },
          { amenity: Amenity.POOL },
          { amenity: Amenity.GYM },
          { amenity: Amenity.RESTAURANT },
          { amenity: Amenity.BACKUP_POWER }
        ]
      },
      roomTypes: {
        create: [
          {
            name: 'Diplomatic Standard',
            description: 'Elegant room for the modern traveler.',
            pricePerNight: 120000,
            capacity: 2,
            quantity: 30,
            status: 'ACTIVE',
            images: {
              create: [
                { url: 'https://images.unsplash.com/photo-1566665797739-1674de7a421a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' }
              ]
            }
          }
        ]
      }
    },
    {
      name: 'Nordic Hotel Abuja',
      description: 'Scandinavian design meets Nigerian hospitality in Jabi.',
      address: 'Plot 1332 Shehu Yaradua Blvd, Mabushi, Abuja',
      latitude: 9.0712,
      longitude: 7.4331,
      coverImage: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
      status: 'APPROVED',
      managerId: manager.id,
      amenities: {
        create: [
          { amenity: Amenity.WIFI },
          { amenity: Amenity.RESTAURANT },
          { amenity: Amenity.PARKING },
          { amenity: Amenity.BACKUP_POWER }
        ]
      },
      roomTypes: {
        create: [
          {
            name: 'Nordic Room',
            description: 'Minimalist design for maximum comfort.',
            pricePerNight: 85000,
            capacity: 2,
            quantity: 20,
            status: 'ACTIVE',
            images: {
              create: [
                { url: 'https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' }
              ]
            }
          }
        ]
      }
    }
  ];

  // 3. Insert Data
  for (const h of hotelsData) {
    const existing = await prisma.hotel.findFirst({ where: { name: h.name } });
    if (!existing) {
      await prisma.hotel.create({
        data: h as any,
      });
      console.log(`Created hotel: ${h.name}`);
    } else {
      console.log(`Hotel already exists: ${h.name}`);
    }
  }

  console.log('Seed completed successfully.');
}

main()
  .catch((e) => {
    console.error('Error during seed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
