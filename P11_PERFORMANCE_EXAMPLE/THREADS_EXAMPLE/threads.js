// Import Worker Threads API from Node.js
const { 
    isMainThread, // boolean → true if current code is running in the main thread
    workerData,   // data passed from main thread to this worker
    Worker,       // class → used to create new workers
} = require('worker_threads');


// Check whether this code is running in the main thread or worker thread
if (isMainThread) {
    // Main thread execution
    console.log(`Main Thread! Process ID: ${process.pid}`);

    // Create a worker (new thread) and pass some data (array of numbers)
    new Worker(__filename, {
        workerData: [7, 6, 2, 3]  // this array will be available to the worker
    });

    // Create another worker with different data
    new Worker(__filename, {
        workerData: [1, 3, 4, 3]
    });

} else {
    // Worker thread execution
    console.log(`Worker! Process ID: ${process.pid}`);

    // Each worker has access to its own copy of `workerData`
    // Here, the worker sorts the array received from the main thread
    console.log(`${workerData} sorted is ${workerData.sort()}`);
}