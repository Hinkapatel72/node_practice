const express = require('express');
const router = express.Router(); //insted of working with router object we use Router

const courses = [
  { id: 1, name: 'course1' },
  { id: 2, name: 'course2' },
  { id: 3, name: 'course3' }
];

router.get('/', (req, res) => {
  res.send(courses);
});

router.post('/', (req, res) => {
  const result = validateCourse(req.body)

  if (result.error) {
    // 400 Bad Request
    res.status(400).send(result.error.details[0].message);
    return;
  }

  const course = {
    id: courses.length + 1,
    name: req.body.name
  };
  courses.push(course);
  res.send(course);
});

router.get('/:id', (req, res) => {
  //function under find will be used to find a course that matches a given criteria
  const course = courses.find(c => c.id === parseInt(req.params.id));
  if (!course) return res.status(404).send('The course with the given ID was not found!');
  res.send(course);
});

//route parameters -> for essential or required values
/*router.get('/api/posts/:year/:month', (req, res) => {
  res.send(req.params);
});*/

//query string parameter -> for anything that is optional (?sortBy=name) -> store in a object with bunch of key and value pairs
/*router.get('/api/posts/:year/:month', (req, res) => {
  res.send(req.query);
});*/

router.put('/:id', (req, res) => {
  const course = courses.find(c => c.id === parseInt(req.params.id));
  if (!course) return res.status(404).send('The course with the given ID was not found');

  const result = validateCourse(req.body)
  // Object distructing -- we can use error only insted of result.error.
  // const { error } = validateCourse(req.body)
  if (result.error) return res.status(400).send(result.error.details[0].message);

  course.name = req.body.name;
  res.send(course);
});

router.delete('/:id', (req, res) => {
  const course = courses.find(c => c.id === parseInt(req.params.id));
  if (!course) return res.status(404).send('The course with the given ID was not found');

  const index = courses.indexOf(course);
  courses.splice(index, 1);
  res.send(course);
});

function validateCourse(course) {
  const schema = {
    name: Joi.string().min(3).required()
  };

  return Joi.validate(course, schema);
}

module.exports = router;
