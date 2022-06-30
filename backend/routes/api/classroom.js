const express = require('express');
const router = express.Router();
const auth = require("../../middleware/auth");
const { check, validationResult } = require("express-validator");
const crypto = require('crypto');

const Classroom = require('../../models/classroom');
const User = require('../../models/User');
const Assignment = require('../../models/assignment');
const Teacher = require("../../models/teacher");

//Create Classroom
router.post('/',
  [
    auth,
    check('subject','Subject is required!').not().isEmpty()
  ]
  ,async(req,res)=>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {

      const classcode = crypto.randomBytes(3).toString('hex');

      const newclass = new Classroom({
        subject:req.body.subject,
        code:classcode,
        teacher:req.user.id
      });

      const newClassroom=await newclass.save();
      res.json(newClassroom);

    } catch (err) {
      console.error( "$$$$$$$" , err.message);
      res.status(500).send("Server error");
    }
})

//Join classroom
router.post('/join',auth,async(req,res)=>{
  try {

    const c=await Classroom.findOne({code:req.body.code});

    if(!c)
    {
      return res.json("No classroom found");
    }

    console.log(c);

    const updatedClasses = await User.update(
      {_id:req.user.id},
      {$addToSet:{
      "classes":c._id
    }}
  )

    const newjoinedStudents = await Classroom.update({code:req.body.code},{$addToSet:{
      "joinedStudents":req.user.id
    }})

    res.json(updatedClasses);

  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
})

router.post("/leaderboard",auth,async(req,res)=>{
  try {
    let arr=[];
    console.log(req.body.classId);
    const classroom=await Classroom.findOne({_id:req.body.classId});
    // if(!classroom){return res.json("no classroom found")}
      for (let i = 0; i < classroom.joinedStudents.length; i++) {
        let user = await User.findOne({_id: classroom.joinedStudents[i]});
        let total = 0;
        let completed = 0;

        if(!user)
        {
          continue;
        }

        for (let j = 0; j < user.assignments.length; j++) {
          const assign = await Assignment.findOne({_id: user.assignments[j]})
          console.log('>>>>>>>', assign);
          if (assign) {
            if ((assign.classid.toString()) === req.body.classId) {
              total++;
            }
          }


        }
        for (let j = 0; j < user.completedAssignments.length; j++) {
          const assign2 = await Assignment.findOne({_id: user.completedAssignments[j]})
          console.log('<<<<<<<<<', assign2);
          if (assign2) {
            if (assign2.classid.toString() === req.body.classId) {
              completed++;
            }
          }


        }
        console.log(total);
        console.log(completed);
        let prog=0;
        if(total!=0)
          prog = 100 * (completed / total);
        if(!user)
          prog=0;
        prog=Math.floor(prog);
        const obj = {
          student: user,
          progress: prog,
          subject:classroom.subject
        }
        arr.push(obj);
      }

    arr.sort((a,b)=>{
      return a.progress-b.progress;
    })

    res.json(arr);

  } catch (error) {
    console.log(error);
    res.status(500).send("server error!");
  }
});

router.get('/desc/:id',auth,async(req,res)=>{
  try {
    const c = await Classroom.findOne({_id:req.params.id})
    //console.log(c.teacher);
    let ar=[];
    if(c)
      ar.push(c.code);
    const t = await Teacher.findOne({_id:c.teacher})
    //console.log(t);
    if(t)
      ar.push(t.name);
    else
      ar.push('No teacher');
    res.json(ar);

  } catch (error) {
    console.log(error);
    res.status(500).send("server error!");
  }
})

router.get('/joinedstudents/:id',auth,async(req,res)=>{
  try {
    const c = await Classroom.findOne({_id:req.params.id});
    if(!c)
      return res.json("No class");

    let ar=[];
    for(let i=0;i<c.joinedStudents.length;i++)
    {
      const u = await User.findOne({_id:c.joinedStudents[i]});
      if(u)
      {
        ar.push({
          name:u.name,
          email:u.email
        })
      }
    }

    res.json(ar);

  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
})

module.exports=router;
