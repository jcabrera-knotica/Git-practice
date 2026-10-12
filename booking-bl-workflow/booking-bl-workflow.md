# Booking & Bill of Lading (BL) Workflow

## 1. Overview
This workflow defines how a shipment moves from initial booking request through cargo release and closure. It also captures the key business events related to the Bill of Lading (BL), which is the legal document confirming shipment details and cargo ownership terms.

## 2. Business Objective
The workflow ensures that:
- the shipment is properly booked with the carrier
- cargo details are validated
- loading and transport are tracked accurately
- BL is issued correctly and updated when needed
- delivery is completed without documentation errors

## 3. Roles and Responsibilities

### Shipper
- submits booking request
- provides cargo details and required shipping information
- confirms goods and commercial terms

### Freight Forwarder / Operations Team
- validates shipment information
- checks route, schedule, and capacity
- coordinates with carrier
- manages booking updates and BL documentation

### Carrier / Shipping Line
- confirms space availability
- approves booking and schedules movement
- loads cargo onto vessel
- issues or verifies BL details

### Customs Broker
- supports customs compliance and document checks when required
- handles regulatory documentation as needed

### Consignee
- receives shipment details
- requests BL release or cargo collection
- confirms delivery completion

## 4. Workflow Stages

### Stage 0: Email Intake and Booking Request Creation
1. Customer sends booking-related email containing documents, PDFs, attachments, or reference files.
2. The system receives the email in the designated inbox or secured intake channel.
3. Email content and attachments are extracted and classified.
4. File types such as PDF, DOC, DOCX, XLSX, JPG, or other customer documents are identified.
5. The system parses relevant data such as shipper, consignee, cargo description, route, container requirements, and dates.
6. If the data is recognized with sufficient confidence, a new booking request is created and placed in a pending manual review state.
7. The booking is assigned a preliminary request ID and a booking number.
8. If the email contains incomplete, unreadable, or ambiguous data, the system creates a booking draft with an exception flag for manual review.
9. As soon as the booking request is created, the system sends an acknowledgment email to the customer confirming receipt and including the booking number.
10. The acknowledgment email includes the message: the booking has been processed, the booking number is assigned, and the customer can use it for follow-up.

### Stage 1: Booking Request
1. Customer or shipper submits a booking request.
2. Required information is collected:
   - shipper name
   - consignee details
   - cargo description
   - weight / volume
   - origin and destination
   - container type
   - ETD / ETA
   - special handling instructions
3. Request is reviewed by operations.
4. If the booking was created from email intake or manual entry, it is tracked under the standard lifecycle states and begins validation.
5. For manual booking creation in the system, the system generates a booking number and sends an email to the requestor with the booking number and status.

### Stage 2: Validation
1. Operations checks if the request is complete.
2. Validate cargo type and compliance requirements.
3. Validate route, vessel schedule, and container suitability.
4. Identify any missing documents or inconsistent data.
5. If invalid, request clarification or reject the booking.
6. For email-derived booking requests, the system stores the email metadata, attachment list, and source information as part of the booking record.

### Stage 3: Booking Confirmation
1. Carrier confirms space availability.
2. Booking is accepted and assigned a booking number.
3. Booking status is updated to Confirmed.
4. Once the booking status is set to Confirmed, the system automatically sends a Booking Confirmation email to the customer.
5. The confirmation email includes the booking number, carrier details, route, cargo summary, and a confirmation message.
6. Booking confirmation is shared with the shipper and internal teams.

### Stage 4: Cargo Receipt / Gate-In
1. Cargo is physically received at origin.
2. Documentation is checked against booking details.
3. Container is gated in and ready for loading.
4. Status changes to In Transit / Ready for Loading.

### Stage 5: Vessel Loading
1. Cargo is loaded onto the assigned vessel.
2. Loading confirmation is recorded.
3. Quantity, seal numbers, and container details are verified.
4. Shipment is moved to Loaded status.

### Stage 6: BL Issuance
1. Once the booking has been confirmed, the carrier or operator may prepare the Bill of Lading.
2. The Booking Number and BL Number are always kept separate; the booking number identifies the shipment booking, while the BL number identifies the legal document issued for the cargo.
3. BL data is reviewed against booking and cargo records.
4. BL is issued with the approved shipment details in one of the approved BL formats: Original, Surrendered, or Seawaybill.
5. Status changes to BL Issued.

### Stage 7: BL Amendment / Discrepancy Handling
1. If mismatches are found, an amendment request is raised.
2. Teams review the discrepancy.
3. Corrective actions are completed.
4. Revised BL is re-issued or approved.

### Stage 8: Release and Delivery
1. Consignee or authorized party requests cargo release.
2. Release conditions are checked.
3. Cargo is released and delivered to the consignee.
4. Shipment is marked as Delivered or Closed.

## 5. Status Flow
The standard lifecycle used in the UI and workflow is:

Pending Manual Review -> Confirmed -> BL Issued -> Released

Operational sub-states may still be used internally, including: Draft, Submitted, Validated, Ready for Loading, Loaded, and Delivered, but the primary status flow shown in the user-facing workflow and UI remains the same.

Possible exception states:
- Rejected
- On Hold
- Amendment Required
- Cancelled
- Email Intake Failed
- Pending Manual Review

## 6. Key Business Rules
- A booking cannot be confirmed without valid cargo and route details.
- Any customer email containing booking-related documents can trigger booking intake.
- If an email contains multiple files, the system should attach all files to the same booking request where possible.
- A booking created from email intake must be traceable back to the original email and attachments.
- A booking number must be generated automatically when the booking is created, whether by email intake or by manual entry.
- Manual booking intake is tracked as Pending Manual Review until operations validates and confirms the booking.
- A BL number is a separate document identifier and is created only when the BL is issued; it is not the same as the booking number.
- Once the booking is created, an acknowledgment email must be sent to the sender containing the generated booking number.
- Once the booking status is changed to Confirmed, a Booking Confirmation email must be sent automatically.
- BL cannot be issued before booking confirmation and final shipment/documentation validation.
- A BL may be issued as Original, Surrendered, or Seawaybill, depending on the commercial and operational requirement.
- Any mismatch between booking and BL must be reviewed before release.
- Cargo release requires approved documentation and authorization.
- Status changes must be auditable.

## 7. Example Scenarios

### Scenario A: Standard booking and BL flow
- Booking request received
- Validated successfully
- Carrier confirms space
- Cargo loaded
- BL issued
- Release and delivery completed

### Scenario B: Data mismatch
- Booking submitted with incorrect consignee or cargo description
- Validation finds mismatch
- Booking is put on hold
- Corrected details are submitted
- Booking is confirmed after approval

### Scenario C: BL amendment
- BL issued with wrong container number
- Amendment request is raised
- Corrected BL is approved
- Cargo release proceeds only after approval

## 8. Output of This Workflow
The workflow should produce a clear record of:
- booking number
- carrier confirmation
- loading status
- BL number
- release approval
- delivery completion

## 9. Summary
This workflow is designed to ensure operational consistency, document control, and clean cargo handoff from origin to destination.
