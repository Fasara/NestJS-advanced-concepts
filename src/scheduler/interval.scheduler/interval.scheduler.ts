import {
  Injectable,
  OnApplicationBootstrap,
  OnApplicationShutdown,
} from '@nestjs/common';
import { DiscoveryService, MetadataScanner, Reflector } from '@nestjs/core';

@Injectable()
export class IntervalScheduler
  implements OnApplicationBootstrap, OnApplicationShutdown
{
  private intervals: NodeJS.Timeout[] = [];
  constructor(
    private readonly discoveryService: DiscoveryService,
    private readonly reflector: Reflector,
    private readonly metadataScanner: MetadataScanner,
  ) {}
  onApplicationBootstrap() {
    // InstanceWrapper object is an internal NestJS wrapper that represents all controllers, providers, and everything that gets registered in the inversion of control container
    const providers = this.discoveryService.getProviders();
    providers.forEach((wrapper) => {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      const { instance } = wrapper;
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      const prototype = instance && Object.getPrototypeOf(instance);
      // useful to exclude value and factory providers
      if (!instance || !prototype) {
        return;
      }

      // Retrieve the instance metadata using the reflector
      const isIntervalHost =
        this.reflector.get('INTERVAL_HOST_KEY', instance.constructor) ?? false;
      if (!isIntervalHost) {
        return;
      }
      const methodNames = this.metadataScanner.getAllMethodNames(prototype);
      methodNames.forEach((methodName) => {
        const interval = this.reflector.get(
          'INTERVAL_KEY',
          instance[methodName],
        );
        // Exclude methods that are not decorated with @Interval decorator
        if (interval === undefined) {
          return;
        }

        // Set up the interval to call the method at specified intervals
        const intervalRef = setInterval(() => {
          instance[methodName]();
        }, interval);
        this.intervals.push(intervalRef);
      });
    });
  }

  onApplicationShutdown(signal?: string) {
    // Clear all intervals on application shutdown
    this.intervals.forEach((intervalRef) => clearInterval(intervalRef));
  }
}
