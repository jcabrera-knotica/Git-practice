# Email Service Design

## Purpose
Send the right email at the correct workflow stage.

## Triggered email events

### 1. Booking received acknowledgment
Triggered when:
- booking is created from customer email
- booking is created manually in the system

Required email content:
- customer name or sender email
- generated booking number
- statement that booking has been received and processed
- optional contact for follow-up

Example:
```text
Subject: Booking received - BK-20261006-0001

Dear Customer,

Your booking request has been received and processed.
Your booking number is: BK-20261006-0001

We will continue with validation and confirmation.
```

### 2. Booking confirmation email
Triggered when:
- booking status is set to Confirmed

Required email content:
- booking number
- route
- carrier name
- cargo summary
- confirmation statement

Example:
```text
Subject: Booking Confirmation - BK-20261006-0001

Dear Customer,

Your booking has been confirmed.

Booking Number: BK-20261006-0001
Route: Shanghai → Singapore
Carrier: OceanAlliance
Status: Confirmed

Thank you.
```

## Design notes
- Email sending should be asynchronous where possible.
- Email content should be loggable for audit purposes.
- The system should store email timestamp, recipient, subject, and status.
- If the email fails to send, the system should log the failure and retry or escalate to operations.
