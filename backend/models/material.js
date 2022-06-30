const mongoose = require('mongoose');

const multer = require('multer');
const path = require('path');
const MATERIAL_PATH = path.join('/uploads/classroom/material');

const Schema = mongoose.Schema;

const MaterialSchema = new Schema(
  {
    text: {
      type: String,
      required: true,
    },
    material: {
      type: String,
    },
    classroom: {
      type: mongoose.Schema.Types.ObjectID,
      ref: 'Classroom',
    }
  },
  {
    timestamps: true,
  }
);

let storage = multer.diskStorage({
  destination: function (req, file, cb) {
     cb(null, 'uploads/classroom/material'); //this is the exact path where file is going to be stored
  },
  filename: function (req, file, cb) {
    const arr = file.originalname.split('.');
    cb(null, file.fieldname + '-' + Date.now()+ '.' + arr[arr.length - 1]);
  },
});

MaterialSchema.statics.uploadedMaterial = multer({ storage: storage }).single(
  'material'
);
MaterialSchema.statics.materialPath = MATERIAL_PATH;

const Material = mongoose.model('Material', MaterialSchema);

module.exports = Material;
