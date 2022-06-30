const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ClassroomSchema = new Schema(
  {
    subject: {
      type: String,
      required: true,
    },
    code:{
      type:String
    },
    teacher:{
      type:mongoose.Schema.Types.ObjectID,
      ref:"Teacher"
    },
    joinedStudents:[{
      type:mongoose.Schema.Types.ObjectID,
      ref:"User"
    }]
  },
  {
    timestamps: true,
  }
);

const Classroom = mongoose.model('Classroom', ClassroomSchema);

module.exports = Classroom;
