const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const StudentresponseSchema = new Schema(
  {
    text: {
      type: String,
      required: true
    },
    user:{
      type:mongoose.Schema.Types.ObjectID,
      ref:"User"
    },
    assignmentid:{
      type:mongoose.Schema.Types.ObjectID,
      ref:"Assignment"
    }
  },
  {
    timestamps: true,
  }
);

const Studentresponse = mongoose.model('Studentresponse', StudentresponseSchema);

module.exports = Studentresponse;
