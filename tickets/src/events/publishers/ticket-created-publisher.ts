import { Publisher, Subjects, TicketCreatedEvent } from '@cbtickets24/common';

export class TicketCreatedPublisher extends Publisher<TicketCreatedEvent> {
  subject: Subjects.TicketCreated = Subjects.TicketCreated;
}
