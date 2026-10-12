# Simple App Flow for Booking & BL System

## 1. User-facing flow

### Customer email intake
1. Customer sends an email with booking documents or PDFs.
2. Email is routed to the booking intake inbox.
3. The system stores the inbound email and attachments.
4. The document parser extracts data such as:
   - shipper
   - consignee
   - cargo description
   - origin/destination
   - ETD/ETA
   - container requirements
5. The system creates a booking request automatically.
6. The booking service generates a booking number automatically.
7. The system sends an acknowledgement email to the sender containing the booking number and confirmation that the booking has been received and processed.

### Booking review
1. Operations team opens the booking record.
2. The team compares extracted data with the source files.
3. Missing or incorrect information is flagged.
4. Booking is approved, rejected, or sent to Pending Manual Review.
5. For a manually created booking, the system also generates a booking number and sends a booking email immediately after creation.

### Carrier confirmation
1. Operations checks vessel space and capacity.
2. Carrier confirms booking.
3. Booking status is updated to Confirmed.
4. The system automatically sends the Booking Confirmation email with the booking number, route, and carrier confirmation details.

### Cargo and BL flow
1. Cargo is received and recorded in the system.
2. Loading details are captured.
3. BL is created and validated.
4. Any mismatch triggers an amendment workflow.
5. Cargo is released on approval.

### Delivery close-out
1. Consignee receives cargo.
2. Delivery is logged.
3. Shipment is marked as Delivered and closed.

---

## 2. System-level flow

Email Intake Service
  -> Document Parser
  -> Booking Service
  -> Validation Service
  -> Carrier Integration
  -> Cargo Tracking Service
  -> BL Service
  -> Release & Delivery Service
  -> Reporting & Audit Log

---

## 3. Core business actions
- Create booking from email
- Attach original files to booking
- Parse and validate shipment data
- Update status history
- Confirm carrier booking
- Track cargo movement
- Issue and amend BL
- Release cargo
- Close shipment

---

## 4. Example end-to-end sequence
1. Customer email arrives
2. Booking request is created and placed in Pending Manual Review
3. Operations validates the details
4. Carrier confirms capacity
5. Cargo is loaded
6. BL is created
7. BL is checked for accuracy
8. Shipment is released and delivered
9. Final status is recorded and archived

## 5. Design principle
The system should treat email intake as a business trigger, not just a document upload. The booking should be traceable to the original customer email and attachment set at every stage.
