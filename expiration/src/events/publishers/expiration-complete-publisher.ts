import {
  Subjects,
  Publisher,
  ExpirationCompleteEvent,
} from '@cbtickets24/common';

export class ExpirationCompletePublisher extends Publisher<ExpirationCompleteEvent> {
  readonly subject = Subjects.ExpirationComplete;
}
