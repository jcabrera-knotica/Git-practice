# Booking & BL API

This is a simple Node.js + Express backend for the Booking & BL workflow.

## Features
- email intake endpoint for customer booking requests
- manual booking creation endpoint
- automatic booking number generation
- acknowledgment email for all new bookings
- booking confirmation email when the booking is confirmed
- local JSON storage for bookings and email activity

## Start locally
```bash
npm install
npm start
```

## API endpoints
- GET /api/bookings
- GET /api/bookings/:id
- POST /api/bookings
- POST /api/bookings/email-intake
- PATCH /api/bookings/:id/confirm

## Default base URL
```text
http://localhost:3000
```
