import { Injectable } from '@nestjs/common';
import { PaymentFailedEvent } from './events/payment-failed.event';
import { OnEvent } from '@nestjs/event-emitter';
import { EventContext } from './context/event-context';
import { ModuleRef } from '@nestjs/core';

@Injectable()
export class SubscriptionsService {
  constructor(private readonly moduleRef: ModuleRef) {}
  @OnEvent(PaymentFailedEvent.key)
  async cancelSubscriptions(event: PaymentFailedEvent) {
    const eventContext = await this.moduleRef.resolve(
      EventContext,
      event.meta.contextId,
    );
    console.log(
      'Cancelling subscriptions due to payment failure of payment ID:',
      eventContext.request.url,
    );
  }
}
