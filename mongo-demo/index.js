const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/playground')
  .then(() => console.log('Connected to MongoDB...'))
  .catch(err => console.error('Could not connect to Mongo DB...', err));

const courseSchema = new mongoose.Schema({
  name: String,
  author: String,
  tags: [ String ],
  date: { type: Date, default: Date.now },
  isPublished: Boolean
});

const Course = mongoose.model('Course', courseSchema);

async function createCourse(){
  const course = new Course({
    name: 'Angular course',
    author: 'Aaria',
    tags: ['angular', 'front-end'],
    isPublished: true
  });

  const result = await course.save();
  console.log(result);
}

async function getCourses() {
  //const courses = await Course.find(); // we can get all courses

  pageNumber = 2;
  pageSize = 10;

  //apply find to filter documents(table)
  const courses = await Course
    .find({ author: 'Aaria', isPublished: true })
    //.find({ price: { $gte : 10 } }) // using comparison operator
    //.find({ price: { $gte: 10, $lte: 20 } }) // if we want a price between 10 and 20
    //.find({ price: { $in: [10, 15, 20] } }) // if we want a course that has price 10, 15, 20
    //.find()
    //.or([ { author: 'Aaria' }, { isPublished: true } ]) // or logical operator
    //.find({ author: /^Aaria/ }) //starts with Aaria
    //.find({ author: /Tondon$/i }) //ends with Tondon and i is for case sensitive
    //.find({ author: /.*Aaria.*/ }) //contains Aaria
    .skip( (pageNumber - 1) * pageSize )
    .limit(pageSize)
    .sort({ name: 1}) // 1 means ascending order and -1 means decending order.
    .count(); // it returns the count of documents that match find criteria.
    .select({ name: 1, tags: 1}); // we can select the properties that we want to be returned.
  console.log(courses);
}

getCourses();
