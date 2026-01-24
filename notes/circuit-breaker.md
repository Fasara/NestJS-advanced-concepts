## Circuit Breaker Pattern

In a distributed system, calls to remote resources and services can fail due to a variety of reasons, be it network connections, timeouts, or the resources being temporarily unavailable.

What could make things worse, is if you have many callers to an unresponsive supplier, it's possible your system could run out of resources leading to a cascading failures across multiple systems (*snowball effect*).

These type of faults commonly resolve themselves after a short period of time, and any robust cloud application should be prepared to handle them by using a strategy such as the Retry pattern (or many other strategies).

However, there could also be situation where faults are due to unanticipated events, and situations like that might take much longer to fix. In these tough situations, it might be meaningless for an application to continually retry an operation that is unlikely to succeed, so instead, the application should quickly accept that operation has failed, and handle this failure accordingly.