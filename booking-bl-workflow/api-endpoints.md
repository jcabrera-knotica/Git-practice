# Booking & BL API Endpoint Design

## 1. Booking Intake API

### POST /api/bookings/email-intake
Purpose: Receive an email-triggered booking request.

Request body:
```json
{
  "senderEmail": "customer@example.com",
  "subject": "Booking request for Shanghai to Singapore",
  "messageBody": "Please process this booking.",
  "attachments": [
    {
      "fileName": "booking.pdf",
      "contentType": "application/pdf",
      "base64": "..."
    }
  ]
}
```

Behavior:
- validate incoming email
- parse attachments and extract shipment details
- create booking record
- generate booking number automatically
- attach original email metadata and documents
- send acknowledgement email to customer
- return booking id and booking number

Response:
```json
{
  "bookingId": 123,
  "bookingNumber": "BK-20261006-001",
  "status": "Pending Manual Review",
  "emailSent": true
}
```

---

## 2. Manual Booking API

### POST /api/bookings
Purpose: Create a booking manually from the operations UI.

Request body:
```json
{
  "shipper": "Acme Exports",
  "consignee": "Northline Imports",
  "originPort": "Shanghai",
  "destinationPort": "Singapore",
  "cargoDescription": "Electronics",
  "containerType": "40HC",
  "etd": "2026-10-15",
  "eta": "2026-10-22",
  "sourceChannel": "manual",
  "requestorEmail": "ops@company.com"
}
```

Behavior:
- generate booking number automatically
- create booking record
- send booking email to requestor
- set initial status to Pending Manual Review

Response:
```json
{
  "bookingId": 123,
  "bookingNumber": "BK-20261006-001",
  "status": "Pending Manual Review",
  "emailSent": true
}
```

---

## 3. Booking Confirmation API

### PATCH /api/bookings/:id/confirm
Purpose: Confirm a booking once carrier and ops approval are complete.

Request body:
```json
{
  "confirmedBy": "Ops Team",
  "carrier": "OceanAlliance",
  "voyageNumber": "OA-123"
}
```

Behavior:
- update booking status to Confirmed
- send Booking Confirmation email to customer
- persist confirmation metadata

Response:
```json
{
  "bookingId": 123,
  "bookingNumber": "BK-20261006-001",
  "status": "Confirmed",
  "confirmationEmailSent": true
}
```

---

## 4. Get Booking API

### GET /api/bookings/:id
Purpose: Fetch booking details and attachments.

Response:
```json
{
  "bookingId": 123,
  "bookingNumber": "BK-20261006-001",
  "status": "Confirmed",
  "shipper": "Acme Exports",
  "consignee": "Northline Imports",
  "originPort": "Shanghai",
  "destinationPort": "Singapore",
  "attachments": [
    {
      "fileName": "booking.pdf",
      "storagePath": "/uploads/booking.pdf"
    }
  ]
}
```

---

## 5. Email Service Contract

### Acknowledgement email trigger
Triggered when:
- booking created from email intake
- booking created manually

Subject:
```text
Booking received - BK-20261006-001
```

Body:
```text
Dear Customer,

Your booking request has been received and processed.
Your booking number is: BK-20261006-001

Thank you.
```

### Booking confirmation email trigger
Triggered when:
- booking status changes to Confirmed

Subject:
```text
Booking Confirmation - BK-20261006-001
```

Body:
```text
Dear Customer,

Your booking has been confirmed.
Booking Number: BK-20261006-001
Route: Shanghai to Singapore
Carrier: OceanAlliance
Status: Confirmed

Thank you.
```
