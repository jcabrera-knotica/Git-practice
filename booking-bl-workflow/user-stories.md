# Booking & BL User Stories

## 1. Booking Request
- As a shipper, I want to submit a booking request so that my cargo can be scheduled for shipment.
- As a customer, I want to email booking files such as PDFs or documents so that my booking can be quickly received.
- As an operations agent, I want to review booking details so that I can validate shipment information.

## 2. Email Intake and Auto-Creation
- As a system, I want to receive customer emails with booking attachments so that a booking request can be created automatically.
- As an operations team member, I want the system to attach the original email and files to the booking record so that I can trace the source.
- As a user, I want the system to create a pending review booking when the email content is incomplete or unclear.
- As a system, I want to automatically generate a booking number and send an acknowledgment email immediately after the booking request is created.

## 3. Booking Validation
- As an operations team member, I want to check cargo, route, and container information so that the request can be approved or rejected.
- As a user, I want to receive a rejection reason so that I can correct the booking details.

## 4. Booking Confirmation Email
- As a system, I want to send a booking confirmation email once the booking status is set to Confirmed so that the customer has formal confirmation.
- As a customer, I want the booking confirmation email to include the booking number and summary of the booking.

## 5. Carrier Confirmation
- As a carrier, I want to confirm space availability so that the booking can be accepted.
- As a forwarder, I want to receive a booking confirmation so that I can share it with the shipper.

## 4. Cargo Movement
- As an operations team member, I want to record gate-in and loading events so that the shipment status is accurate.
- As a customs team member, I want to verify documents before cargo dispatch so that compliance is maintained.

## 5. BL Issuance
- As a carrier, I want to generate a BL so that the shipment has legal documentation for transport.
- As a forwarder, I want to ensure the BL matches the booking so that documentation is accurate.

## 6. BL Amendment
- As an operations agent, I want to mark a BL for amendment so that mismatches can be corrected before release.
- As a user, I want to know the amendment reason so that corrective action can be taken.

## 7. Cargo Release
- As a consignee, I want to request release of cargo so that I can receive my shipment.
- As an operations team member, I want to confirm the release conditions so that only eligible cargo is dispatched.

## 8. Closure
- As a logistics team, I want to mark the shipment as delivered so that the workflow is complete.
- As a manager, I want a complete status history so that I can audit the shipment lifecycle.
