const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ScreentimeSchema = new Schema(
  {
    user: {
      type:mongoose.Schema.Types.ObjectID,
      ref:"Teacher"
    },
    time:[
    {
        day:{
          type:Number,
        },
        second:{
          type:Number
        },
        minute:{
          type:Number
        },
        hour:{
          type:Number
        },
        date:{
          type:String,
        }
    }
  ]
  },
  {
    timestamps: true,
  }
);

const Screentime = mongoose.model('Screentime', ScreentimeSchema);

module.exports = Screentime;
