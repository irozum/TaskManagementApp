// const mongoose = require('mongoose');
const Task = require("../models/Task");
const express = require('express')
const router = express.Router()
const bodyParser = require('body-parser')
const methodOverride = require('method-override')


router.use(bodyParser.urlencoded({ extended: false }));
router.use(methodOverride('_method'))

// Takes you to the task add page
router.get('/add', (req, res)=>{
    res.render('Task/taskadd')
})


router.post('/add', (req, res)=>{

    const formData = {
        title: req.body.title,
        description: req.body.description,
        dateReminder: req.body.reminderDate
    }

    const task = new Task(formData);
    task.save().then(() => console.log('Task has been saved successfully'))
    .catch((err)=>console.log(`Something went wrong: ${err}`))

    res.redirect('/task/list')
})


// Takes you to the task list page
router.get('/list', (req, res)=>{
    // This is how you pull from the database
    Task.find()
    .then((tasks)=>{
        res.render("Task/taskdashboard", {
            list : tasks
        })
    })
    .catch(err=>console.log(`Error : ${err}`))
})


// Takes you to the task edit page
// router.get('/edit', (req, res)=>{
//     res.render('register')
// })

router.get('/edit/:id', (req, res)=>{
    
    Task.findById(req.params.id)
    .then((task)=>{
        res.render("Task/taskedit", {
            task : task
        })
    })
    .catch(err=>console.log(`Error : ${err}`))

})


router.put('/edit/:id', (req, res)=>{
    Task.findById(req.params.id)
    .then((task)=>{
        task.title = req.body.title
        task.description = req.body.description
        task.dateReminder = req.body.reminderDate
        task.save()
        .then(()=>{
            console.log("Task has been saved successfully")
            res.redirect("/task/list")
        })
    })
    .catch(err=>console.log(`Error : ${err}`))
})


router.delete('/delete/:id', (req, res)=>{
    Task.deleteOne({_id:req.params.id})
    .then(()=>console.log("The document has been deleted"))
    .catch((err)=>console.log(`Something went wrong: ${err}`))

    res.redirect('/task/list')
})



module.exports = router