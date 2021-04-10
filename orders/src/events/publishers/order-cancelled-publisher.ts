import { Subjects, Publisher, OrderCancelledEvent } from '@cbtickets24/common';

export class OrderCancelledPublisher extends Publisher<OrderCancelledEvent> {
  subject: Subjects.OrderCancelled = Subjects.OrderCancelled;
}
