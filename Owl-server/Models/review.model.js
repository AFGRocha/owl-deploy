var mongoose = require('../Database/connection');
const ObjectId = mongoose.Schema.Types.ObjectId

var reviewSchema = new mongoose.Schema({
  bookId: {
    type: ObjectId
  },
  userId:  {
    type: ObjectId
  } ,
  rating: {
    type: Number
  },
  date: {
    type: String
  },
  comment: {
    type: String
  },
  upVote: {
    type: Array
  },
  downVote: {
    type: Array
  }  
});

/*userSchema.pre("save", async function(next) {
    const salt = 10;
    const hash = await bcrypt.hash(this.password, salt);
    this.password = hash;
    next();
})
 */
const Review = mongoose.model('Review', reviewSchema);
 
module.exports = Review;