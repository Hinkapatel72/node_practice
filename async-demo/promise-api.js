
const p = Promise.resolve({ id: 1 });
p.then(result => console.log(result));

// the reason to use new Error is when error occure it will have callstack.
const pr = Promise.reject(new Error('Reason for rejection....'));
pr.catch(error => console.log(error));
