const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const { check, validationResult } = require("express-validator");

const Classroom = require("../../models/classroom");
const User = require("../../models/User");
const Assignment = require("../../models/assignment");

router.get('/',auth,async(req,res)=>{
  try {
      const u=await User.findOne({_id:req.user.id});
      console.log(`user\n`,u);
      let ar=[];
      for(let i=0;i<u.classes.length;i++)
      {
        const c_id=u.classes[i];
        console.log(`class id  ${c_id}`);
        let total=0;
        let completed=0;
        for(let j=0;j<u.assignments.length;j++)
        {
          console.log(`Assignment id to find  ${u.assignments[j]}`);
          const assgn=await Assignment.find({_id:u.assignments[j],classid:c_id})
          console.log(`Finded assignment\n`,assgn);
          total+=assgn.length;
        }

        for(let j=0;j<u.completedAssignments.length;j++)
        {
          console.log(`Completed  Assignment id to find  ${u.completedAssignments[j]}`);
          const assgn=await Assignment.find({_id:u.completedAssignments[j],classid:c_id});
          console.log(`Finded  complete  assignment\n`,assgn);
          completed+=assgn.length;
        }

        console.log('total  ',total,'   completed  ',completed);
        if(total==0 || completed==0)
        {
          ar.push(0);
        }
        else
        {
          let percent=100*(completed/total);
          percent=Math.floor(percent);
          ar.push(percent)
        }

      }
      res.json(ar);

  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
})



module.exports=router;
