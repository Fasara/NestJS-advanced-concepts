## Worker Threads in action

Worker threads help us offload CPU intensive tasks, away from the event loop so that they can be executed parallelly in a non-blocking manner.
Although they don't help us much with io operations since the Node.js built-in asynchronous IO operations are much more efficient.

Each worker thread has its own isolated V8 environment, context, event loop, event, queue, etc. However, they can share memory, by transferring `ArrayBuffer` instances or sharing `SharedArrayBuffer` instances with one another.
Also. a worker and parent can communicate with each other through a messaging channel.

Note that in Nod.js is important to differentiate between CPU-intensive, long-running, event-loop blocking operations, and I/O operations (such as HTTP requests, querying the database, etc.)