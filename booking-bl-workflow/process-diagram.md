# Booking & BL Process Diagram

## Business process flow

```mermaid
flowchart TD
    A[Customer Email Received] --> B[Inbox Intake Service]
    B --> C{Booking files attached?}
    C -- Yes --> D[Extract email + attachments]
    C -- No --> Z[Manual Intake Required]
    D --> E[Parse document content]
    E --> F{Data sufficient?}
    F -- Yes --> G[Create Booking Request]
    F -- No --> H[Pending Manual Review]
    G --> G1[Generate Booking Number]
    G1 --> G2[Send Acknowledgement Email with Booking Number]
    G2 --> I[Booking Draft / Submitted]
    H --> J[Ops Review]
    I --> J
    J --> K{Valid?}
    K -- Yes --> L[Carrier Confirmation]
    K -- No --> M[Reject or Request Clarification]
    L --> N[Booking Confirmed]
    N --> N1[Send Booking Confirmation Email]
    N1 --> O[Cargo Received / Gate-In]
    O --> P[Loaded on Vessel]
    P --> Q[Generate / Validate BL]
    Q --> R{BL correct?}
    R -- Yes --> S[BL Issued]
    R -- No --> T[BL Amendment Required]
    T --> Q
    S --> U[Release Authorization]
    U --> V[Cargo Delivered]
    V --> W[Shipment Closed]

    M --> I
    Z --> J
```


## Notes
- The intake service captures the original email, attachments, and metadata.
- If parsing fails or fields are incomplete, the system creates a booking in Pending Manual Review.
- Every transition should be recorded in a status history log.

## Process explanation
1. A customer sends an email with booking-related files.
2. The system reads the message and attachments.
3. Relevant shipment information is extracted.
4. The booking is created and placed in Pending Manual Review when details are sufficient.
5. Operations validates the booking and confirms carrier capacity.
6. Cargo is moved, loaded, and the BL is issued.
7. Any BL mismatch triggers amendment handling.
8. Final delivery closes the workflow.
