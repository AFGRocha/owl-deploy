<template>
  <div>
    <nav class="navbar navbar-light bg-light alignLeft" id="navbar1">
      <router-link :to="{name: 'home'}">
        <img src="../assets/logo.png" class="navbar-brand" alt id="logo">
      </router-link>
      <ul class="navbar-nav ml-auto">
        <li class="nav-item">
          <router-link class="nav-link" :to="{name: 'profile'}" id="pc">
            <div v-if="userLoggedIn != -1" style="color:white">
              <i class="fas fa-user fa-2x mr-2"></i>
              <h4>{{userName}}</h4>
            </div>
          </router-link>
        </li>
      </ul>
      <router-link class="nav-link" :to="{name: 'users'}" id="pc">
        <i
          v-if="userLoggedIn != -1 && type == 'admin'"
          style="color:white"
          class="fas fa-cog fa-2x"
        ></i>
      </router-link>
    </nav>
    <nav class="navbar navbar-expand-lg navbar-light bg-light" id="navbarNav">
      <b-navbar-toggle target="nav-collapse" class="ml-auto" id="white"><i class="fas fa-bars"></i></b-navbar-toggle>
      <b-collapse id="nav-collapse" class="alignLeft" is-nav>
      <ul class="navbar-nav alignLeft">
        <li class="nav-item">
          <router-link class="nav-link a" :to="{name: 'home'}" color="white">Home</router-link>
        </li>
        <li class="nav-item">
          <router-link class="nav-link a" :to="{name: 'catalog'}">Catalogo</router-link>
        </li>
        <li class="nav-item">
          <router-link class="nav-link a" :to="{name: 'rankings'}">Rankings</router-link>
        </li>
        <li class="nav-item" v-if="userLoggedIn != -1">
          <router-link class="nav-link a" :to="{name: 'suggest'}">Sugerir Livro</router-link>
        </li>
        <li class="nav-item" v-if="userLoggedIn != -1">
          <router-link class="nav-link a" :to="{name:'achievements'}">Conquistas</router-link>
        </li>
        <li class="nav-item" v-if="userLoggedIn != -1">
          <router-link class="nav-link a" :to="{name:'profile'}" id="mobile">
            <i class="fas fa-user"></i>
            {{userName}}
          </router-link>
        </li>
        <li class="nav-item" v-if="userLoggedIn != -1 && type == 'admin'" id="mobile">
          <router-link class="nav-link a" :to="{name:'users'}">
            <i style="color:white" class="fas fa-cog"></i>
            Back Office
          </router-link>
        </li>
        <li class="nav-item">
          <router-link
            v-if="userLoggedIn == -1"
            class="nav-link a"
            id="right"
            :to="{name: 'login'}"
          >LogIn</router-link>
        </li>
        <li class="nav-item">
          <router-link v-if="userLoggedIn == -1" class="nav-link a" :to="{name: 'signup'}">SignUp</router-link>
        </li>
        <li class="nav-item">
          <a v-if="userLoggedIn != -1" href @click="logout" class="nav-link a">Logout</a>
        </li>
        <li class="nav-item" v-if="userLoggedIn != -1">
          <div class="dropdown">
            <a
              class="btn dropdown-toggle darkBrown a"
              
              id="dropdownMenuButton"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              <i class="fas fa-bell"></i>
            </a>
            <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
              <div class="ml-2 mr-2" v-for="(notification,i) in notifications" :key="i">
                <!-- Notifications here -->
                <h6>{{notification}}</h6>

                <div class="dropdown-divider"></div>
              </div>
            </div>
          </div>
        </li>
      </ul>
      </b-collapse>
    </nav>
  </div>
</template>

<style scoped>
#navbar1 {
  background-color: #bf6e26 !important;
  color: white !important;
  height: 100px;
}

h4 {
  display: inline;
}

#logo {
  width: 171px;
  height: 94px;
  padding-bottom: 10px;
}

#navbarNav {
  background-color: #592316 !important;
  color: white !important;
}

.a {
  color: white !important;
  padding-left: 25px !important;
}

@media screen and (max-width: 484px) {
  #pc {
    display: none;
  }
  #logo {
    width: 171px;
    height: 94px;
    margin-left: auto;
  }
}

@media screen and (min-width: 484px) {
  #mobile {
    display: none;
  }
}

/* #right {
    padding-left: 1350px !important;
} */
</style>


<script>
import axios from "axios";

export default {
  data: function() {
    return {
      userLoggedIn: localStorage.getItem("userLoggedIn"),
      users: [],
      userName: "",
      type: "",
      notifications: [],
      reviews: [],
      requisitions: [],
      books: []
    };
  },

  created() {

    axios
      .get("https://owl-server-pw2.herokuapp.com/users")
      .then(res => {
        this.users = res.data;
        this.getUser()
      })
      .catch(error => {
        console.log(error);
      });

    axios
      .get("https://owl-server-pw2.herokuapp.com/books")
      .then(res => {
        this.books = res.data;
      })
      .catch(error => {
        console.log(error);
      });


    if (this.userLoggedIn != -1) {
      axios
      .get("https://owl-server-pw2.herokuapp.com/requisitions?userId=" + this.userLoggedIn)
      .then(res => {
        this.requisitions = res.data;

        this.requisitions.forEach(req => {
       
        if (this.userLoggedIn == req.userId && req.active == true) {
          let date1 = new Date(req.requisitionDate).getDate();
          let today = new Date().getDate();
         
          if (date1 + 5 < today) {
            //How late
            let bookName = "";
            let nDays = today - date1 - 5;

            this.books.forEach(book => {
              if (req.bookId == book._id) {
                bookName = book.title;
              }
            });

            this.notifications.push(
              `A sua entrega do livro ${bookName} está em atraso ${nDays} dias.`
            );
          } else if (date1 + 2 >= today && date1 + 1 <= today) {
            //How many days do deliver

            let bookName = "";
            let nDays = date1 + 3 - today;

            this.books.forEach(book => {
              if (req.bookId == book._id) {
                bookName = book.title;
              }
            });

            this.notifications.push(
              `Faltam ${nDays} dias para acabar o tempo da requisição do livro ${bookName}.`
            );
            console.log(this.notifications);
          }
        }
      });
      })
      .catch(error => {
        console.log(error);
      });
    }
    

    axios
      .get("https://owl-server-pw2.herokuapp.com/reviews")
      .then(res => {
        this.reviews = res.data;

        this.reviews.forEach(rev => {
        if (this.userLoggedIn == rev.userId) {
          let notf = "";
          let personName = "";
          let bookName = "";

          this.reviews.forEach(rev2 => {
            if (rev.bookId == rev2.bookId && rev2.userId != this.userLoggedIn) {
              this.books.forEach(book => {
                if (rev.bookId == book._id) {
                  bookName = book.title;
                }
              });

              this.users.forEach(user => {
                if (rev2.userId == user._id) {
                  console.log("Hey");
                  personName = user.firstName;
                }
              });

              notf = `${personName} tambem fez uma review ao livro ${bookName}.`;
            }
          });
          if (notf) {
            this.notifications.push(notf);
          }
           console.log(this.notifications);
        }
      });
      })
      .catch(error => {
        console.log(error);
      }); 

    


    //this.getNotifications();
    
    
  },
  methods: {
    getNotifications() {
      /* console.log("oi")
      this.requisitions.forEach(req => {
       
        if (this.userLoggedIn == req.userId && req.active == true) {
          let date1 = new Date(req.requisitionDate).getDate();
          let today = new Date().getDate();
          
          if (date1 + 5 < today) {
            //How late
            let bookName = "";
            let nDays = today - date1 - 5;

            this.books.forEach(book => {
              if (req.bookId == book._id) {
                bookName = book.title;
              }
            });

            this.notifications.push(
              `A sua entrega do livro ${bookName} está em atraso ${nDays} dias.`
            );
          } else if (date1 + 2 >= today && date1 + 1 <= today) {
            //How many days do deliver

            let bookName = "";
            let nDays = date1 + 3 - today;

            this.books.forEach(book => {
              if (req.bookId == book._id) {
                bookName = book.title;
              }
            });

            this.notifications.push(
              `Faltam ${nDays} dias para acabar o tempo da requisição do livro ${bookName}.`
            );
            console.log(this.notifications);
          }
        }
      });

      this.reviews.forEach(rev => {
        if (this.userLoggedIn == rev.userId) {
          let notf = "";
          let personName = "";
          let bookName = "";

          this.reviews.forEach(rev2 => {
            if (rev.bookId == rev2.bookId && rev2.userId != this.userLoggedIn) {
              this.books.forEach(book => {
                if (rev.bookId == book._id) {
                  bookName = book.title;
                }
              });

              this.users.forEach(user => {
                if (rev2.userId == user._id) {
                  console.log("Hey");
                  personName = user.firstName;
                }
              });

              notf = `${personName} tambem fez uma review ao livro ${bookName}.`;
            }
          });
          if (notf) {
            this.notifications.push(notf);
          }
        }
      }) */
    },

    logout() {
      localStorage.setItem("userLoggedIn", -1);
      //this.$router.push("/")
      //por sweetalert
    },

    getUser() {
      for (let i = 0; i < this.users.length; i++) {
        if (this.users[i]._id == this.userLoggedIn) {
          this.userName =
            this.users[i].firstName + " " + this.users[i].lastName[0] + ".";
          this.type = this.users[i].type;
        }
      }
    }
  },
  computed: {}
};
</script>
