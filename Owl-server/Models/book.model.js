var mongoose = require('../Database/connection');
const ObjectId = mongoose.Schema.Types.ObjectId

var bookSchema = new mongoose.Schema({
  cover: {
    type: String
  },
  title: {
    type: String
  },
  author: {
    type: String
  },
  publisher: {
    type: String
  },
  idTag: [{
    type: ObjectId
  }
  ],
  launchDate: {
    type: String
  },
  nPages: {
    type: Number
  },
  description: {
    type: String
  },
  nViews: {
    type: String
  },
  availability: {
    type: Boolean
  },
  bookStatus: {
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
const Book = mongoose.model('Book', bookSchema);

module.exports = Book;