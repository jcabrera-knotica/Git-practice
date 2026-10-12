const express = require('express');
const cors = require('cors');
const { readBookings, writeBookings, getNextId } = require('./src/store');
const {
  generateBookingNumber,
  sendBookingAcknowledgement,
  sendBookingConfirmation
} = require('./src/emailService');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

function buildBookingRecord(payload, options = {}) {
  const bookings = readBookings();
  const bookingNumber = options.bookingNumber || generateBookingNumber();

  const booking = {
    id: getNextId(bookings),
    bookingNumber,
    sourceChannel: payload.sourceChannel || 'email',
    sourceEmailId: payload.sourceEmailId || null,
    sourceSubject: payload.sourceSubject || null,
    pendingManualReview: Boolean(payload.pendingManualReview ?? true),
    intakeStatus: payload.intakeStatus || 'pending_manual_review',
    shipper: payload.shipper || '',
    consignee: payload.consignee || '',
    originPort: payload.originPort || '',
    destinationPort: payload.destinationPort || '',
    cargoDescription: payload.cargoDescription || '',
    cargoWeight: payload.cargoWeight || null,
    cargoVolume: payload.cargoVolume || null,
    containerType: payload.containerType || '',
    vesselName: payload.vesselName || '',
    voyageNumber: payload.voyageNumber || '',
    etd: payload.etd || null,
    eta: payload.eta || null,
    bookingStatus: payload.bookingStatus || 'Pending Manual Review',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    requestorEmail: payload.requestorEmail || payload.senderEmail || '',
    carrier: payload.carrier || '',
    notes: payload.notes || ''
  };

  return booking;
}

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', service: 'booking-bl-api' });
});

app.get('/api/bookings', (req, res) => {
  const bookings = readBookings();
  res.json(bookings);
});

app.get('/api/bookings/:id', (req, res) => {
  const bookings = readBookings();
  const booking = bookings.find((item) => item.id === Number(req.params.id));

  if (!booking) {
    return res.status(404).json({ error: 'Booking not found' });
  }

  return res.json(booking);
});

app.post('/api/bookings', (req, res) => {
  const payload = req.body || {};
  const bookings = readBookings();
  const bookingNumber = generateBookingNumber();
  const booking = buildBookingRecord({ ...payload, bookingStatus: 'Pending Manual Review' }, { bookingNumber });

  bookings.push(booking);
  writeBookings(bookings);

  const recipient = payload.requestorEmail || payload.senderEmail || 'customer@example.com';
  sendBookingAcknowledgement({ to: recipient, bookingNumber: booking.bookingNumber });

  return res.status(201).json({
    bookingId: booking.id,
    bookingNumber: booking.bookingNumber,
    status: booking.bookingStatus,
    emailSent: true
  });
});

app.post('/api/bookings/email-intake', (req, res) => {
  const payload = req.body || {};
  const bookings = readBookings();
  const bookingNumber = generateBookingNumber();

  const booking = buildBookingRecord({
    ...payload,
    sourceChannel: 'email',
    pendingManualReview: true,
    intakeStatus: 'pending_manual_review',
    bookingStatus: 'Pending Manual Review',
    senderEmail: payload.senderEmail || payload.requestorEmail || 'customer@example.com'
  }, { bookingNumber });

  bookings.push(booking);
  writeBookings(bookings);

  const recipient = payload.senderEmail || payload.requestorEmail || 'customer@example.com';
  sendBookingAcknowledgement({ to: recipient, bookingNumber: booking.bookingNumber });

  return res.status(201).json({
    bookingId: booking.id,
    bookingNumber: booking.bookingNumber,
    status: booking.bookingStatus,
    emailSent: true
  });
});

app.patch('/api/bookings/:id/confirm', (req, res) => {
  const bookings = readBookings();
  const bookingIndex = bookings.findIndex((item) => item.id === Number(req.params.id));

  if (bookingIndex === -1) {
    return res.status(404).json({ error: 'Booking not found' });
  }

  const booking = bookings[bookingIndex];
  const route = `${booking.originPort || 'N/A'} to ${booking.destinationPort || 'N/A'}`;
  const carrier = req.body.carrier || 'OceanAlliance';

  booking.bookingStatus = 'Confirmed';
  booking.updatedAt = new Date().toISOString();
  booking.carrier = carrier;
  booking.voyageNumber = req.body.voyageNumber || booking.voyageNumber || 'TBA';

  writeBookings(bookings);

  const recipient = booking.requestorEmail || booking.senderEmail || 'customer@example.com';
  sendBookingConfirmation({
    to: recipient,
    bookingNumber: booking.bookingNumber,
    route,
    carrier
  });

  return res.json({
    bookingId: booking.id,
    bookingNumber: booking.bookingNumber,
    status: booking.bookingStatus,
    confirmationEmailSent: true
  });
});

app.listen(PORT, () => {
  console.log(`Booking & BL API running on http://localhost:${PORT}`);
});
