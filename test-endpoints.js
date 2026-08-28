const BASE_URL = 'http://localhost:3000';

async function testEndpoint(name, method, path, body = null, token = null) {
  console.log(`\n--- Testing ${name} [${method} ${path}] ---`);
  try {
    const headers = {};
    if (body) headers['Content-Type'] = 'application/json';
    if (token) headers['Authorization'] = `Bearer ${token}`;

    const response = await fetch(`${BASE_URL}${path}`, {
      method,
      headers,
      body: body ? JSON.stringify(body) : undefined,
    });

    const contentType = response.headers.get('content-type');
    let data;
    if (contentType && contentType.includes('application/json')) {
      data = await response.json();
    } else {
      data = await response.text();
    }
    
    console.log(`Status: ${response.status}`);
    console.log(`Response: ${JSON.stringify(data).substring(0, 200)}...`);
    
    return { status: response.status, data, response };
  } catch (error) {
    console.error(`Error testing ${name}:`, error.message);
    return null;
  }
}

async function runTests() {
  console.log('Waiting for Next.js app to be ready...');
  // Wait a moment in case it's still booting
  await new Promise(resolve => setTimeout(resolve, 3000));

  let token = '';
  const testEmail = `test${Date.now()}@example.com`;
  
  // 1. Auth: Register
  await testEndpoint('Register', 'POST', '/api/auth/register', {
    email: testEmail,
    phone: `+234123456${Date.now().toString().slice(-4)}`,
    password: 'password123',
    fullName: 'Test User',
    role: 'HOTEL_MANAGER'
  });

  // 2. Auth: Login
  const loginRes = await testEndpoint('Login', 'POST', '/api/auth/login', {
    identifier: testEmail,
    password: 'password123'
  });
  
  let accessToken = '';
  if (loginRes && loginRes.data && loginRes.data.data) {
     accessToken = loginRes.data.data.accessToken;
     console.log('Extracted access token:', accessToken ? 'Success' : 'Failed');
  }

  // Custom fetch wrapper for auth
  const fetchWithAuth = async (path, method = 'GET', body = null) => {
    const headers = {};
    if (accessToken) headers['Authorization'] = `Bearer ${accessToken}`;
    if (body) headers['Content-Type'] = 'application/json';
    
    return fetch(`${BASE_URL}${path}`, { method, headers, body: body ? JSON.stringify(body) : undefined })
      .then(async r => {
         const t = await r.text();
         try { return { status: r.status, data: JSON.parse(t) }; } catch(e) { return { status: r.status, data: t }; }
      }).catch(e => { console.error('Fetch error:', e); return null; });
  };

  console.log('\n--- Using fetch wrapper for authenticated requests ---');
  
  // 3. Auth: Refresh
  const refreshRes = await fetchWithAuth('/api/auth/refresh', 'POST');
  console.log('Refresh status:', refreshRes?.status);

  // 4. Hotels List
  const hotelsRes = await fetchWithAuth('/api/hotels', 'GET');
  console.log('GET Hotels status:', hotelsRes?.status);
  
  // 5. Create Hotel
  const createHotelRes = await fetchWithAuth('/api/hotels', 'POST', {
    name: 'Test Hotel',
    description: 'A nice test hotel',
    address: '123 Test St',
    latitude: 0,
    longitude: 0,
    coverImage: 'https://example.com/image.jpg'
  });
  console.log('POST Hotel status:', createHotelRes?.status);
  let hotelId = createHotelRes?.data?.data?.id || 'dummy_hotel_id';

  // 6. Get Hotel by ID
  const getHotelRes = await fetchWithAuth(`/api/hotels/${hotelId}`, 'GET');
  console.log('GET Hotel by ID status:', getHotelRes?.status);

  // 7. Create Room Type
  const createRoomRes = await fetchWithAuth(`/api/hotels/${hotelId}/rooms`, 'POST', {
    name: 'Deluxe Room',
    pricePerNight: 15000,
    capacity: 2,
    quantity: 5,
    images: ['https://example.com/room.jpg']
  });
  console.log('POST Room Type status:', createRoomRes?.status);
  let roomId = createRoomRes?.data?.data?.id || 'dummy_room_id';

  // 8. Get Room by ID
  const getRoomRes = await fetchWithAuth(`/api/hotels/${hotelId}/rooms/${roomId}`, 'GET');
  console.log('GET Room by ID status:', getRoomRes?.status);

  // Register and Login Booker
  const bookerEmail = `booker${Date.now()}@example.com`;
  await testEndpoint('Register Booker', 'POST', '/api/auth/register', {
    email: bookerEmail,
    phone: `+234123456${Date.now().toString().slice(-4)}`,
    password: 'password123',
    fullName: 'Test Booker',
    role: 'BOOKER'
  });
  const bookerLoginRes = await testEndpoint('Login Booker', 'POST', '/api/auth/login', {
    identifier: bookerEmail,
    password: 'password123'
  });
  let bookerToken = bookerLoginRes?.data?.data?.accessToken;
  const fetchWithBookerAuth = async (path, method = 'GET', body = null) => {
    const headers = {};
    if (bookerToken) headers['Authorization'] = `Bearer ${bookerToken}`;
    if (body) headers['Content-Type'] = 'application/json';
    return fetch(`${BASE_URL}${path}`, { method, headers, body: body ? JSON.stringify(body) : undefined })
      .then(async r => {
         const t = await r.text();
         try { return { status: r.status, data: JSON.parse(t) }; } catch(e) { return { status: r.status, data: t }; }
      }).catch(e => { console.error('Fetch error:', e); return null; });
  };

  // 9. Create Booking
  const createBookingRes = await fetchWithBookerAuth(`/api/bookings`, 'POST', {
    hotelId,
    roomTypeId: roomId,
    checkInDate: new Date().toISOString().split('T')[0],
    checkOutDate: new Date(Date.now() + 86400000).toISOString().split('T')[0],
    numberOfGuests: 1
  });
  console.log('POST Booking status:', createBookingRes?.status);
  let bookingId = createBookingRes?.data?.data?.id || 'dummy_booking_id';

  // 10. Get User Bookings
  const meBookingsRes = await fetchWithBookerAuth('/api/bookings/me', 'GET');
  console.log('GET /api/bookings/me status:', meBookingsRes?.status);

  // 12. Get Booking by ID
  const getBookingRes = await fetchWithBookerAuth(`/api/bookings/${bookingId}`, 'GET');
  console.log('GET Booking by ID status:', getBookingRes?.status);

  // 13. Confirm Booking
  const confirmBookingRes = await fetchWithAuth(`/api/bookings/${bookingId}/confirm`, 'POST', {
     qrData: 'dummy', qrSignature: 'dummy'
  });
  console.log('POST Confirm Booking status:', confirmBookingRes?.status);

  // 14. Cancel Booking
  const cancelBookingRes = await fetchWithBookerAuth(`/api/bookings/${bookingId}/cancel`, 'POST', {
     reason: 'Test cancellation'
  });
  console.log('POST Cancel Booking status:', cancelBookingRes?.status);

  // 15. Payments Initiate
  const paymentInitRes = await fetchWithBookerAuth('/api/payments/initiate', 'POST', {
    bookingId
  });
  console.log('POST Payment Initiate status:', paymentInitRes?.status);

  // 16. Payments Webhook
  const webhookRes = await fetch(`${BASE_URL}/api/payments/webhook`, {
     method: 'POST',
     headers: { 'Content-Type': 'application/json' },
     body: JSON.stringify({ event: 'charge.success', data: { reference: 'dummy' } })
  });
  console.log('POST Webhook status:', webhookRes.status);

  // 17. Upload Endpoint
  const formData = new FormData();
  formData.append('file', new Blob(['test image content'], { type: 'image/jpeg' }), 'test.jpg');
  
  const uploadRes = await fetch(`${BASE_URL}/api/upload`, {
    method: 'POST',
    headers: { 'Authorization': `Bearer ${accessToken}` },
    body: formData
  });
  console.log('POST Upload status:', uploadRes?.status);

  // 18. Auth: Logout
  const logoutRes = await fetchWithAuth('/api/auth/logout', 'POST');
  console.log('Logout status:', logoutRes?.status);

  console.log('\n--- Testing Complete ---');
}

runTests();
