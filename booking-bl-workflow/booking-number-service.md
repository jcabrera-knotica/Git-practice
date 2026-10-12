# Booking Number Generation Service

## Purpose
Generate a unique booking number for every booking, whether it is created manually or triggered from an email.

## Rules
- Each booking must have a unique booking number.
- Booking numbers should be generated at the time the booking is created.
- Number generation must happen before acknowledgment email is sent.
- The booking number must be included in all customer-facing emails.

## Suggested format
```text
BK-YYYYMMDD-####
```
Example:
```text
BK-20261006-0001
```

## Logic
```pseudo
function generateBookingNumber():
    dateStamp = currentDate formatted as YYYYMMDD
    sequence = nextSequenceNumberFromDatabase()
    return "BK-" + dateStamp + "-" + padLeft(sequence, 4, "0")
```

## Sample workflow
1. Customer sends booking email or operations creates booking manually.
2. System calls generateBookingNumber().
3. Booking record is saved with the generated booking number.
4. Acknowledgement email is sent containing the booking number.
5. When status is Confirmed, a confirmation email is sent using the same booking number.

## Database requirement
Store the generated value in the bookings table as `booking_number`.

## Business benefit
This ensures traceability and reduces risk of duplicate or missing customer references.
