<template>
  <div class="home">
    <Header/>
    <div class="margin5 mt-4">
      <div class="row">
        <div class="col-12 col-md-12 boxTitle">
          <h3>Perfil</h3>
        </div>
      </div>
      <div class="row">
        <div class="col-9 col-md-9 boxContent">
          <div v-for="user in users" :key="user._id">
            <div v-if="user._id == userLoggedIn">
              <div class="row" style="text-align:left">
                <div class="col-12 col-md-6 col-lg-3">
                  <img
                    v-if="clicked == false"
                    :src="user.photo"
                    height="200"
                    width="250"
                    alt
                    id="profilePhoto"
                    class="mt-4 ml-2 mb-4"
                  >
                  <input
                    v-if="clicked"
                    type="text"
                    class="form-control editInput col-9 mt-5 col-lg-7 mb-2"
                    v-model="user.photo"
                  >
                </div>
                <div class="col-12 col-md-6 col-lg-9">
                  <h4 class="mt-4">Nome de Utilizador</h4>
                  <p v-if="clicked == false">{{user.firstName}} {{user.lastName}}</p>
                  <div class="row">
                    <input
                      v-if="clicked"
                      type="text"
                      class="form-control editInput col-4 col-lg-3 mb-1 ml-3"
                      v-model="user.firstName"
                    >
                    <input
                      v-if="clicked"
                      type="text"
                      class="form-control editInput col-4 col-lg-3 ml-1 mb-2"
                      v-model="user.lastName"
                    >
                  </div>

                  <h4>Email</h4>
                  <p v-if="clicked == false">{{user.email}}</p>
                  <input
                    v-if="clicked"
                    type="text"
                    class="form-control editInput col-9 col-lg-7 mb-2"
                    v-model="user.email"
                  >
                  <a id="btnEdit" @click="editProfile" class="btn btn-dark mt-1">
                    <i class="fas fa-edit"></i> Editar perfil
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="col-3 col-md-3 boxContent" v-if="clicked == false">
          <h4 class="mt-4">Tags Favoritas</h4>
          <ul>
            <li class="text-left" v-for="(teste, i) in testes2" :key="i">{{teste}}</li>
          </ul>
        </div>
        <div class="col-3 col-md-3 boxContent" v-if="clicked">
          <h4 class="mt-4">Tags Favoritas</h4>
          <div class="scrollbox">
            <p v-for="(tag,index) in tags" :key="index">
              <input :id="index" type="checkbox" :value="index">
              {{tag.tagDescription}}
            </p>
          </div>
        </div>
      </div>
      <div class="mt-4">
        <div class="row">
          <div class="col-12 col-md-12 boxTitle" id>
            <h3>Requisicoes</h3>
          </div>
        </div>
        <div class="row">
          <div class="col-12 col-md-12 boxContent">
            <div v-for="requisition in requisitions" :key="requisition.requisitionId">
              <div v-for="book in books" :key="book.bookId">
                <div
                  v-if="requisition.userId == userLoggedIn && requisition.active == true && requisition.bookId == book._id"
                >
                  <div class="row" style="text-align:left">
                    <div class="col-12 col-md-2">
                      <router-link
                        v-on:mouseover.native="clickBook(book._id)"
                        :to="{ name: 'book', params:{id: book._id}}"
                      >
                        <img v-bind:src="book.cover" class="owlCovers mt-4 ml-3">
                      </router-link>
                    </div>
                    <div class="col-12 col-md-10">
                      <h4 class="mt-5">{{book.title}}</h4>
                      <h5>de {{book.author}}</h5>
                      <p class="mt-4">
                        <b>Data de Requisição:</b>
                        {{requisition.requisitionDate}}
                      </p>
                      <a
                        class="btn buttonColor"
                        style="color:white"
                        @click="deliverBook(book._id, userLoggedIn)"
                      >Entregar</a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="mt-4">
        <div class="row">
          <div class="col-12 col-md-12 boxTitle" id>
            <h3>Historico Requisicoes</h3>
          </div>
        </div>
        <div class="row">
          <div class="col-12 col-md-12 boxContent">
            <table class="table mt-4" table-responsive>
              <thead>
                <tr>
                  <th scope="col">Titulo</th>
                  <th scope="col">Capa</th>
                  <th scope="col">Autor</th>
                  <th scope="col">Data de Requisicao</th>
                  <th scope="col">Data de Entrega</th>
                </tr>
              </thead>
              <tbody v-for="requisition in requisitions" :key="requisition.requisitionId">
                <tr v-for="book in books" :key="book.bookId">
                  <td
                    v-if="requisition.userId == userLoggedIn && requisition.active == false && requisition.bookId == book._id"
                  >{{book.title}}</td>
                  <td
                    v-if="requisition.userId == userLoggedIn && requisition.active == false && requisition.bookId == book._id"
                  >
                    <input type="button" @click="seeCover(book.cover)" value="+">
                  </td>
                  <td
                    v-if="requisition.userId == userLoggedIn && requisition.active == false && requisition.bookId == book._id"
                  >{{book.author}}</td>
                  <td
                    v-if="requisition.userId == userLoggedIn && requisition.active == false && requisition.bookId == book._id"
                  >{{requisition.requisitionDate}}</td>
                  <td
                    v-if="requisition.userId == userLoggedIn && requisition.active == false && requisition.bookId == book._id"
                  >{{requisition.deliveryDate}}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
    <Footer/>
  </div>
</template>

<style>
.boxContent {
  background-color: #d9b97e;
  height: 260px;
  color: #592316;
}

#profilePhoto {
  box-sizing: border-box;
  border: 3px solid white;
  border-radius: 5px;
}

#btnEdit {
  color: white;
  background-color: #592316;
}

.editInput {
  height: 35px;
}

#btnEdit:hover {
  opacity: 0.9;
}

.scrollbox {
  height: 200px;
  overflow-x: scroll;
}

.owlCovers {
  height: 200px;
  width: 150px;
  box-sizing: border-box;
  border: 3px solid white;
  border-radius: 5px;
}
.owlCovers:hover {
  /* border-color: #592316; */
  opacity: 0.8;
}
</style>

<script>
import Header from "@/components/Header.vue";
import Footer from "@/components/Footer.vue";
import swal from "sweetalert2";
import axios from "axios";

export default {
  components: {
    Header,
    Footer
  },
  data: function() {
    return {
      users: [],
      userLoggedIn: localStorage.getItem("userLoggedIn"),
      requisitions: [],
      books: [],
      //reviews: this.$store.state.reviews,
      clicked: false,
      user: {
        firstName: "",
        lastName: "",
        email: "",
        favTags: [],
        photo: ""
      },
      tags: [],
      testes: [],
      testes2: [],
      clickedBook: 0,
      
    };
  },

  created() {
    axios
      .get("https://owl-server-pw2.herokuapp.com/users")
      .then(res => {
        this.users = res.data;
        console.log("users:");
        console.log(this.users);

        for (let i = 0; i < this.users.length; i++) {
          if (this.users[i]._id == this.userLoggedIn) {
            this.testes = this.users[i].favTags;
            console.log(this.testes);
          }
        }
      })
      .catch(error => {
        console.log(error);
      });

    axios
      .get("https://owl-server-pw2.herokuapp.com/tags")
      .then(res => {
        this.tags = res.data;
        console.log("tags:");
        console.log(this.tags);
        for (let i = 0; i < this.tags.length; i++) {
          for (let j = 0; j < this.testes.length; j++) {
            if (this.tags[i]._id == this.testes[j]) {
              this.testes2.push(this.tags[i].tagDescription);
            }
          }
        }
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
    console.log(this.userLoggedIn);

    axios
      .get("https://owl-server-pw2.herokuapp.com/requisitions?userId=" + this.userLoggedIn)
      .then(res => {
        this.requisitions = res.data;
        console.log("requisitions:");
        console.log(this.requisitions);
      })
      .catch(error => {
        console.log(error);
      });
  },

  updated() {
    this.checkCheckboxes();
  },

  methods: {
    deliverBook(bookID, userID) {
      for (let i = 0; i < this.requisitions.length; i++) {
        if (
          this.requisitions[i].bookId == bookID &&
          this.requisitions[i].userId == userID &&
          this.requisitions[i].active == true
        ) {
          let currentDate = new Date();
          let date =
            currentDate.getDate() +
            "/" +
            (currentDate.getMonth() + 1) +
            "/" +
            currentDate.getFullYear() +
            " " +
            currentDate.getHours() +
            ":" +
            currentDate.getMinutes();
          let del = [i, userID, 50, bookID, date]; //Saber a posição e pontos para o user
          //this.$store.dispatch("delivery_book", del);

          axios
              .put(
                "https://owl-server-pw2.herokuapp.com/requisitions/" +
                  this.requisitions[i]._id,
                {
                  deliveryDate: date
                }
              )
              .then(res => {
                console.log(res);
                this.checkRequesition(this.clickedBook, this.loggedUser);
              })
              .catch(error => {
                console.log(error);
              });
            //this.$store.dispatch("delivery_book", del);
            swal({
              type: "success",
              title: "Livro entregado com sucesso."
            });
          
          this.requisitions[i].active = false
        }
      }
    },

    editProfile() {
      if (this.clicked) {
        this.clicked = false;
        for (let i = 0; i < this.users.length; i++) {
          if (this.users[i]._id == this.userLoggedIn) {
            this.user.firstName = this.users[i].firstName;
            this.user.lastName = this.users[i].lastName;
            this.user.email = this.users[i].email;
            this.user.photo = this.users[i].photo;

            let route = "https://owl-server-pw2.herokuapp.com/users/" + this.users[i]._id;

            axios
              .put(route, {
                firstName: this.user.firstName,
                lastName: this.user.lastName,
                email: this.user.email,
                photo: this.user.photo
              })
              .then(res => {
                console.log(res);
              })
              .catch(error => {
                console.log(error);
              });
          }
        }

        this.testes = [];
        this.testes2 = [];
        this.user.favTags = [];
        for (let i = 0; i < this.tags.length; i++) {
          console.log("entrou no for do coiso");
          if (document.getElementById(i.toString()).checked) {
            console.log("entrou no if do coiso");
            this.testes.push(this.tags[i].tagDescription);
            this.user.favTags.push(this.tags[i]._id);
            console.log(this.user.favTags);
          }
        }

        let route = "https://owl-server-pw2.herokuapp.com/users/" + this.userLoggedIn;

        axios
          .put(route, {
            favTags: this.user.favTags
          })
          .then(res => {
            console.log("entrou edit tags");
            console.log(res);
          })
          .catch(error => {
            console.log(error);
          });

        for (let i = 0; i < this.users.length; i++) {
          if (this.users[i]._id == this.userLoggedIn) {
            this.testes = this.user.favTags;
          }
        }

        for (let i = 0; i < this.tags.length; i++) {
          for (let j = 0; j < this.testes.length; j++) {
            if (this.tags[i]._id == this.testes[j]) {
              this.testes2.push(this.tags[i].tagDescription);
            }
          }
        }

        // this.$store.dispatch("update_favtags", [
        //   this.userLoggedIn,
        //   this.user.favTags
        // ]);
      } else {
        this.clicked = true;
        // this.users[this.userLoggedIn].firstName = this.user.firstName
        // this.users[this.userLoggedIn].lastName = this.user.lastName
        // this.users[this.userLoggedIn].email = this.user.email
      }
    },

    checkCheckboxes() {
      if (this.clicked) {
        this.user.favTags = this.testes2;
        console.log(this.user.favTags);
        for (let i = 0; i < this.tags.length; i++) {
          for (let j = 0; j < this.user.favTags.length; j++) {
            if (this.tags[i].tagDescription == this.user.favTags[j]) {
              document.getElementById(i.toString()).checked = true;
            }
          }
        }
      }
    },

    clickBook(index) {
      for (let i = 0; i < this.books.length; i++) {
        if (this.books[i].bookId === index) {
          this.$store.dispatch("open_book", i);
          this.clickedBook = i;
        }
      }
    },

    seeCover(cover) {
      swal({
        title: "Capa",
        text: cover,
        html: '<img src="' + cover + '" alt="" class="coverSize">',
        showConfirmButton: true
      });
    }
  },
  computed: {}
};
</script>