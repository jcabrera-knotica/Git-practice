# Mock UI Screen Flow

## 1. Dashboard screen
Purpose: Give operations a central overview of shipment status.

Sections:
- Inbox summary
- Bookings in Pending Manual Review
- Confirmed bookings
- Active BLs
- Released shipments

Fields shown on each card:
- booking number
- shipper
- consignee
- route
- cargo description
- status
- last updated timestamp

## 2. Email intake screen
Purpose: Show incoming customer emails and attachments.

Controls:
- email subject
- sender email
- attachment list
- parse status
- upload / assign to booking
- manual review button

Actions:
- Accept and auto-create booking
- Send to manual review
- Reject invalid email

## 3. Booking details screen
Purpose: View and edit shipment booking data.

Sections:
- booking header
- cargo details
- route and dates
- parties involved
- attached documents
- workflow actions

Actions:
- validate booking
- confirm carrier booking
- mark as rejected
- add documentation note

## 4. BL management screen
Purpose: Manage the legal shipment document.

Sections:
- BL number
- issuing carrier
- cargo data
- container number
- seal number
- amendment history

Actions:
- issue BL
- amend BL
- approve amendment
- release cargo

## 5. Release and delivery screen
Purpose: Confirm final handoff.

Sections:
- release checklist
- consignee confirmation
- delivery date
- final status

Actions:
- release cargo
- mark delivered
- archive shipment

## Screen flow summary
Dashboard -> Email Inbox -> Booking Details -> Carrier Confirmation -> BL Screen -> Release & Delivery

This provides a simple mock UI that mirrors the workflow logic and can be implemented in a web prototype.
