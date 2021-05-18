const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/playground')
  .then(() => console.log('Connected to MongoDB...'))
  .catch(err => console.error('Could not connect with mongodb...', err));

const authorSchema = new mongoose.Schema({
  name: String,
  bio: String,
  website: String
});

const Author = mongoose.model('Author', authorSchema);

//embedding author document directly in course document
const Course = mongoose.model('Course', new mongoose.Schema({
  name: String,
  authors: [authorSchema]
  /*author: {
    type: authorSchema,
    required: true
  }*/
}));

async function createCourse(name, authors) {
  const course = new Course({
    name,
    authors
  });

  const result = await course.save();
  console.log(result);
}

async function listCourses() {
  const courses = await Course.find();
  console.log(courses);
}

async function updateAuthor(courseId) {
  const course = await Course.findById(courseId);
  course.author.name = 'Aaria Patel';
  course.save();
}

async function addAuthor(courseId, author) {
  const course = await Course.findById(courseId);
  course.authors.push(author); //changes are only in memory they are not saved to the database
  course.save();
}

async function removeAuthor(courseId, authorId) {
  const course = await Course.findById(courseId);
  const author = course.authors.id(authorId);
  author.remove();
  course.save();
}

//the author subdocument can not be saved on their own, they can only be saved in the context of their parent.
//createCourse('Node Course', new Author({ name: 'Aaria' }));
/*createCourse('Node Course', [
  new Author({ name: 'John' }),
  new Author({ name: 'Smith' })
]);*/

//addAuthor('60a335000ffbbd0f5f9f9b55', new Author({ name: 'Amy' }));

//removeAuthor('60a335000ffbbd0f5f9f9b55', '60a336d6db9b860f6c3c7f01');

//updateAuthor('60a32bb81bbd660eeb5afd48');
