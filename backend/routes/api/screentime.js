const express = require('express');
const router = express.Router();
const auth = require("../../middleware/auth");
const { check, validationResult } = require("express-validator");

const Screentime = require('../../models/screentime');

router.post('/',auth,async(req,res)=>{
  try {

    let ar=[];
    const item={
      day:req.body.day,
      second:req.body.second,
      minute:req.body.minute,
      hour:req.body.hour,
      date:req.body.date
    }

    const u=await Screentime.findOne({user:req.user.id});

    console.log('user',u);

    if(u)
    {
      const updatedScreentime=await Screentime.update({user:req.user.id},{$addToSet:{
        'time':item
      }})

      return res.json(u);
    }

    ar.push(item);

    const newScreentime = new Screentime({
      user:req.user.id,
      time:ar
    })

    await newScreentime.save();

    res.json(newScreentime);

  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
})

router.get('/timeline',auth,async(req,res)=>{
  try {

    let ar=[];
    const u=await Screentime.findOne({user:req.user.id});
    if(!u)
    {
      return res.json(ar);
    }

    if(u.time.length===0)
    {
      return res.json(ar);
    }

    let d=u.time[0].day;

    let h=u.time[0].hour;
    let m=u.time[0].minute;
    let s=u.time[0].second;
    let dateOfMonth=u.time[0].date;
    for(let i=1;i<u.time.length;i++)
    {
      console.log('day ',d,'  hour  ',h,'   minute ',m,'   second ',s,'  date ',dateOfMonth);
      if(u.time[i].date===dateOfMonth)
      {
        h=h+u.time[i].hour;
        m=m+u.time[i].minute;
        s=s+u.time[i].second
      }
      else
      {
        if(s>=60)
         m=m+(s/60);
        s=s%60;
        if(m>=60)
         h=h+(m/60);
        m=m%60;
        h=Math.floor(h);
        m=Math.floor(m);
        s=Math.floor(s);
        console.log('Updated  day ',d,'  hour  ',h,'   minute ',m,'   second ',s,'  date ',dateOfMonth);
        let item={
          day:d,
          second:s,
          minute:m,
          hour:h,
          date:dateOfMonth
        }
        ar.push(item)

        d=u.time[i].day;
        h=u.time[i].hour;
        m=u.time[i].minute;
        s=u.time[i].second;
        dateOfMonth=u.time[i].date;
      }
    }
    if(s>=60)
      m=m+(s/60);
    s=s%60;
    if(m>=60)
      h=h+(m/60);
    m=m%60;
    h=Math.floor(h);
    m=Math.floor(m);
    s=Math.floor(s);
    console.log('day ',d,'  hour  ',h,'   minute ',m,'   second ',s,'  date ',dateOfMonth);

    let item2={
      day:d,
      second:s,
      minute:m,
      hour:h,
      date:dateOfMonth
    }
    ar.push(item2);

    res.json(ar);

  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
})

module.exports=router;
