import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CoffeesModule } from './coffees/coffees.module';
import { SchedulerModule } from './scheduler/scheduler.module';
import { CronModule } from './cron/cron.module';
import { FibonacciModule } from './fibonacci/fibonacci.module';
import { HttClientModule } from './http-client/http-client.module';
import { TagsModule } from './tags/tags.module';

@Module({
  imports: [
    CoffeesModule,
    SchedulerModule,
    CronModule,
    FibonacciModule,
    HttClientModule.register({ baseUrl: 'https://nestjs.com' }),
    TagsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
