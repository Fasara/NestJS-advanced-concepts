import { Injectable } from '@nestjs/common';
import { PaymentFailedEvent } from './events/payment-failed.event';
import { OnEvent } from '@nestjs/event-emitter';
import { ModuleRef } from '@nestjs/core';
import { EventContext } from './context/event-context';

@Injectable()
export class NotificationsService {
  constructor(private readonly moduleRef: ModuleRef) {}
  @OnEvent(PaymentFailedEvent.key)
  // This method will be called whenever a PaymentFailedEvent is emitted
  async sendPaymentFailedNotification(event: PaymentFailedEvent) {
    const eventContext = await this.moduleRef.resolve(
      EventContext,
      event.meta.contextId,
    );
    console.log(
      'Sending notification for payment failure of payment ID:',
      eventContext.request.url,
    );
  }
}
