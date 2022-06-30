const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const UserSchema = new Schema(
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
    standard: {
      type: String,
      required: true,
    },
    classes: [
      {
        type: mongoose.Schema.Types.ObjectID,
        ref: 'Classroom',
      },
    ],
    assignments: [
      {
        type: mongoose.Schema.Types.ObjectID,
        ref: 'Assignment',
      },
    ],
    completedAssignments:[
      {
        type:mongoose.Schema.Types.ObjectID,
        ref:'Assignment'
      }
    ],
    isStudent: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model('User', UserSchema);

module.exports = User;
