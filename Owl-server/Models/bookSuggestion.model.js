var mongoose = require('../Database/connection');
const ObjectId = mongoose.Schema.Types.ObjectId

var bookSuggestionSchema = new mongoose.Schema({
  suggestionTitle: {
    type: String
  },
  suggestionAuthor:  {
    type: String
  } ,
  suggestionCover: {
    type: String
  },
  userId: {
    type: ObjectId
  },
  suggestionDate: {
    type: Date
  },
  suggestNumber: {
    type: Number
  },
});

/*userSchema.pre("save", async function(next) {
    const salt = 10;
    const hash = await bcrypt.hash(this.password, salt);
    this.password = hash;
     
    next();
})
 */
const BookSuggestion = mongoose.model('BookSuggestion', bookSuggestionSchema);
 
module.exports = BookSuggestion;