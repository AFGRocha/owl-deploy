var mongoose = require('../Database/connection');
const ObjectId = mongoose.Schema.Types.ObjectId

var tagSchema = new mongoose.Schema({
  tagId: {
    type: ObjectId
  },
  tagDescription: {
    type: String
  }
});

/*userSchema.pre("save", async function(next) {
    const salt = 10;
    const hash = await bcrypt.hash(this.password, salt);
    this.password = hash;
     
    next();
})
 */
const Tag = mongoose.model('Tag', tagSchema);
 
module.exports = Tag;