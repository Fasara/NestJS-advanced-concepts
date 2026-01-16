import {
  Injectable,
  OnApplicationBootstrap,
  OnApplicationShutdown,
} from '@nestjs/common';
import { randomUUID } from 'crypto';
import { join } from 'path';
import { firstValueFrom, fromEvent, Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { Worker } from 'worker_threads';

@Injectable()
export class FibonacciWorkerHost
  implements OnApplicationBootstrap, OnApplicationShutdown
{
  private worker: Worker;
  private message$: Observable<{ result: number; id: string }>; // Observable where we store messages from the worker
  onApplicationBootstrap() {
    this.worker = new Worker(join(__dirname, 'fibonacci.worker.js'));
    this.message$ = fromEvent(this.worker, 'message') as Observable<{
      id: string;
      result: number;
    }>;
  }

  onApplicationShutdown() {}

  // Implement the logic that helps to run the worker
  run(n: number) {
    const uniqueId = randomUUID();
    this.worker.postMessage({ n, id: uniqueId });
    return firstValueFrom(
      this.message$.pipe(
        filter(({ id }) => id === uniqueId),
        map(({ result }) => result),
      ),
    );
  }
}
