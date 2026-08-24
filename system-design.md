# System Design

## 1. Double-Booking Prevention

The appointment system must prevent two patients from successfully booking the same appointment slot. The backend should not rely only on frontend validation because two users can submit requests at nearly the same time.

The database should enforce uniqueness for an appointment slot and the booking operation should be performed inside a transaction. When a patient attempts to book a slot, the backend verifies that the slot is still available and atomically changes its state to booked. If another request has already booked the slot, the second request receives an appropriate conflict response instead of creating another appointment.

This makes the database the final authority for appointment availability.

## 2. Simultaneous Booking

For simultaneous booking attempts, the backend uses transactional database operations and row-level locking or an equivalent concurrency-control mechanism.

The sequence is:

Patient A and Patient B request the same slot → backend starts transactions → database locks/checks the slot → only one transaction successfully reserves it → the other transaction receives a conflict response.

This prevents race conditions that could occur if availability were checked only before the database update.

## 3. Slot Hold Mechanism

A slot can temporarily enter a `HELD` state when a patient begins the booking process.

The slot lifecycle is:

`AVAILABLE → HELD → BOOKED`

If the patient confirms the appointment, the slot becomes `BOOKED`.

If the patient leaves the booking process or the hold expires, the slot returns to `AVAILABLE`.

A background job can periodically identify expired holds and release them.

## 4. Doctor Leave Conflicts

When an administrator marks a doctor as unavailable for a particular date, the system checks for existing appointments on that date.

Affected appointments are identified and patients are notified about the change. The affected slots are prevented from receiving new bookings.

The system can support cancellation or rescheduling depending on the application's business rules.

## 5. Notification Failure Handling

Email and external notification services should not be allowed to break the appointment transaction.

The appointment is stored successfully first. Notification tasks are then processed asynchronously.

If an email fails, the failure is recorded and the notification can be retried using a background job with a limited retry count.

This ensures that a temporary email-service failure does not cause a valid appointment booking to fail.

## 6. LLM Failure Handling

LLM functionality is treated as an additional service rather than a dependency for the core appointment transaction.

If the LLM fails or becomes unavailable, the appointment process continues and the failure is recorded. A fallback message or pending AI-summary status can be stored.

This prevents external AI-service failures from making the core healthcare appointment system unavailable.