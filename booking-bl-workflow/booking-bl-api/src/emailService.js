const fs = require('fs');
const path = require('path');

const emailLogPath = path.join(__dirname, '..', 'data', 'emails.json');

function readEmailLog() {
  try {
    const raw = fs.readFileSync(emailLogPath, 'utf8');
    return JSON.parse(raw);
  } catch (error) {
    return [];
  }
}

function writeEmailLog(entries) {
  fs.writeFileSync(emailLogPath, JSON.stringify(entries, null, 2));
}

function generateBookingNumber() {
  const now = new Date();
  const dateStamp = now.toISOString().slice(0, 10).replace(/-/g, '');
  const sequence = Math.floor(Math.random() * 9000) + 1000;
  return `BK-${dateStamp}-${sequence}`;
}

function createEmailRecord({ to, subject, body, type }) {
  return {
    id: Date.now() + Math.floor(Math.random() * 1000),
    to,
    subject,
    body,
    type,
    sentAt: new Date().toISOString(),
    status: 'sent'
  };
}

function sendEmail({ to, subject, body, type }) {
  const record = createEmailRecord({ to, subject, body, type });
  const logs = readEmailLog();
  logs.push(record);
  writeEmailLog(logs);

  console.log(`EMAIL SENT [${type}] to ${to}`);
  console.log(`Subject: ${subject}`);
  console.log(body);

  return record;
}

function sendBookingAcknowledgement({ to, bookingNumber }) {
  return sendEmail({
    to,
    type: 'booking_acknowledgement',
    subject: `Booking received - ${bookingNumber}`,
    body: `Dear Customer,\n\nYour booking request has been received and processed.\nYour booking number is: ${bookingNumber}\n\nWe will continue with validation and confirmation.`
  });
}

function sendBookingConfirmation({ to, bookingNumber, route, carrier }) {
  return sendEmail({
    to,
    type: 'booking_confirmation',
    subject: `Booking Confirmation - ${bookingNumber}`,
    body: `Dear Customer,\n\nYour booking has been confirmed.\n\nBooking Number: ${bookingNumber}\nRoute: ${route}\nCarrier: ${carrier}\nStatus: Confirmed\n\nThank you.`
  });
}

module.exports = {
  sendEmail,
  sendBookingAcknowledgement,
  sendBookingConfirmation,
  generateBookingNumber
};
