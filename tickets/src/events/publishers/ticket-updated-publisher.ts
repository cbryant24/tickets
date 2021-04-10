import { Publisher, Subjects, TicketUpdatedEvent } from "@cbtickets24/common";

export class TicketUpdatedPublisher extends Publisher<TicketUpdatedEvent> {
  subject: Subjects.TicketUpdated = Subjects.TicketUpdated;
}
