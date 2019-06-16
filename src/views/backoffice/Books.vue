<template>
  <div>
    <backOfficeNav/>
    <div class="margin5 mt-4">
      <div class="row">
        <div class="col-12 col-md-12 boxTitle" id>
          <h3>Adicionar Livro</h3>
        </div>
      </div>
      <div class="row">
        <div class="col-12 col-md-12 boxContent">
          <form action id="formBooks">
            <div class="row alignLeft mt-2">
              <div class="col-4">
                <label for="inputTitle">Titulo</label>
                <input type="text" id="inputTitle" class="form-control" v-model="form.title">
              </div>
              <div class="col-4">
                <label for="inputCover">Capa</label>
                <input type="text" id="inputCover" class="form-control" v-model="form.cover">
              </div>
              <div class="col-4">
                <label for="inputAuthor">Autor</label>
                <input type="text" id="inputAuthor" class="form-control" v-model="form.author">
              </div>
            </div>
            <div class="row alignLeft mt-2">
              <div class="col-4">
                <label for="inputTitle">Editora</label>
                <input type="text" id="inputTitle" class="form-control" v-model="form.publisher">
              </div>
              <div class="col-4">
                <label for="inputCover">Tags</label>
                <input type="text" id="inputCover" class="form-control" v-model="form.tags">
              </div>
              <div class="col-4">
                <label for="inputAuthor">Data Lançamento</label>
                <input type="text" id="inputAuthor" class="form-control" v-model="form.launchDate">
              </div>
            </div>
            <div class="row alignLeft mt-2">
              <div class="col-4">
                <label for="inputTitle">Descrição</label>
                <input type="text" id="inputTitle" class="form-control" v-model="form.description">
              </div>
              <div class="col-4">
                <label for="inputCover">Disponibilidade</label>
                <input
                  type="text"
                  id="inputCover"
                  class="form-control"
                  v-model="form.disponibility"
                >
              </div>
              <div class="col-4">
                <label for="inputAuthor">Estado do livro</label>
                <input type="text" id="inputAuthor" class="form-control" v-model="form.bookStatus">
              </div>
              <div class="col-4">
                <button
                  type="button"
                  id="btnSubmit"
                  @click="addBook"
                  class="btn btn-lg buttonColor mt-3 mb-3"
                >Adicionar Livro</button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
    <div class="margin5 mt-4">
      <div class="row">
        <div class="col-12 col-md-12 boxTitle" id>
          <h3>Livros</h3>
        </div>
      </div>
      <div class="row">
        <div class="col-12 col-md-12 boxContent">
          <form action class="mt-4 alignLeft">
            <label for="titleFilter" class="ml-2">Filtrar por titulo:</label>
            <div class="form-inline">
              <input type="text" class="form-control ml-2" id="titleFilter" v-model="titleFilter">
              <button class="btn buttonColor ml-4" id="btnLogin" @click="filterBooks">Filtrar</button>
            </div>
          </form>
          <table class="table mt-4 table-responsive">
            <thead>
              <tr>
                <th scope="col">Titulo</th>
                <th scope="col">Capa</th>
                <th scope="col">Autor</th>
                <th scope="col">Editora</th>
                <th scope="col">Tag</th>
                <th scope="col">Data</th>
                <th scope="col">Descriçao</th>
                <th scope="col">Disponibilidade</th>
                <th scope="col">Estado</th>
                <th scope="col">Ações</th>
                <th scope="col"></th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="book in filteredBooks" :key="book._id">
                <td v-if="editBool  || book._id != editID">{{book.title}}</td>
                <td v-if="editBool == false && book._id == editID">
                  <input type="text" class="form-control editInput" v-model="edit.title">
                </td>
                <td v-if="editBool  || book._id != editID">
                  <input type="button" @click="seeCover(book.cover)" value="+">
                </td>
                <td v-if="editBool == false && book._id == editID">
                  <input type="text" class="form-control editInput" v-model="edit.cover">
                </td>
                <td v-if="editBool || book._id != editID">{{book.author}}</td>
                <td v-if="editBool == false && book._id == editID">
                  <input type="text" class="form-control editInput" v-model="edit.author">
                </td>
                <td v-if="editBool || book._id != editID">{{book.publisher}}</td>
                <td v-if="editBool == false && book._id == editID">
                  <input type="text" class="form-control editInput" v-model="edit.publisher">
                </td>
                <td v-if="editBool || book._id != editID">{{book.tags}}</td>
                <td v-if="editBool == false && book._id == editID">
                  <input type="text" class="form-control editInput">
                </td>
                <td v-if="editBool || book._id != editID">{{book.launchDate}}</td>
                <td v-if="editBool == false && book._id == editID">
                  <input type="text" class="form-control editInput" v-model="edit.launchDate">
                </td>
                <td v-if="editBool  || book._id != editID">
                  <input type="button" @click="seeDescription(book.description)" value="+">
                </td>
                <td v-if="editBool == false && book._id == editID">
                  <textarea
                    type="text"
                    class="form-control editInput"
                    rows="5"
                    v-model="edit.description"
                  ></textarea>
                </td>
                <td>{{book.disponibility}}</td>
                <td v-if="editBool || book._id != editID">{{book.bookStatus}}</td>
                <td v-if="editBool == false && book._id == editID">
                  <input type="text" class="form-control editInput" v-model="edit.bookStatus">
                </td>
                <td>
                  <button
                    type="button"
                    style="color:white"
                    @click="editBook(book._id)"
                    class="btn btn-dark"
                  >
                    <i class="fas fa-edit"></i>
                  </button>
                </td>
                <td>
                  <button
                    type="button"
                    style="color:white"
                    @click="deleteBook(book._id)"
                    class="btn btn-danger"
                  >
                    <i class="fas fa-trash-alt"></i>
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
.coverSize {
  height: 200px;
  width: 150px;
}

.editInput {
  height: 35px;
}
</style>

<script>
import backOfficeNav from "@/components/backOfficeNav.vue";
import swal from "sweetalert2";
import axios from "axios";

export default {
  components: {
    backOfficeNav
  },
  data: function() {
    return {
      books: [],
      //books: this.$store.state.books,
      editBool: true,
      editID: 0,
      created: false,
      edit: {
        title: "",
        author: "",
        publisher: "",
        // tags: "",
        launchDate: "",
        bookStatus: ""
      },
      filteredBooks: [],
      //filteredBooks: this.$store.state.books,
      titleFilter: "",
      // form: {
      //   title: "",
      //   cover: "",
      //   author: "",
      //   publisher: "",
      //   tags: "",
      //   launchDate: "",
      //   description: "",
      //   disponibility: "",
      //   bookStatus: ""
      // }
      form: this.$store.state.form
    };
  },

  created() {
    axios
      .get("https://owl-server-pw2.herokuapp.com/books")
      .then(res => {
        this.books = res.data;
        this.filteredBooks = res.data;
        console.log("books:");
        console.log(this.books);
      })
      .catch(error => {
        console.log(error);
      });
  },

  methods: {
    seeDescription(description) {
      swal({
        type: "info",
        title: "Descrição",
        text: description,
        showConfirmButton: true
      });
    },

    seeCover(cover) {
      swal({
        title: "Url",
        text: cover,
        html:
          '<img src="' +
          cover +
          '" alt="" class="coverSize">' +
          '<p class="mt-1">' +
          cover +
          "</p>",
        showConfirmButton: true,
        showCancelButton: true,
        cancelButtonText: "Edit",
        cancelButtonColor: "#592316"
      }).then(result => {
        if (result.dismiss == "cancel") {
          console.log("oi");
        }
      });
    },

    editBook(id) {
      for (let i = 0; i < this.books.length; i++) {
        if (this.books[i]._id === id) {
          if (this.created == false) {
            this.edit.title = this.books[i].title;
            this.edit.author = this.books[i].author;
            this.edit.publisher = this.books[i].publisher;
            this.edit.cover = this.books[i].cover;
            this.edit.description = this.books[i].description;
            this.created = true;
          }

          if (this.editBool && this.created) {
            this.editID = id;
            this.edit.title = this.books[i].title;
            this.edit.author = this.books[i].author;
            this.edit.publisher = this.books[i].publisher;
            this.edit.cover = this.books[i].cover;
            this.edit.description = this.books[i].description;
            this.editBool = false;
          } else {
            this.editBool = true;
            this.editID = i;
            let route = "https://owl-server-pw2.herokuapp.com/books/" + this.books[i]._id;

            axios
              .put(route, {
                title: this.edit.title,
                author: this.edit.author,
                publisher: this.edit.publisher,
                cover: this.edit.cover,
                description: this.edit.description,
                launchDate: this.edit.launchDate,
                bookStatus: this.edit.bookStatus
              })
              .then(res => {
                console.log(res);
              })
              .catch(error => {
                console.log(error);
              });
            
            this.books[i].title = this.edit.title
            this.books[i].author = this.edit.author
            this.books[i].publisher = this.edit.publisher
            this.books[i].cover = this.edit.cover
            this.books[i].description = this.edit.description
            this.books[i].launchDate = this.edit.launchDate
            this.books[i].bookStatus = this.edit.bookStatus
            /*this.$store.dispatch("edit_book", {
              bookId: this.editID,
              title: this.edit.title,
              author: this.edit.author,
              publisher: this.edit.publisher,
              cover: this.edit.cover,
              description: this.edit.description,
              launchDate: this.edit.launchDate,
              bookStatus: this.edit.bookStatus
            });*/
            swal({
              type: "success",
              title: "Livro editado com sucesso."
            });
          }
        }
      }
    },

    deleteBook(id) {
      swal({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!"
      }).then(result => {
        if (result.value) {
          for (let i = 0; i < this.books.length; i++) {
            if (this.books[i]._id === id) {
              let route = "https://owl-server-pw2.herokuapp.com/books/" + this.books[i]._id;
          
              axios
                .delete(route)
                .then(res => {
                  console.log(res);
                })
                .catch(error => {
                  console.log(error);
                });
              this.books.splice(i, 1);
              //this.$store.dispatch("delete_book", i);
              swal("Deleted!", "Book has been deleted.", "success");
            }
          }
        }
      });
    },

    addBook() {
      axios
        .post("https://owl-server-pw2.herokuapp.com/books", {
          cover: this.form.cover,
          title: this.form.title,
          author: this.form.author,
          publisher: this.form.publisher,
          idTag: this.form.tags,
          launchDate: this.form.launchDate,
          nPages: 100,
          description: this.form.description,
          nViews: 100,
          availability: true,
          bookStatus: this.form.bookStatus
        })
        .then(res => {
          console.log("entrou");
          console.log(res);
        })
        .catch(error => {
          console.log(error);
        });

      this.books.push({
        bookId: null,
        cover: this.form.cover,
        title: this.form.title,
        author: this.form.author,
        publisher: this.form.publisher,
        idTag: this.form.tags,
        launchDate: this.form.launchDate,
        nPages: 100,
        description: this.form.description,
        nViews: 100,
        availability: true,
        bookStatus: this.form.bookStatus
      });
      // this.$store.dispatch("add_book", {
      //   bookId: this.$store.getters.getLastIdBooks,
      //   title: this.form.title,
      //   cover: this.form.cover,
      //   author: this.form.author,
      //   publisher: this.form.publisher,
      //   tags: this.form.tags,
      //   launchDate: this.form.launchDate,
      //   description: this.form.description,
      //   availability: this.form.disponibility,
      //   bookStatus: this.form.bookStatus
      // });
      swal({
        type: "success",
        title: "Livro adicionado com sucesso."
      });
      this.form = {};
      // this.$store.dispatch("clear_form", {
      //   title: "",
      //   cover: "",
      //   author: "",
      //   publisher: "",
      //   tags: "",
      //   launchDate: "",
      //   description: "",
      //   disponibility: "",
      //   bookStatus: ""
      // });
    },

    filterBooks() {
      this.filteredBooks = [];
      let filterBooksResult = false;

      for (let i = 0; i < this.books.length; i++) {
        let upperTitle = this.books[i].title.toUpperCase();
        let upperFilterTitle = this.titleFilter.toUpperCase();

        filterBooksResult = upperTitle.includes(upperFilterTitle);

        if (filterBooksResult) {
          this.filteredBooks.push(this.books[i]);
        }
      }
    }
  }
};
</script>
