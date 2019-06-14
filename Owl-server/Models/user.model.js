var mongoose = require('../Database/connection');
const ObjectId = mongoose.Schema.Types.ObjectId
const bcrypt = require('bcrypt')

var userSchema = new mongoose.Schema({
  firstName: {
    type: String
  },
  lastName:  {
    type: String
  } ,
  email: {
    type: String
  },
  password: {
    type: String
  },
  ableToRequest: {
    type: Boolean
  },
  type: {
    type: String
  },
  nRequisitionsNow: {
    type: Number
  },
  photo: {
    type: String
  },
  points:{
    type: Number
  },
  favTags: [{
      type: ObjectId 
  }
  ]
});

userSchema.pre("save", async function(next) {
    const salt = 10;
    const hash = await bcrypt.hash(this.password, salt);
    this.password = hash;
     
    next();
})

const User = mongoose.model('User', userSchema);
 
module.exports = User;