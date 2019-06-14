var mongoose = require('../Database/connection');
const ObjectId = mongoose.Schema.Types.ObjectId

var requisitionSchema = new mongoose.Schema({
  bookId:  {
    type: ObjectId
  } ,
  userId: {
    type: ObjectId
  },
  requisitionDate: {
    type: String
  },
  deliveryDate: {
    type: String
  },
  deliveryBookStatus: {
    type: Number
  },
  active: {
    type: Boolean
  }
});

/*userSchema.pre("save", async function(next) {
    const salt = 10;
    const hash = await bcrypt.hash(this.password, salt);
    this.password = hash;
     
    next();
})
 */
const Requisition = mongoose.model('Requisition',requisitionSchema);
 
module.exports = Requisition;