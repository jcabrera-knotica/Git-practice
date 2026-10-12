const fs = require('fs');
const path = require('path');

const bookingsPath = path.join(__dirname, '..', 'data', 'bookings.json');

function readBookings() {
  try {
    const raw = fs.readFileSync(bookingsPath, 'utf8');
    return JSON.parse(raw);
  } catch (error) {
    return [];
  }
}

function writeBookings(bookings) {
  fs.writeFileSync(bookingsPath, JSON.stringify(bookings, null, 2));
}

function getNextId(bookings) {
  return bookings.length ? Math.max(...bookings.map((b) => b.id)) + 1 : 1;
}

module.exports = {
  readBookings,
  writeBookings,
  getNextId
};
