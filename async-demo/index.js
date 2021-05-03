console.log('Before');
//setTimeout function is a example of non blocking function. When we cann it this will schedule a task to be performed in the future.
setTimeout(() => {
  console.log('Reading a user from a database...');
}, 2000)
console.log('After');
