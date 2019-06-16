<template>
  <div>
    <backOfficeNav/>
    <div class="margin5 mt-4">
      <div class="row">
        <div class="col-12 col-md-12 boxTitle">
          <h3>Sugestões</h3>
        </div>
      </div>
      <div class="row">
        <div class="col-12 col-md-12 boxContent">
          <table class="table mt-4 table-responsive">
            <thead>
              <tr>
                <th scope="col">Id</th>
                <th scope="col">Titulo</th>
                <th scope="col">Capa</th>
                <th scope="col">Autor</th>
                <th scope="col">Utilizador</th>
                <th scope="col">Data</th>
                <th scope="col">Nº Sugestões</th>
                <th scope="col">Ações</th>
                <th scope="col"></th>
                <th scope="col"></th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="bookSuggestion in bookSuggestions" :key="bookSuggestion.bookSuggestionId">
                <td>{{bookSuggestion.suggestionId}}</td>
                <td>{{bookSuggestion.suggestionTitle}}</td>
                <td>
                  <input type="button" @click="seeCover(bookSuggestion.suggestionCover)" value="+">
                </td>
                <td>{{bookSuggestion.suggestionAuthor}}</td>
                <div v-for="user in users" :key="user.userID">
                  <td
                    v-if="user.userId == bookSuggestion.userId"
                  >{{user.firstName}} {{user.lastName}}</td>
                </div>
                <td>{{bookSuggestion.suggestionDate}}</td>
                <td>{{bookSuggestion.suggestNumber}}</td>
                <td>
                  <button
                    type="button"
                    style="color:white"
                    @click="confirmSuggestion(bookSuggestion._id)"
                    class="btn btn-success"
                  >
                    <i class="fas fa-check"></i>
                  </button>
                </td>
                <td>
                  <button
                    type="button"
                    @click="addSuggestion(bookSuggestion._id)"
                    style="color:white"
                    class="btn btn-dark"
                  >
                    <i class="fas fa-plus"></i>
                  </button>
                </td>
                <td>
                  <button
                    type="button"
                    style="color:white"
                    @click="deleteSuggestion(bookSuggestion._id)"
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
      //bookSuggestions: this.$store.state.bookSuggestions,
      //users: this.$store.state.users,
      //books: this.$store.state.books,
      bookSuggestions: [],
      users: [],
      books: [],
      form: this.$store.state.form,
      username: "",
      tempSuggestions: []
    };
  },

  created() {
    axios
      .get("https://owl-server-pw2.herokuapp.com/bookSuggestions")
      .then(res => {
        this.bookSuggestions = res.data;
        console.log("tags:");
        console.log(this.tags);
      })
      .catch(error => {
        console.log(error);
      });

    axios
      .get("https://owl-server-pw2.herokuapp.com/books")
      .then(res => {
        this.books = res.data;
        console.log("books:");
        console.log(this.books);
      })
      .catch(error => {
        console.log(error);
      });

    axios
      .get("https://owl-server-pw2.herokuapp.com/users")
      .then(res => {
        this.users = res.data;
        console.log("users:");
        console.log(this.users);
      })
      .catch(error => {
        console.log(error);
      });
  },

  methods: {
    seeCover(cover) {
      swal({
        title: "Capa",
        html: '<img src="' + cover + '" alt="" class="coverSize">' + "</p>",
        showConfirmButton: true
      });
    },

    deleteSuggestion(id) {
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
          for (let i = 0; i < this.bookSuggestions.length; i++) {
            if (this.bookSuggestions[i]._id === id) {
              let route =
                "https://owl-server-pw2.herokuapp.com/bookSuggestions/" +
                this.bookSuggestions[i]._id;

              axios
                .delete(route)
                .then(res => {
                  console.log(res);
                })
                .catch(error => {
                  console.log(error);
                });
              this.bookSuggestions.splice(i, 1);
              //this.$store.dispatch("delete_suggestion", i);
              swal("Deleted!", "Suggestion has been deleted.", "success");
            }
          }
        }
      });
    },

    confirmSuggestion(id) {
      let bookExists = false;
      for (let i = 0; i < this.bookSuggestions.length; i++) {
        if (this.bookSuggestions[i]._id === id) {
          for (let j = 0; j < this.books.length; j++) {
            if (
              this.bookSuggestions[i].suggestionTitle == this.books[j].title
            ) {
              bookExists = true;
            }
          }
        }
      }
      if (bookExists) {
        swal({
          type: "error",
          title: "Livro existente no catalálogo."
        }).then(result => {
          swal({
            title: "Quer eliminar a sugestão?",
            text: "You won't be able to revert this!",
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Sim, eliminar!"
          }).then(result => {
            if (result.value) {
              for (let i = 0; i < this.bookSuggestions.length; i++) {
                if (this.bookSuggestions[i]._id === id) {
                  let route =
                    "https://owl-server-pw2.herokuapp.com/bookSuggestions/" +
                    this.bookSuggestions[i]._id;

                  axios
                    .delete(route)
                    .then(res => {
                      console.log(res);
                    })
                    .catch(error => {
                      console.log(error);
                    });
                  this.bookSuggestions.splice(i, 1);
                  //this.$store.dispatch("delete_suggestion", i);
                  swal("Deleted!", "Suggestion has been deleted.", "success");
                }
              }
            }
          });
        });
      } else {
        swal({
          type: "success",
          title: "Livro não existe no catalálogo."
        });
      }
    },

    addSuggestion(id) {
      for (let i = 0; i < this.bookSuggestions.length; i++) {
        if (this.bookSuggestions[i]._id === id) {
          this.form.title = this.bookSuggestions[i].suggestionTitle;
          this.form.cover = this.bookSuggestions[i].suggestionCover;
          this.form.author = this.bookSuggestions[i].suggestionAuthor;
        }
      }
      this.$router.push("/books");
    },

    filterSuggestions() {
      for (let i = 0; i < this.bookSuggestions.length; i++) {
        if (
          this.tempSuggestions.indexOf(
            this.bookSuggestions[i].suggestionTitle
          ) == -1
        ) {
          console.log(i);
          this.tempSuggestions.push(this.bookSuggestions[i]);
          break;
        }
      }
      return this.tempSuggestions;
      console.log(tempSuggestions);
    }
  }
};
</script>
