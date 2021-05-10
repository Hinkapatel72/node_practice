const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/playground')
  .then(() => console.log('Connected to MongoDB...'))
  .catch(err => console.error('Could not connect to Mongo DB...', err));

const courseSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 255
    //match: /pattern/
  },
  category: {
    type: String,
    required: true,
    enum: ['web', 'mobile', 'network'], //the category should be in three of this otherwise we get validation error
    lowercase: true,
    //uppercase: true,
    trim: true //if we have a padding around our string mongoose will automatically remove those padding.
  },
  author: String,
  tags: {
    type: Array,
    //custome validator
    validate: {
      isAsync: true,
      validator: function(v, callback) {
        setTimeout(() => {
          const result = v && v.length > 0;
          callback(result);
        }, 1000);
      },
      message: 'A course should have at least one tag.'
    }
  },
  date: { type: Date, default: Date.now },
  isPublished: Boolean,
  price: {
    type: Number,
    required: function() { return this.isPublished; },
    min: 10,
    max: 200,
    get: v => Math.round(v), //when you read the value of the properties
    set: v => Math.round(v) //when you set the value of the properties
  }
});

const Course = mongoose.model('Course', courseSchema);

async function createCourse(){
  const course = new Course({
    name: 'Angular course',
    category: 'Web',
    author: 'Aaria',
    tags: ['frontend'],
    isPublished: true,
    price: 15.8
  });

  try {
    //await course.validate();
    const result = await course.save();
    console.log(result);
  }
  catch(ex) {
    for (field in ex.errors)
      console.log(ex.errors[field].message);
  }
}

createCourse();

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
    .count() // it returns the count of documents that match find criteria.
    .select({ name: 1, tags: 1}); // we can select the properties that we want to be returned.
  console.log(courses);
}

//Approach: Quesry First --> findbyId() - Modify its properties - save
//use: if we receive an input from client and we want to make sure that the update is valid operation for example we have to check
// isPublished is true or not and if it true then don't update it so we can simply return if it is true.
/*async function updateCourse(id) {
  const course = await Course.findById(id);
  if (!course) return;

  //course.isPublished = true;
  //course.author = 'Another Author';

  course.set({
    isPublished: true,
    author: 'Another author'
  });
  const result = await course.save();
  console.log(result);
}*/

//Approach: Update First --> update directly - optionally(get the updated documents)
async function updateCourse(id) {
  const result = await Course.update({ _id: id } , {
    $set: {
      author: 'Aaria',
      isPublished: false
    }
  });
  console.log(result);
}

//updateCourse('609381c6b695ae149463037d');

//to delete multiple documents use deleteMany
async function removeCourse(id) {
  const result = await Course.deleteOne({ _id: id });
  //if we want to get the document that was deleted
  //const course await Course.findByIdAndRemove(id);
  console.log(result);
}

//removeCourse('609381c6b695ae149463037d');
