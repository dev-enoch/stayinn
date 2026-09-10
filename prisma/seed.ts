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
    { name: 'Kaduna', isActive: true, isComingSoon: false, description: 'The Crocodile City, cultural & industrial hub of the North.', imageUrl: 'https://images.unsplash.com/photo-1627885440702-8a9d18e578c7?auto=format&fit=crop&q=80' },
    { name: 'Kano', isActive: true, isComingSoon: true, description: 'The center of commerce.', imageUrl: 'https://images.unsplash.com/photo-1602028682054-0a3a41147814?auto=format&fit=crop&q=80' },
  ];
  for (const city of cities) {
    await prisma.city.create({ data: city });
  }

  // 3. SEED USERS
  console.log('Seeding users...');
  const passwordHash = await bcrypt.hash('password123', 10);

  const admin = await prisma.user.create({
    data: { email: 'admin@stayinn.com', phone: '+2348000000001', passwordHash, fullName: 'Stayinn Admin', role: Role.ADMIN }
  });
  const manager = await prisma.user.create({
    data: { email: 'manager@stayinn.com', phone: '+2348000000002', passwordHash, fullName: 'Kaduna Hotel Manager', role: Role.HOTEL_MANAGER }
  });
  const booker = await prisma.user.create({
    data: { email: 'booker@stayinn.com', phone: '+2348000000003', passwordHash, fullName: 'Frequent Traveler', role: Role.BOOKER }
  });

  await prisma.savedCard.create({
    data: { userId: booker.id, authorizationCode: 'AUTH_123456', last4: '4081', expMonth: '12', expYear: '2028', brand: 'visa', bank: 'GTBank', reusable: true }
  });

  // 4. SEED HOTELS IN KADUNA
  console.log('Seeding hotels and room types...');
  const kadunaHotelsData = [
    { name: 'The Croft Residence', address: 'Barnawa, Kaduna', lat: 10.4908, lng: 7.4283, image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&q=80', isVerified: true, isSuperhost: true },
    { name: 'Malali Heights', address: 'Malali GRA, Kaduna', lat: 10.5511, lng: 7.4520, image: 'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?auto=format&fit=crop&q=80', isVerified: true, isSuperhost: false },
    { name: 'Isa Kaita Suites', address: 'Isa Kaita Road, Kaduna', lat: 10.5312, lng: 7.4423, image: 'https://images.unsplash.com/photo-1566665797739-1674de7a421a?auto=format&fit=crop&q=80', isVerified: false, isSuperhost: false },
    { name: 'Kaduna Independence Villa', address: 'Independence Way, Kaduna', lat: 10.5122, lng: 7.4331, image: 'https://images.unsplash.com/photo-1618221118493-9cfa1a1c00da?auto=format&fit=crop&q=80', isVerified: true, isSuperhost: true },
    { name: 'Asa Pyramid Hotel', address: 'Lafia Road, Kaduna', lat: 10.5218, lng: 7.4411, image: 'https://images.unsplash.com/photo-1590483736622-398bb2c45980?auto=format&fit=crop&q=80', isVerified: true, isSuperhost: false },
    { name: 'Narayi Boutique Hotel', address: 'Narayi High Cost, Kaduna', lat: 10.4633, lng: 7.4519, image: 'https://images.unsplash.com/photo-1551882547-ff40c0d5b5df?auto=format&fit=crop&q=80', isVerified: false, isSuperhost: false },
  ];

  const amenitiesList = [Amenity.WIFI, Amenity.WATER, Amenity.BACKUP_POWER, Amenity.AIR_CONDITIONING, Amenity.PARKING];
  const allHotels = [];
  const allRoomTypes = [];

  for (const h of kadunaHotelsData) {
    const hotel = await prisma.hotel.create({
      data: {
        managerId: manager.id,
        name: h.name,
        description: `Experience luxury and comfort at ${h.name}, ideally located in the heart of Kaduna. Perfect for business travelers and vacationers seeking premium hospitality.`,
        address: h.address,
        latitude: h.lat,
        longitude: h.lng,
        coverImage: h.image,
        status: HotelStatus.APPROVED,
        isVerified: h.isVerified,
        isSuperhost: h.isSuperhost,
      }
    });
    allHotels.push(hotel);

    // Add amenities
    for (const am of amenitiesList) {
      await prisma.hotelAmenity.create({
        data: { hotelId: hotel.id, amenity: am }
      });
    }

    // Add 2 Room Types per hotel with realistic rates
    const standardRoom = await prisma.roomType.create({
      data: {
        hotelId: hotel.id,
        name: 'Standard Room',
        description: 'Cozy and well-equipped standard room for short stays.',
        pricePerNight: Math.floor(Math.random() * 20000) + 25000, // 25k - 45k
        capacity: 2,
        quantity: 10,
        status: RoomStatus.ACTIVE
      }
    });

    const deluxeRoom = await prisma.roomType.create({
      data: {
        hotelId: hotel.id,
        name: 'Deluxe Suite',
        description: 'Spacious suite with a seating area and premium finish.',
        pricePerNight: Math.floor(Math.random() * 30000) + 55000, // 55k - 85k
        capacity: 3,
        quantity: 5,
        status: RoomStatus.ACTIVE
      }
    });

    allRoomTypes.push(standardRoom, deluxeRoom);

    // Create Room Images
    await prisma.roomImage.create({ data: { roomTypeId: standardRoom.id, url: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&q=80', sortOrder: 1 } });
    await prisma.roomImage.create({ data: { roomTypeId: deluxeRoom.id, url: 'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?auto=format&fit=crop&q=80', sortOrder: 1 } });
  }

  // 5. SEED WISHLIST
  await prisma.wishlist.create({ data: { userId: booker.id, hotelId: allHotels[0].id } });
  await prisma.wishlist.create({ data: { userId: booker.id, hotelId: allHotels[1].id } });

  // 6. SEED BOOKINGS & PAYMENTS (6 months of data: -3 months to +3 months)
  console.log('Seeding 6 months of booking data...');
  const commissionRate = 0.1000;

  // Date helpers
  const today = new Date();

  for (let i = 0; i < 40; i++) {
    // Pick random room type
    const room = allRoomTypes[Math.floor(Math.random() * allRoomTypes.length)];
    const hotel = allHotels.find(h => h.id === room.hotelId)!;

    // Generate dates: between -90 days and +90 days
    const offsetDays = Math.floor(Math.random() * 180) - 90;
    const checkIn = new Date(today);
    checkIn.setDate(today.getDate() + offsetDays);

    const duration = Math.floor(Math.random() * 5) + 1; // 1 to 5 nights
    const checkOut = new Date(checkIn);
    checkOut.setDate(checkIn.getDate() + duration);

    // Amounts
    const amount = room.pricePerNight * duration;
    const commissionAmount = Math.round(amount * commissionRate);
    const hotelPayout = amount - commissionAmount;

    // Status logic based on date
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
      // Future
      status = Math.random() > 0.3 ? BookingStatus.CONFIRMED : BookingStatus.PENDING;
      paymentStatus = status === BookingStatus.CONFIRMED ? PaymentStatus.SUCCESS : PaymentStatus.INITIATED;
    }

    const booking = await prisma.booking.create({
      data: {
        userId: booker.id,
        hotelId: hotel.id,
        roomTypeId: room.id,
        checkInDate: checkIn,
        checkOutDate: checkOut,
        numberOfGuests: Math.floor(Math.random() * room.capacity) + 1,
        numberOfNights: duration,
        totalAmount: amount,
        commissionRate: commissionRate,
        commissionAmount: commissionAmount,
        hotelPayout: hotelPayout,
        status: status,
        confirmedAt: status === BookingStatus.CONFIRMED || status === BookingStatus.COMPLETED ? new Date(checkIn.getTime() - 86400000) : null,
        createdAt: new Date(checkIn.getTime() - 86400000 * 2), // Booked 2 days before checkin
      }
    });

    // Create payment
    if (paymentStatus === PaymentStatus.SUCCESS) {
      await prisma.payment.create({
        data: {
          bookingId: booking.id,
          userId: booker.id,
          amount: amount,
          gateway: PaymentGateway.PAYSTACK,
          gatewayReference: `REF_${Math.random().toString(36).substring(2, 10).toUpperCase()}`,
          status: paymentStatus,
          createdAt: booking.createdAt,
        }
      });
    }

    // Create payout
    if (payoutStatus === PaymentStatus.SUCCESS || payoutStatus === PayoutStatus.PROCESSING) {
      await prisma.payout.create({
        data: {
          hotelId: hotel.id,
          bookingId: booking.id,
          amount: hotelPayout,
          status: payoutStatus,
          reference: payoutStatus === PayoutStatus.SUCCESS ? `PO_${Math.random().toString(36).substring(2, 10).toUpperCase()}` : null,
          processedAt: payoutStatus === PayoutStatus.SUCCESS ? new Date(checkOut.getTime() + 86400000) : null, // Processed 1 day after checkout
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
