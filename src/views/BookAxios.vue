<template>
  <div class="book">
    <Header/>

    <!--Book info-->
    <div class="margin5 mt-4">
      <!--Header row-->
      <div class="row">
        <div class="col-12 col-md-12 boxTitle">
          <h3>Detalhes do livro</h3>
        </div>
      </div>

      <!--Content row-->
      <div class="row">
        <div class="col-12 col-md-12 boxContent">
          <!--Cover row-->
          <div class="row">
            <div class="col-12 col-md-3">
              <img
                v-bind:src="book[0].cover"
                alt
                class="img-thumbnail rounded img-fluid margin5 bookCoverBig float-left ml-4 mt-4"
              >
            </div>

            <!-- Info -->
            <div class="col-12 col-md-9">
              <div class="row" style="margin-top:2%">
                <h1 class="bookInforHeaders alignLeft font-weight-bold">{{book[0].title}}</h1>
              </div>

              <div class="row">
                <h4 class="bookInforHeaders alignLeft">{{book[0].author}}</h4>
              </div>

              <div class="alignLeft">
                <i class="fas fa-star" style="color:gold" v-if="bookRating > 0"></i>
                <i class="fas fa-star" style="color:lightgrey" v-if="bookRating < 1"></i>
                <i class="fas fa-star" style="color:gold" v-if="bookRating > 1"></i>
                <i class="fas fa-star" style="color:lightgrey" v-if="bookRating < 2"></i>
                <i class="fas fa-star" style="color:gold" v-if="bookRating > 2"></i>
                <i class="fas fa-star" style="color:lightgrey" v-if="bookRating < 3"></i>
                <i class="fas fa-star" style="color:gold" v-if="bookRating > 3"></i>
                <i class="fas fa-star" style="color:lightgrey" v-if="bookRating < 4"></i>
                <i class="fas fa-star" style="color:gold" v-if="bookRating > 4"></i>
                <i class="fas fa-star" style="color:lightgrey" v-if="bookRating < 5"></i>
              </div>

              <div class="row mt-4">
                <h4 class="alignLeft bookInforHeaders">
                  <b>Editora:</b>
                  {{book[0].publisher}}
                </h4>
              </div>

              <div class="row mt-4">
                <h4 class="alignLeft bookInforHeaders font-weight-bold">Sinopse</h4>
                <p class="mr-4" style="text-align:left">{{book[0].description}}</p>
              </div>

              <div class="row">
                <button
                  @click="requesition(pageBookId, loggedUser)"
                  :disabled="buttonActive == false"
                  class="btn buttonColor float-right"
                  v-if="this.loggedUser != -1"
                >{{buttonText}}</button>

                <button
                  class="btn-primary rounded"
                  v-if="this.buttonActive==false"
                  @click="notification(clickedBook, loggedUser)"
                >
                  <i class="fas fa-bell"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!--Reviews-->
    <div class="margin5 mt-4">
      <div class="row">
        <div class="col-12 col-md-12 boxTitle">
          <h3>Comentários</h3>
        </div>
      </div>
      <!--Comentar-->
      <div class="row" v-if="loggedUser!=-1 && reviewCheck==0">
        <div class="form-group boxContent col-12 col-md-12">
          <div class="margin5">
            <div class="row">
              <!-- Estrelinhaas-->
              <div class="row">
                <label for="comment" class="font-weight-bold ml-3" style="font-size:20px">Comment:</label>

                <fieldset class="rate ml-3">
                  <input
                    class="starInput"
                    id="rate1-star5"
                    type="radio"
                    name="rate1"
                    value="5"
                    v-model="picked"
                  >
                  <label class="star" for="rate1-star5" title="Excellent">5</label>

                  <input
                    class="starInput"
                    id="rate1-star4"
                    type="radio"
                    name="rate1"
                    value="4"
                    v-model="picked"
                  >
                  <label class="star" for="rate1-star4" title="Good">4</label>

                  <input
                    class="starInput"
                    id="rate1-star3"
                    type="radio"
                    name="rate1"
                    value="3"
                    v-model="picked"
                  >
                  <label class="star" for="rate1-star3" title="Satisfactory">3</label>

                  <input
                    class="starInput"
                    id="rate1-star2"
                    type="radio"
                    name="rate1"
                    value="2"
                    v-model="picked"
                  >
                  <label class="star" for="rate1-star2" title="Bad">2</label>

                  <input
                    class="starInput"
                    id="rate1-star1"
                    type="radio"
                    name="rate1"
                    value="1"
                    v-model="picked"
                  >
                  <label class="star" for="rate1-star1" title="Very bad">1</label>
                </fieldset>
              </div>

              <textarea class="form-control" rows="5" id="comment" v-model="reviewArea"></textarea>

              <!-- Send Review -->
              <button
                style="margin:auto"
                @click="doReview(pageBookId , loggedUser)"
                class="btn buttonColor col-6 mt-3"
              >Publicar</button>
            </div>
          </div>
        </div>
      </div>
      <!--Comentarios-->
      <div class="row boxContent">
        <div class="col-12 col-md-12" v-for="review in reviews" :key="review._id">
          <!-- User Image-->
          <template>
            <div class="col-3">
              <img
                v-bind:src="getInfoFromUser(review.userId).photo"
                alt
                class="img-thumbnail rounded img-fluid margin5 bookCoverBig float-left ml-4 mt-4"
              >
            </div>
            <div class="col-9">
              <!-- Info User -->
              <div class="row mt-4">
                <h3>{{getInfoFromUser(review.userId).firstName}} {{getInfoFromUser(review.userId).lastName}}</h3>

                <!-- Precisa linha -->
                <h6 class="ml-5">{{review.date}}</h6>
              </div>
              <div class="row">
                <i class="fas fa-star" style="color:gold"></i>
                <i class="fas fa-star" style="color:gold" v-if="review.rating > 1"></i>
                <i class="fas fa-star" style="color:lightgrey" v-if="review.rating < 2"></i>
                <i class="fas fa-star" style="color:gold" v-if="review.rating > 2"></i>
                <i class="fas fa-star" style="color:lightgrey" v-if="review.rating < 3"></i>
                <i class="fas fa-star" style="color:gold" v-if="review.rating > 3"></i>
                <i class="fas fa-star" style="color:lightgrey" v-if="review.rating < 4"></i>
                <i class="fas fa-star" style="color:gold" v-if="review.rating > 4"></i>
                <i class="fas fa-star" style="color:lightgrey" v-if="review.rating < 5"></i>
              </div>
              <!-- Review Info -->
              <div class="row mt-4">
                <p v-if="verifyEdit==false || review._id != editThatOne">{{review.comment}}</p>
                <textarea
                  name
                  id
                  cols="30"
                  rows="10"
                  v-if="verifyEdit== true && review._id == editThatOne"
                  v-model="review.comment"
                ></textarea>
              </div>
              <!-- Rating -->
              <div class="row">
                <button
                  v-if="loggedUser!=-1"
                  class="btn-success col-2 ml-2"
                  @click="upVote(review._id, loggedUser,clickedBook)"
                >
                  <i class="fas fa-long-arrow-alt-up"></i>
                  {{review.upVote.length}}
                </button>
                <!-- upVote -->
                <button
                  v-if="loggedUser!=-1"
                  class="btn-danger col-2 ml-2"
                  @click="downVote(review._id, loggedUser,clickedBook)"
                >
                  <i class="fas fa-long-arrow-alt-down"></i>
                  {{review.downVote.length}}
                </button>
                <!-- downVote -->

                <button
                  v-if="loggedUser == getInfoFromUser(review.userId)._id"
                  class="btn-primary col-2 ml-2"
                  @click="editReview(review._id,review.comment)"
                >
                  <i class="fas fa-edit"></i>
                </button>
                <!-- Edit -->
                <button
                  v-if="loggedUser == getInfoFromUser(review.userId)._id"
                  class="btn-dark col-2 ml-2"
                  @click="deleteReview(review._id)"
                >
                  <i class="fas fa-times"></i>
                </button>
                <!-- Trash -->
              </div>

              <!-- Fazer editar e eliminar -->
            </div>
          </template>
        </div>
      </div>
    </div>
    <Footer/>
  </div>

  <!-- <router-link :to="{name:'nomePage'}"><b-button class="btn"></b-button></router-link> -->
</template>

<style>
.rate {
  display: inline-block;
  margin: 0;
  padding: 0;
  border: none;
}

.starInput {
  display: none;
}

.star {
  float: right;
  font-size: 0;
  color: #d9d9d9;
}

.star:before {
  content: "\f005";
  font-family: FontAwesome;
  font-size: 20px;
}

.star:hover,
.star:hover ~ .star {
  color: #fcd000;
  transition: 0.2s;
}

.starInput:checked ~ .star {
  color: #fcd000;
}
</style>


<script>
import Header from "@/components/Header.vue";
import Footer from "@/components/Footer.vue";
import swal from "sweetalert2";
import axios from "axios";
export default {
  //Fazer filtro de reviews com id do livro
  data: function() {
    return {
      loggedUser: 0,
      clickedBook: 0,
      buttonText: "Requisitar",
      requisitions: [],
      books: [],
      users: [],
      reviews: [],
      buttonActive: true,
      bookDeliver: false,
      bookReq: false,
      verifyEdit: false,
      editThatOne: -1,
      picked: 0,
      reviewArea: "",
      bookRating: 0,
      reviewCheck: 0,
      pageBookId: 0,
      book: null,
      userLoggedIn: localStorage.getItem("userLoggedIn")
    };
  },
  methods: {
    notification(bookID, userID) {
      //Do notifications here
      let notf = {
        notificationId: this.$store.state.notifications.length,
        userId: userID,
        type: "bookAvailable",
        bookId: bookID,
        show: false
      };
      this.$store.dispatch("add_notification", notf);
      console.log(notf);
    },
    calculateRating() {
      let all = 0;

      for (let i = 0; i < this.reviews.length; i++) {
        if (this.reviews[i].bookId == this.pageBookId) {
          all += this.reviews[i].rating;
        }
      }

      console.log("Rating total:" + all);
      let total = Math.round(all / this.reviews.length);
      console.log("Rating total:" + total);
      return total;
    },
    doReview(bookID, userID) {
      console.log(this.picked);
      /*for (let i = 0; i < this.reviews.length; i++) {
        if (
          this.reviews[i].bookId == bookID &&
          this.reviews[i].userId == userID
        ) {
          this.reviewCheck = 1;
        }
      }*/

      if (this.picked == 0) {
        swal({
          type: "error",
          title: "Tem de classificar o livro para submeter a review."
        });
      } else {
        let currentDate = new Date();
        let newR = {
          reviewId: this.reviews.length,
          bookId: bookID,
          userId: userID,
          rating: this.picked,
          date:
            currentDate.getDate() +
            "/" +
            (currentDate.getMonth() + 1) +
            "/" +
            currentDate.getFullYear() +
            " " +
            currentDate.getHours() +
            ":" +
            currentDate.getMinutes(),
          comment: this.reviewArea,
          upVote: [],
          downVote: []
        };
        console.table(newR);
        axios
          .post("https://owl-server-pw2.herokuapp.com/reviews", newR)
          .then(res => {
            console.log("entrou");
            console.log(res);
            axios
              .get("https://owl-server-pw2.herokuapp.com/reviews?bookId=" + this.$route.params.id)
              .then(res => {
               
                this.reviews = res.data;
              })
              .catch(error => {
                console.log(error);
              });
          })
          .catch(error => {
            console.log(error);
          });

        this.reviews.push(newR);
        

        //this.$store.dispatch("do_review", newR);
        this.picked = 0;
        this.reviewArea = "";
        this.reviewCheck = 1;
      }
    },

    editReview(reviewID, comment) {
      if (this.verifyEdit == false) {
        this.verifyEdit = true;
        this.editThatOne = reviewID;
      } else {
        this.verifyEdit = false;
        let rev = [reviewID, comment];
        let route = "https://owl-server-pw2.herokuapp.com/reviews/" + reviewID;

        axios
          .put(route, {
            comment: comment
          })
          .then(res => {
            console.log(res);
          })
          .catch(error => {
            console.log(error);
          });

        //this.$store.dispatch("edit_review", rev);
      }
    },
    deleteReview(reviewID) {
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
          for (let i = 0; i < this.reviews.length; i++) {
            if (this.reviews[i]._id == reviewID) {
              let route =
                "https://owl-server-pw2.herokuapp.com/reviews/" + this.reviews[i]._id;

              axios
                .delete(route)
                .then(res => {
                  console.log(res);
                })
                .catch(error => {
                  console.log(error);
                });
              this.reviews.splice(i, 1);
              this.reviewCheck = 0
              //this.$store.dispatch("delete_book", i);
              swal("Deleted!", "Review has been deleted.", "success");
            }
          }
        }
      });
    },

    upVote(reviewID, userID, bookID) {
      let verify = true;
      let checkUp = true;
      let reviewUpvotes = [];
      let reviewDownvotes = [];
      let route = "https://owl-server-pw2.herokuapp.com/reviews/" + reviewID;

      for (let i = 0; i < this.reviews.length; i++) {
        if (this.reviews[i]._id == reviewID) {
          reviewUpvotes = this.reviews[i].upVote;
          reviewDownvotes = this.reviews[i].downVote;

          for (let j = 0; j < this.reviews[i].upVote.length; j++) {
            if (this.reviews[i].upVote[j] == userID) {
              verify = false;
            }
          }
        }
        for (let k = 0; k < this.reviews[i].downVote.length; k++) {
          if (this.reviews[i].downVote[k] == userID) {
            checkUp = false;
          }
        }
      }

      if (verify == true) {
        for (let i = 0; i < this.reviews.length; i++) {
          if (this.reviews[i]._id == reviewID) {
            reviewUpvotes.push(this.loggedUser);

            axios
              .put(route, {
                upVote: reviewUpvotes
              })
              .then(res => {
                console.log(res);
              })
              .catch(error => {
                console.log(error);
              });

            if (checkUp == false) {
              for (let j = 0; j < reviewDownvotes.length; j++) {
                if (reviewDownvotes[j] == this.loggedUser) {
                  reviewDownvotes.splice(j, 1);

                  axios
                    .put(route, {
                      downVote: reviewDownvotes
                    })
                    .then(res => {
                      console.log(res);
                    })
                    .catch(error => {
                      console.log(error);
                    });
                }
              }
            }
          }
        }

        console.log(reviewUpvotes);
        console.log(reviewDownvotes);
        this.$store.dispatch("up_vote", [reviewID, userID, true, checkUp]);
      } else {
        for (let i = 0; i < this.reviews.length; i++) {
          for (let j = 0; j < reviewUpvotes.length; j++) {
            if (reviewUpvotes[j] == this.loggedUser) {
              reviewUpvotes.splice(j, 1);

              axios
                .put(route, {
                  upVote: reviewUpvotes
                })
                .then(res => {
                  console.log(res);
                })
                .catch(error => {
                  console.log(error);
                });
              console.log(reviewUpvotes);
              console.log(reviewDownvotes);
            }
          }
        }

        this.$store.dispatch("up_vote", [reviewID, userID, false, checkUp]);
      }
    },

    downVote(reviewID, userID, bookID) {
      let verify = true;
      let checkDown = true;
      let reviewUpvotes = [];
      let reviewDownvotes = [];
      let route = "https://owl-server-pw2.herokuapp.com/reviews/" + reviewID;

      for (let i = 0; i < this.reviews.length; i++) {
        if (this.reviews[i]._id == reviewID) {
          reviewUpvotes = this.reviews[i].upVote;
          reviewDownvotes = this.reviews[i].downVote;
          for (let j = 0; j < this.reviews[i].downVote.length; j++) {
            if (this.reviews[i].downVote[j] == userID) {
              verify = false;
            }
          }
        }
        for (let k = 0; k < this.reviews[i].upVote.length; k++) {
          if (this.reviews[i].upVote[k] == userID) {
            checkDown = false;
          }
        }
      }

      if (verify == true) {
        for (let i = 0; i < this.reviews.length; i++) {
          if (this.reviews[i]._id == reviewID) {
            reviewDownvotes.push(this.loggedUser);
            axios
              .put(route, {
                downVote: reviewDownvotes
              })
              .then(res => {
                console.log(res);
              })
              .catch(error => {
                console.log(error);
              });

            if (checkDown == false) {
              for (let j = 0; j < reviewUpvotes.length; j++) {
                if (reviewUpvotes[j] == this.loggedUser) {
                  reviewUpvotes.splice(j, 1);
                  axios
                    .put(route, {
                      upVote: reviewUpvotes
                    })
                    .then(res => {
                      console.log(res);
                    })
                    .catch(error => {
                      console.log(error);
                    });
                }
              }
            }
          }
        }
        console.log(reviewUpvotes);
        console.log(reviewDownvotes);
        this.$store.dispatch("down_vote", [reviewID, userID, true, checkDown]);
      } else {
        for (let j = 0; j < reviewDownvotes.length; j++) {
          if (reviewDownvotes[j] == this.loggedUser) {
            reviewDownvotes.splice(j, 1);
            axios
              .put(route, {
                downVote: reviewDownvotes
              })
              .then(res => {
                console.log(res);
              })
              .catch(error => {
                console.log(error);
              });
          }
        }
        console.log(reviewUpvotes);
        console.log(reviewDownvotes);
        this.$store.dispatch("down_vote", [reviewID, userID, false, checkDown]);
      }
    },

    getInfoFromUser(userID) {
      let a = true;
      let all = 0;
      for (let i = 0; i < this.users.length; i++) {
        if (this.users[i]._id == userID && a == true) {
          all = this.users[i];
          a = false;
        }
      }
      return all;
    },

    checkRequesition(bookID, userID) {
      console.log(userID);
      console.log("^teste");
      this.bookReq = false;
      if (userID != -1) {
        for (let i = 0; i < this.requisitions.length; i++) {
          if (
            this.requisitions[i].bookId == bookID &&
            this.requisitions[i].userId == userID &&
            this.requisitions[i].active == true
          ) {
            this.buttonText = "Entregar";
            this.bookReq = true;
            this.buttonActive = true;
            this.bookDeliver = true;
          } else if (this.book.availability == false) {
            this.buttonText = "Não disponivel";
            //show button sino
            //<i class="fas fa-bell"></i>
            this.bookReq = true;
            this.buttonActive = false;
          }
        }
        if (this.bookReq == false) {
          this.buttonText = "Requisitar";
        }
      } else {
        //Remeter para criar conta ou registar ou erro
        console.log("Offline user");
      }
    },

    requesition(bookID, userID) {
      //Check book id and user id on requesitions (on load) (change button name to requesitado)
      //Requesitions generates a id, saves book id and user id, current date, devliverydate and book status

      if (userID == -1) {
        this.$router.push("login"); //Não tem conta, precisa de fazer login
      } else if (this.bookReq == false) {
        //Devia ser true
        let currentDate = new Date();
        //Requisitar

        let req = {
          //requisitionId: this.$store.getters.getLastIdReq,
          bookId: bookID,
          userId: userID,
          requisitionDate:
            currentDate.getDate() +
            "/" +
            (currentDate.getMonth() + 1) +
            "/" +
            currentDate.getFullYear() +
            " " +
            currentDate.getHours() +
            ":" +
            currentDate.getMinutes(),
          deliveryDate: "",
          deliveryBookStatus: this.book.bookStatus,
          active: true
        };
        let reqs = [req, bookID];
        console.table(this.requisitions);
        axios
          .post("https://owl-server-pw2.herokuapp.com/requisitions", req)
          .then(res => {
            console.log("entrou");
            console.log(res);
            this.requisitions.push(req);
            this.checkRequesition(this.clickedBook, this.loggedUser);
          })
          .catch(error => {
            console.log(error);
          });
        //this.$store.dispatch("add_req", reqs);
        console.table(this.requisitions);
        swal({
          type: "success",
          title: "Livro requisitado com sucesso."
        });
        console.log(req);
      } else {
        for (let i = 0; i < this.requisitions.length; i++) {
          if (
            this.requisitions[i].bookId == bookID &&
            this.requisitions[i].userId == userID &&
            this.requisitions[i].active == true
          ) {
            /*if(this.requisitions.deliveryDate < currDate){
               let del = [i,this.loggedUser,-100] //Saber a posição e pontos para o user
              this.$store.dispatch("delivery_book", del);
             }
             else
             {*/
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
            console.log("antes de entregar : " + this.requisitions[i]._id);
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
            //}

            console.table(this.users);
            console.table(this.requisitions);
            console.table(this.books);
          }
        }
      }
    }
  },
  components: {
    Header,
    Footer
  },
  computed: {},
  beforeMount() {
    let route = "https://owl-server-pw2.herokuapp.com/books?id=" + this.$route.params.id;
    let reviewRoute =
      "https://owl-server-pw2.herokuapp.com/reviews?bookId=" + this.$route.params.id;

    let requistionRoute =
      "https://owl-server-pw2.herokuapp.com/requisitions?userId=" + this.userLoggedIn;
    //Axios mongodb
    axios
      .get(route)
      .then(res => {
        console.log(res.data);
        this.book = res.data;
        console.log(this.book);
      })
      .catch(error => {
        console.log(error);
      });

    axios
      .get(reviewRoute)
      .then(res => {
        console.log(res.data);
        this.reviews = res.data;
        console.log("reviews:");
        console.log(this.reviews);
        this.bookRating = this.calculateRating();
      })
      .catch(error => {
        console.log(error);
      });

    axios
      .get("https://owl-server-pw2.herokuapp.com/users")
      .then(res => {
        console.log("teste");
        console.log(res.data);
        this.users = res.data;
        console.log("users:");
        console.log(this.users);

        //checks if user already commented
        for (let i = 0; i < this.reviews.length; i++) {
          if (
            this.reviews[i].bookId == this.clickedBook &&
            this.reviews[i].userId == this.loggedUser
          ) {
            console.log("already review");
            this.reviewCheck = 1;
          }
        }
      })
      .catch(error => {
        console.log(error);
      });

    axios
      .get(requistionRoute)
      .then(res => {
        console.log("reqs:");
        console.log(res.data);
        this.requisitions = res.data;
        this.checkRequesition(this.clickedBook, this.loggedUser);
      })
      .catch(error => {
        console.log(error);
      });

    this.loggedUser = localStorage.getItem("userLoggedIn");
    this.clickedBook = this.$route.params.id;
    //this.requisitions = this.$store.getters.requisitions;
    this.books = this.$store.getters.books;
    this.pageBookId = this.$route.params.id;
    //this.users = this.$store.getters.users;
    //this.reviews = this.$store.getters.reviews;

    console.log(this.requisitions.length);
    console.log(this.requisitions);
    this.checkRequesition(this.clickedBook, this.loggedUser);
  }
};
</script>
