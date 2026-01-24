import { CallHandler } from '@nestjs/common';
import { tap, throwError } from 'rxjs';

const SUCCESS_THRESHOLD = 3; // the number of successful operations above which the circuit will close
const FAILURE_THRESHOLD = 3; // the number of failed operations above which the circuit will open
const OPEN_TO_HALF_OPEN_WAIT_TIME = 60000; // 1 minute in milliseconds

enum CircuitBreakerState {
  Closed,
  Open,
  HalfOpen,
}

export class CircuitBreaker {
  private state: CircuitBreakerState = CircuitBreakerState.Closed;
  private successCount: number = 0;
  private failureCount: number = 0;
  private lastError: Error;
  private nextAttempt: number;

  exec(next: CallHandler) {
    if (this.state === CircuitBreakerState.Open) {
      if (this.nextAttempt > Date.now()) {
        // Still within the wait time
        return throwError(() => this.lastError); // Reject the call
      }
      this.state = CircuitBreakerState.HalfOpen; // Move to HalfOpen state after wait time
    }
    return next.handle().pipe(
      tap({
        next: () => this.handleSuccess(),
        error: (err) => this.handleError(err),
      }),
    );
  }
  private handleSuccess() {
    this.failureCount = 0; // Reset failure count on success
    if (this.state === CircuitBreakerState.HalfOpen) {
      this.successCount++;
      if (this.successCount >= SUCCESS_THRESHOLD) {
        this.state = CircuitBreakerState.Closed; // Close the circuit
        this.successCount = 0; // Reset success count
      }
    }
  }

  private handleError(error: Error) {
    this.failureCount++;
    if (
      this.failureCount >= FAILURE_THRESHOLD ||
      this.state === CircuitBreakerState.HalfOpen
    ) {
      this.state = CircuitBreakerState.Open; // We update the state to Open when failure threshold is reached or in HalfOpen state
      this.lastError = error; // Store the last error
      this.nextAttempt = Date.now() + OPEN_TO_HALF_OPEN_WAIT_TIME; // Set the next attempt time
    }
  }
}
