const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const TeacherSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    avatar: {
      type: String,
    },
    isStudent:{
      type:Boolean,
      default:false,
    },
    assignments:[{
      type:mongoose.Schema.Types.ObjectID,
      ref:"Assignment"
    }]
  },
  {
    timestamps: true,
  }
);

const Teacher = mongoose.model('Teacher', TeacherSchema);

module.exports = Teacher;
