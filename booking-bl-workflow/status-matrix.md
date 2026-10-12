# Booking & BL Status Matrix

## Purpose
This document defines the status lifecycle for a shipment from booking creation to final delivery.

## Status List

| Status | Meaning | Typical Trigger | Next Possible Status |
|---|---|---|---|
| Email Received | Customer email received in intake inbox | Customer email with attachments arrives | Pending Manual Review |
| Pending Manual Review | Booking request is created and requires review | Missing or unclear details | Confirmed / Rejected |
| Draft | Booking is being prepared | Request started | Submitted |
| Submitted | Booking request has been sent | Booking created | Validated |
| Validated | Data has been checked | Ops review completed | Confirmed / Rejected |
| Rejected | Booking is not accepted | Missing or invalid information | Draft |
| Confirmed | Carrier has accepted booking | Space secured | Ready for Loading |
| Ready for Loading | Cargo is ready at origin | Gate-in and documentation complete | Loaded |
| Loaded | Cargo has been loaded onto vessel | Loading confirmed | BL Issued |
| BL Issued | Bill of Lading has been created | Carrier approval complete | Released / Amendment Required |
| Amendment Required | BL contains mismatch or correction | Data discrepancy discovered | BL Issued |
| Released | Cargo is approved for handover | Documentation complete | Delivered |
| Delivered | Shipment completed at destination | Consignee receipt | Closed |
| Cancelled | Shipment stopped before completion | Booking cancellation | End |
| On Hold | Shipment paused for review | Missing doc or operational issue | Confirmed / Rejected |
| Email Intake Failed | System was unable to process email or attachments | Attachment unreadable or mailbox issue | Manual Review |

## Email Actions by Status
- When a booking is created, the system sends an acknowledgment email containing the generated booking number.
- When the booking is confirmed, the system sends the booking confirmation email.
- If intake requires follow-up, the system sends a request for missing information instead of a confirmation email.

## Transition Rules
- Draft cannot move directly to Loaded.
- Confirmed bookings require valid cargo and route details.
- BL issuance must reflect approved shipment information.
- Amendment is required if BL details do not match booking or cargo data.
- Release requires approved documentation and authorization.

## Operational Notes
- Status history should be retained for audit purposes.
- Each change should record date, user, and reason.
- Only authorized personnel should move the shipment to a later status.
