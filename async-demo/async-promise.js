
//Here both async operations started at the same time.

const p1 = new Promise((resolve) => {
  setTimeout( () => {
    console.log('Async Operation 1...');
    resolve(1);
  }, 2000);
});

const p2 = new Promise((resolve) => {
  setTimeout( () => {
    console.log('Async Operation 2...');
    resolve(2);
  }, 2000);
});

const p3 = new Promise((resolve, reject) => {
  setTimeout( () => {
    console.log('Async Operation 3...');
    reject(new Error('Because something failed...'));
  }, 2000);
});

// this single thread is kicking off multiple async operations almost at the same time.
// first it starts p1, the thread is realsed so immediately after it starts p2.
// we are not waiting for the result of the p1 operation to be ready in order to kick of the p2 ooperation.
// If any of Promise is rejected that final promise that is returned from promise.all is consider rejected.
Promise.all([p1, p2, p3]) //this method will return a new Promise that will be resolve when all Promises in the array are resolved
  .then(result => console.log(result))
  .catch(err => console.log('Error', err.message));


//sometime we want to kick off multiple ayync operations but we want something as soos as one of these async operations completes.
// we don't want to wait for all of them to complete. we need to use Promise.race.
/*Promise.race([p1, p2])
  .then(result => console.log(result));*/
