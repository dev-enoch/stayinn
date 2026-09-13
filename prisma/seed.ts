import { PrismaClient, Role, HotelStatus, Amenity, RoomStatus, BookingStatus, PaymentGateway, PaymentStatus, PayoutStatus } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding database...');

  // 1. CLEAR DATABASE
  console.log('Clearing existing data...');
  await prisma.savedCard.deleteMany({});
  await prisma.wishlist.deleteMany({});
  await prisma.payout.deleteMany({});
  await prisma.payment.deleteMany({});
  await prisma.booking.deleteMany({});
  await prisma.roomImage.deleteMany({});
  await prisma.roomType.deleteMany({});
  await prisma.hotelAmenity.deleteMany({});
  await prisma.hotel.deleteMany({});
  await prisma.user.deleteMany({});
  await prisma.city.deleteMany({});
  await prisma.commissionSetting.deleteMany({});

  // 2. SEED SETTINGS & CITIES
  console.log('Seeding cities & settings...');
  await prisma.commissionSetting.create({
    data: { rate: 0.1000, active: true }
  });

  const cities = [
    { name: 'Kaduna', isActive: true, isComingSoon: false, description: 'The Crocodile City — cultural and industrial hub of the North. Home to a growing premium hospitality scene.', imageUrl: 'https://images.unsplash.com/photo-1627885440702-8a9d18e578c7?auto=format&fit=crop&q=80' },
    { name: 'Kano', isActive: true, isComingSoon: true, description: 'The center of commerce in Northern Nigeria.', imageUrl: 'https://images.unsplash.com/photo-1602028682054-0a3a41147814?auto=format&fit=crop&q=80' },
  ];
  for (const city of cities) {
    await prisma.city.create({ data: city });
  }

  // 3. SEED USERS
  console.log('Seeding users...');
  const passwordHash = await bcrypt.hash('password123', 10);

  const admin = await prisma.user.create({
    data: { email: 'admin@monarchstay.com', phone: '+2348000000001', passwordHash, fullName: 'Monarch Stay Admin', role: Role.ADMIN }
  });
  const manager = await prisma.user.create({
    data: { email: 'manager@monarchstay.com', phone: '+2348000000002', passwordHash, fullName: 'Kaduna Hotel Manager', role: Role.HOTEL_MANAGER }
  });
  const booker = await prisma.user.create({
    data: { email: 'booker@monarchstay.com', phone: '+2348000000003', passwordHash, fullName: 'Frequent Traveler', role: Role.BOOKER }
  });

  await prisma.savedCard.create({
    data: { userId: booker.id, authorizationCode: 'AUTH_123456', last4: '4081', expMonth: '12', expYear: '2028', brand: 'visa', bank: 'GTBank', reusable: true }
  });

  // 4. SEED HOTELS IN KADUNA
  console.log('Seeding hotels and room types...');

  const hotelGalleryImages = [
    'https://images.unsplash.com/photo-1618221118493-9cfa1a1c00da?auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1600607686527-6fb886090705?auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1566665797739-1674de7a421a?auto=format&fit=crop&q=80',
  ];

  const standardRoomImages = [
    'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1595576508898-0ad5c879a061?auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1560448204-61dc36dc98c8?auto=format&fit=crop&q=80',
  ];

  const deluxeRoomImages = [
    'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1560347876-aeef00ee58a1?auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1549294413-26f195200c16?auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1554415707-6e8cfc93fe23?auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1616594039964-ae9021a400a0?auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1493809842364-78817add7ffb?auto=format&fit=crop&q=80',
  ];

  const suiteRoomImages = [
    'https://images.unsplash.com/photo-1559599101-f09722fb4948?auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1609949279531-cf48d64bed89?auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1611892440504-42a792e24d32?auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1467987506553-8f3916508521?auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&q=80',
  ];

  const kadunaHotelsData = [
    {
      name: 'The Croft Residence',
      address: 'Plot 12, Barnawa Estate, Kaduna South',
      lat: 10.4908, lng: 7.4283,
      image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&q=80',
      isVerified: true, isSuperhost: true,
      phone: '+2348033001122',
      whatsapp: '+2348033001122',
      cancellation: 'Free cancellation up to 48 hours before check-in. No refund for cancellations within 48 hours of arrival.',
      description: 'The Croft Residence is a premium serviced apartment complex nestled in the secure Barnawa Estate. Designed for executives and long-stay travelers, each unit combines modern aesthetics with warm Nigerian hospitality. Enjoy uninterrupted 24/7 power, high-speed fiber Wi-Fi, and dedicated concierge service.',
    },
    {
      name: 'Malali Heights',
      address: '15 Kings Way, Malali GRA, Kaduna',
      lat: 10.5511, lng: 7.4520,
      image: 'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?auto=format&fit=crop&q=80',
      isVerified: true, isSuperhost: false,
      phone: '+2348059887766',
      whatsapp: '+2348059887766',
      cancellation: 'Cancellation 3 days before arrival is free. 50% charge applies within 3 days of arrival.',
      description: 'Malali Heights offers elegant accommodation within the prestigious Malali Government Reserved Area. The property is surrounded by lush greenery and features spacious rooms with en-suite bathrooms, fully equipped kitchenettes, and secure parking. Ideal for both leisure and corporate guests.',
    },
    {
      name: 'Isa Kaita Suites',
      address: '7 Isa Kaita Road, Kaduna North',
      lat: 10.5312, lng: 7.4423,
      image: 'https://images.unsplash.com/photo-1566665797739-1674de7a421a?auto=format&fit=crop&q=80',
      isVerified: false, isSuperhost: false,
      phone: '+2348076543210',
      whatsapp: '+2348076543210',
      cancellation: 'Free cancellation up to 24 hours before check-in. Full charge applies thereafter.',
      description: 'Strategically located along Isa Kaita Road, these suites provide comfortable and affordable luxury in Kaduna North. Features well-maintained rooms with modern décor, room service, and proximity to major business districts and government offices.',
    },
    {
      name: 'Kaduna Independence Villa',
      address: 'Independence Way, City Centre, Kaduna',
      lat: 10.5122, lng: 7.4331,
      image: 'https://images.unsplash.com/photo-1618221118493-9cfa1a1c00da?auto=format&fit=crop&q=80',
      isVerified: true, isSuperhost: true,
      phone: '+2348081488080',
      whatsapp: '+2348081488080',
      cancellation: 'Free cancellation up to 72 hours before check-in. 100% charged for cancellations within 72 hours.',
      description: 'Located at the prestigious Independence Way in central Kaduna, this villa is a landmark property offering unrivalled views and refined luxury. The property features 24/7 security, a swimming pool, business lounge, and concierge services. Perfect for VIP guests and corporate retreats.',
    },
    {
      name: 'Asa Pyramid Hotel',
      address: '24 Lafia Road, Ungwan Rimi, Kaduna',
      lat: 10.5218, lng: 7.4411,
      image: 'https://images.unsplash.com/photo-1590483736622-398bb2c45980?auto=format&fit=crop&q=80',
      isVerified: true, isSuperhost: false,
      phone: '+2348144084721',
      whatsapp: '+2348144084721',
      cancellation: 'Cancellation 48 hours before arrival is free. 100% will be charged if guests cancel less than 48 hours before arrival.',
      description: 'Asa Pyramid Hotel stands as a beacon of comfort and reliability on Lafia Road. Popular with business travelers and visiting professionals, the hotel offers clean, well-appointed rooms, a rooftop terrace, and an on-site restaurant serving Nigerian and continental cuisine.',
    },
    {
      name: 'Narayi Boutique Hotel',
      address: '8 Close 5, Narayi High Cost, Kaduna',
      lat: 10.4633, lng: 7.4519,
      image: 'https://images.unsplash.com/photo-1551882547-ff40c0d5b5df?auto=format&fit=crop&q=80',
      isVerified: false, isSuperhost: false,
      phone: '+2348098765432',
      whatsapp: '+2348098765432',
      cancellation: 'Free cancellation up to 48 hours before check-in.',
      description: 'Tucked away in the serene Narayi High Cost residential area, this boutique hotel offers an intimate and personalized experience. Featuring artfully decorated rooms, a garden lounge, and home-cooked Nigerian breakfast options, it is a perfect home away from home for weekend travelers.',
    },
  ];

  const amenitiesList = [Amenity.WIFI, Amenity.WATER, Amenity.BACKUP_POWER, Amenity.AIR_CONDITIONING, Amenity.PARKING];
  const allHotels = [];
  const allRoomTypes = [];

  for (const h of kadunaHotelsData) {
    const slug = h.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
    const hotel = await prisma.hotel.create({
      data: {
        managerId: manager.id,
        slug,
        name: h.name,
        description: h.description,
        address: h.address,
        latitude: h.lat,
        longitude: h.lng,
        coverImage: h.image,
        gallery: hotelGalleryImages.slice(0, Math.floor(Math.random() * 4) + 2), // 2-5 gallery images
        rating: h.isSuperhost ? 4.96 : parseFloat((Math.random() * (4.9 - 4.2) + 4.2).toFixed(2)),
        isPremium: h.isVerified,
        isTopRated: h.isSuperhost,
        propertyType: h.isSuperhost ? 'Premium Estate' : 'Boutique Hotel',
        hostResponseRate: 100,
        highlights: ['Self Check-in (Smart Lock)', 'Dedicated Workspace', 'Premium Linens', '24/7 Security', 'Fiber Wi-Fi'],
        whatsappNumber: h.whatsapp,
        phoneNumber: h.phone,
        checkInTime: '2:00 PM',
        checkOutTime: '12:00 PM',
        cancellationPolicy: h.cancellation,
        status: HotelStatus.APPROVED,
        isVerified: h.isVerified,
        isSuperhost: h.isSuperhost,
      }
    });
    allHotels.push(hotel);

    // Add amenities
    for (const am of amenitiesList) {
      await prisma.hotelAmenity.create({ data: { hotelId: hotel.id, amenity: am } });
    }
    if (h.isSuperhost) {
      await prisma.hotelAmenity.create({ data: { hotelId: hotel.id, amenity: Amenity.POOL } });
    }
    await prisma.hotelAmenity.create({ data: { hotelId: hotel.id, amenity: Amenity.RESTAURANT } });

    // ─── ROOM TYPES ───────────────────────────────────────────────────────────

    // Standard Room
    const standardRoom = await prisma.roomType.create({
      data: {
        hotelId: hotel.id,
        name: 'Standard Room',
        description: 'Our standard rooms are fully furnished with a queen-size bed, en-suite bathroom, flat-screen TV, and high-speed Wi-Fi. Perfect for solo travelers or couples seeking comfortable accommodation at great value.',
        pricePerNight: Math.floor(Math.random() * 15000) + 25000, // 25k–40k
        capacity: 2,
        quantity: 10,
        status: RoomStatus.ACTIVE,
        bedType: 'Queen Bed',
        roomSize: 25,
        amenities: ['Free Wi-Fi', 'Air Conditioning', '24/7 Power', 'En-Suite Bathroom', 'Flat-Screen TV', 'Mini Fridge', 'Work Desk', 'Daily Housekeeping'],
      }
    });

    // Deluxe Room
    const deluxeRoom = await prisma.roomType.create({
      data: {
        hotelId: hotel.id,
        name: 'Deluxe Suite',
        description: 'Spacious suites with a separate seating area, king-size bed, and premium finishing. Features a large bathroom with rainfall shower, a kitchenette with microwave and kettle, and a private balcony with city views.',
        pricePerNight: Math.floor(Math.random() * 25000) + 55000, // 55k–80k
        capacity: 3,
        quantity: 5,
        status: RoomStatus.ACTIVE,
        bedType: 'King Bed',
        roomSize: 42,
        amenities: ['Free Wi-Fi', 'Air Conditioning', '24/7 Power (Dual Generator)', 'En-Suite Bathroom (Rainfall Shower)', 'Flat-Screen TV', 'Kitchenette', 'Private Balcony', 'Mini Bar', 'Work Desk', 'Daily Housekeeping', 'Room Service'],
      }
    });

    // Executive Suite (for premium hotels)
    let executiveSuite = null;
    if (h.isVerified) {
      executiveSuite = await prisma.roomType.create({
        data: {
          hotelId: hotel.id,
          name: 'Executive Suite',
          description: 'The pinnacle of luxury accommodation. A two-room suite with a dedicated living area, master bedroom with a king-size bed, marble-finished bathroom with jacuzzi, full kitchen with dining area, and panoramic city views from a private terrace.',
          pricePerNight: Math.floor(Math.random() * 40000) + 120000, // 120k–160k
          capacity: 4,
          quantity: 2,
          status: RoomStatus.ACTIVE,
          bedType: 'King Bed + Sofa Bed',
          roomSize: 75,
          amenities: ['Ultra-Fast Wi-Fi', 'Air Conditioning', '24/7 Power (Inverter + Generator)', 'Jacuzzi Bathroom', 'Smart TV (55")', 'Full Kitchen', 'Private Terrace', 'Mini Bar (Stocked)', 'Work Desk + Printer', 'Daily Housekeeping', 'Dedicated Concierge', 'Airport Transfer', 'Complimentary Breakfast'],
        }
      });
    }

    allRoomTypes.push(standardRoom, deluxeRoom);
    if (executiveSuite) allRoomTypes.push(executiveSuite);

    // ─── ROOM IMAGES ──────────────────────────────────────────────────────────
    for (let i = 0; i < standardRoomImages.length; i++) {
      await prisma.roomImage.create({ data: { roomTypeId: standardRoom.id, url: standardRoomImages[i], sortOrder: i + 1 } });
    }
    for (let i = 0; i < deluxeRoomImages.length; i++) {
      await prisma.roomImage.create({ data: { roomTypeId: deluxeRoom.id, url: deluxeRoomImages[i], sortOrder: i + 1 } });
    }
    if (executiveSuite) {
      for (let i = 0; i < suiteRoomImages.length; i++) {
        await prisma.roomImage.create({ data: { roomTypeId: executiveSuite.id, url: suiteRoomImages[i], sortOrder: i + 1 } });
      }
    }
  }

  // 5. SEED WISHLIST
  await prisma.wishlist.create({ data: { userId: booker.id, hotelId: allHotels[0].id } });
  await prisma.wishlist.create({ data: { userId: booker.id, hotelId: allHotels[3].id } });

  // 6. SEED BOOKINGS & PAYMENTS (6 months of data)
  console.log('Seeding 6 months of booking data...');
  const commissionRate = 0.1000;
  const today = new Date();

  for (let i = 0; i < 50; i++) {
    const room = allRoomTypes[Math.floor(Math.random() * allRoomTypes.length)];
    const hotel = allHotels.find(h => h.id === room.hotelId)!;

    const offsetDays = Math.floor(Math.random() * 180) - 90;
    const checkIn = new Date(today);
    checkIn.setDate(today.getDate() + offsetDays);

    const duration = Math.floor(Math.random() * 5) + 1;
    const checkOut = new Date(checkIn);
    checkOut.setDate(checkIn.getDate() + duration);

    const amount = room.pricePerNight * duration;
    const commissionAmount = Math.round(amount * commissionRate);
    const hotelPayout = amount - commissionAmount;

    let status: BookingStatus = BookingStatus.PENDING;
    let paymentStatus: PaymentStatus = PaymentStatus.INITIATED;
    let payoutStatus: PayoutStatus = PayoutStatus.PENDING;

    if (checkOut < today) {
      status = BookingStatus.COMPLETED;
      paymentStatus = PaymentStatus.SUCCESS;
      payoutStatus = PayoutStatus.SUCCESS;
    } else if (checkIn < today && checkOut >= today) {
      status = BookingStatus.CONFIRMED;
      paymentStatus = PaymentStatus.SUCCESS;
      payoutStatus = PayoutStatus.PROCESSING;
    } else {
      status = Math.random() > 0.3 ? BookingStatus.CONFIRMED : BookingStatus.PENDING;
      paymentStatus = status === BookingStatus.CONFIRMED ? PaymentStatus.SUCCESS : PaymentStatus.INITIATED;
    }

    const booking = await prisma.booking.create({
      data: {
        userId: booker.id,
        hotelId: hotel.id,
        rooms: {
          create: [{
            roomTypeId: room.id,
            quantity: 1,
            pricePerNight: room.pricePerNight,
          }]
        },
        checkInDate: checkIn,
        checkOutDate: checkOut,
        numberOfGuests: Math.floor(Math.random() * room.capacity) + 1,
        numberOfNights: duration,
        totalAmount: amount,
        commissionRate,
        commissionAmount,
        hotelPayout,
        status,
        confirmedAt: status === BookingStatus.CONFIRMED || status === BookingStatus.COMPLETED ? new Date(checkIn.getTime() - 86400000) : null,
        createdAt: new Date(checkIn.getTime() - 86400000 * 2),
      }
    });

    if (paymentStatus === PaymentStatus.SUCCESS) {
      await prisma.payment.create({
        data: {
          bookingId: booking.id,
          userId: booker.id,
          amount,
          gateway: PaymentGateway.PAYSTACK,
          gatewayReference: `REF_${Math.random().toString(36).substring(2, 10).toUpperCase()}`,
          status: paymentStatus,
          createdAt: booking.createdAt,
        }
      });
    }

    if (payoutStatus === PayoutStatus.SUCCESS || payoutStatus === PayoutStatus.PROCESSING) {
      await prisma.payout.create({
        data: {
          hotelId: hotel.id,
          bookingId: booking.id,
          amount: hotelPayout,
          status: payoutStatus,
          reference: payoutStatus === PayoutStatus.SUCCESS ? `PO_${Math.random().toString(36).substring(2, 10).toUpperCase()}` : null,
          processedAt: payoutStatus === PayoutStatus.SUCCESS ? new Date(checkOut.getTime() + 86400000) : null,
        }
      });
    }
  }

  console.log('Seeding finished successfully.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
