import { Subjects, Publisher, PaymentCreatedEvent } from '@cbtickets24/common';

export class PaymentCreatedPublisher extends Publisher<PaymentCreatedEvent> {
  readonly subject = Subjects.PaymentCreated;
}
