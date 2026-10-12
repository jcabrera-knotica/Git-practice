# Booking & BL Data Model

## Core Entities

### Booking
- booking_id
- booking_number
- source_channel
- source_email_id
- source_subject
- auto_created_flag
- intake_status
- shipper_id
- consignee_id
- origin_port
- destination_port
- cargo_description
- cargo_weight
- cargo_volume
- container_type
- vessel_name
- voyage_number
- etd
- eta
- booking_status
- created_at
- updated_at

### Booking Attachment
- attachment_id
- booking_id
- file_name
- file_type
- file_size
- s3_url_or_storage_path
- uploaded_at
- extracted_text
- classification

### BL (Bill of Lading)
- bl_id
- booking_id
- booking_number
- bl_number
- bl_type
- carrier_id
- issued_date
- bl_status
- consignee_name
- cargo_description
- container_number
- seal_number
- gross_weight
- place_of_issue
- terms
- amended_flag
- amendment_reason

The booking number and BL number are separate identifiers. The booking number tracks the shipment booking record, while the BL number tracks the issued transport document. BL type may be Original, Surrendered, or Seawaybill.

### Party
- party_id
- party_name
- party_type
- contact_person
- email
- phone
- address

### Shipment Event
- event_id
- booking_id
- event_type
- event_date
- event_notes
- created_by

### Status History
- status_history_id
- booking_id
- bl_id
- previous_status
- new_status
- changed_by
- changed_at
- notes

## Notes
This model supports tracking both booking progression and BL document lifecycle. It also gives a base for future database tables or API design.
