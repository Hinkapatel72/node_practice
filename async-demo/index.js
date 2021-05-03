console.log('Before');

// Callback-based Approach
/*getUser(1, (user) => {
  getRepositories(user.gitHubUsername, (repos) => {
    getCommits(repos[0], (commits) => {
      console.log(commits);
    })
  })
});*/
//getUser(1, getRepositories); // Callback Hell Approach

console.log('After');

function getRepositories(user) {
  getRepositories(user.gitHubUsername, getCommits);
}

function getCommits(repos) {
  getCommits(repo, displayCommits);
}

function displayCommits(commits) {
  console.log(commits);
}

// Promises-based Approach
/*getUser(1)
  .then(user => getRepositories(user.gitHubUsername))
  .then(repos => getCommits(repos[0]))
  .then(commits => console.log('Commits', commits))
  .catch(err => console.log('Error', err.message));*/


// Async and Await Approach
async function displayFinalCommits() {
  try {
    const user = await getUser(1);
    const repos = await getRepositories(user.gitHubUsername);
    const commits = await getCommits(repos[0]);
    console.log(commits);
  }
  catch(err) {
    console.log('Error', err.message);
  }

}
displayFinalCommits();

//callback is a function that we are going to call when the result of an async operation is ready.
function getUser(id) {
  return new Promise((resolve, reject) => {
    //setTimeout function is a example of non blocking function. When we cann it this will schedule a task to be performed in the future.
    setTimeout(() => {
      console.log('Reading a user from a database...');
      resolve({ id:id, gitHubUsername: 'xyz' });
    }, 2000);
  });
}

function getRepositories(username) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log('Get all repositories from the git....');
      resolve(['repo1', 'repo2', 'repo3']);
      //reject(new Error('Could not get the repos...'));
    }, 2000);
  });
}

function getCommits(repo) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log('Calling Github API...');
      resolve(['commit']);
    }, 2000);
  });
}
