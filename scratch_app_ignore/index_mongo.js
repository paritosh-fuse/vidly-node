const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/testDB', {useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => console.log('Connected!'))
    .catch(err => console.log(err))

const courseSchema = new mongoose.Schema({
    name: String,
    author: String,
    tags: [ String ],
    date: { type: Date, default: Date.now },
    isPublished : Boolean
})     

const Course = mongoose.model('Course', courseSchema)

async function createCourse(){
    const course = new Course({
        name: "Mastering React",
        author: 'Mosh',
        tags: ['react', 'frontend'],
        isPublished : true
    })
    
    const result = await course.save();
    console.log(result)
}

async function getCourses() {
    const courses = await Course
        .find({author: 'Mosh'})
        .limit(10)
        .sort({name: 1})
        .select('name')
    console.log(courses)
}

async function deleteCourses(id) {
    const courses = await Course.deleteOne(id)
    console.log(courses)
}
deleteCourses();