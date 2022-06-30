const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const { check, validationResult } = require('express-validator');

const Studentresponse = require('../../models/studentresponse');
const User = require("../../models/User");

router.post('/',
  [
    auth,
    check('text','Text is required!').not().isEmpty()
  ]
  ,async(req,res)=>{

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {

      const response=new Studentresponse({
        text:req.body.text,
        user:req.user.id,
        assignmentid:req.body.assignmentid
      });

      const newresponse=await response.save();

      res.json(newresponse);

  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

router.get('/:id',auth,async(req,res)=>{
  try {
    const s = await Studentresponse.find({assignmentid:req.params.id});
    //res.json(s);
    let ar=[];
    //console.log(' responses ',s);
    for(let i=0;i<s.length;i++)
    {
      const u=await User.findOne({_id:s[i].user});
      //console.log('user ',u);
      if(u)
      {
        ar.push({
          text:s[i].text,
          name:u.name
        })
      }
      else
      {
        ar.push({
          text:s[i].text,
          name:"No name"
        })
      }
    }

    res.json(ar);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
})

module.exports=router;
