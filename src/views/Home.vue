<template>
  <div class="home">
    <Header/>

    <header id="home" v-if="userLoggedIn == -1">
      <div class="row marginSides" style="height:600px;">
        <div id="showMobile" class="col-12">
          <img
            src="https://cdn.discordapp.com/attachments/373524098954821632/578234339976937492/books.png"
            style=" padding-top:30px"
            id="mobileSize"
          >
        </div>
        <div class="col-12" id="showMobile">
          <h2>Descubra o que o Owl tem para si!</h2>
          <p>Owl fornece uma vasta libraria, veja o nosso catálogo!</p>
          <div>
            <router-link :to="{name: 'catalog'}">
              <button class="btn btn-owl">Ver catálogo</button>
            </router-link>
          </div>
        </div>
        <div class="col-12 col-md-6" style="padding-top: 200px;" id="showPC">
          <h2>Descubra o que o Owl tem para si!</h2>
          <p>Owl fornece uma vasta libraria, veja o nosso catálogo!</p>
          <div>
            <router-link :to="{name: 'catalog'}">
              <button class="btn btn-owl">Ver catálogo</button>
            </router-link>
          </div>
        </div>
        <div class="col-6" id="showPC">
          <img
            src="https://cdn.discordapp.com/attachments/373524098954821632/578234339976937492/books.png"
            style=" padding-top:30px"
          >
        </div>
      </div>
    </header>

    <div class="marginSides mt-4" v-if="userLoggedIn != -1">
      <div class="col-12">
        <div class="boxTitle">
          <h3 id="title">Recomendados</h3>
        </div>
        <div class="boxContent" id="margin">
          <div v-if="recommended.length == 0">
            <br>
            <h4>Não existem livros recomendados.</h4>
            <br>
          </div>

          <div class="row">
            <div
              class="col-12 col-sm-6 col-xl-3 col-lg-4"
              v-for="book in recommended.slice(0,4)"
              :key="book.bookId"
            >
              <router-link
                v-on:mouseover.native="clickBook(book._id)"
                @click.native="addView(book.bookId)"
                :to="{ name: 'book', params:{id: book._id}}"
              >
                <img class="owlCoversTop mt-4 mb-4" v-bind:src="book.cover">
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="margin5 mt-4">
      <div class="col-12">
        <div class="boxTitle">
          <h3 id="title">Mais Populares</h3>
        </div>
        <div class="boxContent" id="margin">
          <div class="row">
            <div
              class="col-12 col-sm-6 col-xl-3 col-lg-4"
              v-for="book in mostViews.slice(0,4)"
              :key="book.bookId"
            >
              <router-link
                v-on:mouseover.native="clickBook(book._id)"
                @click.native="addView(book.bookId)"
                :to="{ name: 'book', params:{id: book._id}}"
              >
                <img class="owlCoversTop mt-4 mb-4" v-bind:src="book.cover">
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </div>

    <Footer/>
  </div>
</template>
<style scoped>
#topBooks {
  background-color: #d9b97e;

  color: #592316;
  height: 552px;
}

.owlCoversTop {
  height: 250px;
  width: 190px;
  box-sizing: border-box;
  border: 3px solid white;
  border-radius: 5px;
}

.top {
  position: relative;
  height: 30px;
  width: 10px;
  bottom: 30px;
  right: 5px;
  background-color: #bf6e26;
  color: white;
  padding-left: 20px;
  padding-right: 20px;
}

#recBar {
  background-color: #ffffff !important;
  height: 50px;
  padding-top: 10px;
  text-align: left;
}

.owlBigCovers {
  height: 300px;
  width: 225px;
  box-sizing: border-box;
  border: 3px solid white;
  border-radius: 5px;
}

#landingBar {
  background-color: #d9b97e !important;
  height: 50px;
  color: white;
  padding-top: 10px;
  text-align: left;
}

#owlTitle {
  padding-left: 15px;
  font-size: 45px;
}
#recommended {
  padding-left: 15px;
  font-size: 45px;
  color: #1f1f1f;
}

.marginSides {
  margin-left: 5%;
  margin-right: 5%;
}

.marginBot {
  margin-bottom: 5%;
}

/*.header {
   The image used 
  background-image: url(https://i.imgur.com/jgBjRVJ.png);
  height: 45%;

  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
}*/

.btn-owl {
  border: none;
  padding: 15px 32px;
  text-align: center;
  text-decoration: none;
  font-size: 24px;
  background-color: #bf6e26;
  position: relative;
  top: 5px;
  color: white;
  font-family: "Libre Franklin", sans-serif;
  margin: 0 auto;
}

#mobileSize {
  height: 350px;
  width: 350px;
}

@media screen and (max-width: 1350px) {
  #showPC {
    display: none;
  }
}

@media screen and (min-width: 1350px) {
  #showMobile {
    display: none;
  }
}

@media screen and (max-width: 400px) {
  #mobileSize {
    height: 275px;
    width: 275px;
  }
}
</style>

<script>
// @ is an alias to /src
import Header from "@/components/Header.vue";
import Footer from "@/components/Footer.vue";
import axios from "axios";
//import Mainbar from '@/components/Mainbar.vue'
export default {
  name: "home",
  components: {
    Header,
    Footer
    //Mainbar
  },
  data: function() {
    return {
      userLoggedIn: localStorage.getItem("userLoggedIn"),
      users: [],
      books: [],
      recommended: [],
      mostViews: [],
      userTags: [],
      clickedBook: 0
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
            this.userTags = this.users[i].favTags;
          }
        }
        console.log(this.userTags);
      })
      .catch(error => {
        console.log(error);
      });

    axios
      .get("https://owl-server-pw2.herokuapp.com/books")
      .then(res => {
        this.books = res.data;
        this.mostViews = this.books.sort(function orderByViews(a, b) {
          if (a.nViews > b.nViews) return -1;
          if (a.nViews < b.nViews) return 1;
          else return 0;
        });

        for (let i = 0; i < this.books.length; i++) {
          for (let j = 0; j < this.books[i].idTag.length; j++) {
            for (let z = 0; z < this.userTags.length; z++) {
              if (this.recommended.length >= 4) {
                break;
              }

              if (this.books[i].idTag[j] == this.userTags[z]) {
                this.recommended.push(this.books[i]);

                if (this.recommended[i] == this.recommended[i + 1]) {
                  this.recommended.splice(i + 1, 1);
                }
              }
            }
          }
        }

        //this.mostViews.splice(4,this.mostViews.length-1)

        console.log(this.mostViews);
        console.log(this.books);
      })
      .catch(error => {
        console.log(error);
      });

    console.log("userLoggedIn: " + this.userLoggedIn);

    //this.userTags = this.users[this.userLoggedIn].favTags;
  },
  methods: {
    getTop2() {
      this.top2 = this.books2.sort(function orderByViews(a, b) {
        if (a.nViews > b.nViews) return -1;
        if (a.nViews < b.nViews) return 1;
        else return 0;
      });
    },

    clickBook(index) {
      for (let i = 0; i < this.books.length; i++) {
        if (this.books[i].bookId === index) {
          this.$store.dispatch("open_book", i);
          this.clickedBook = i;
        }
      }
    },
    addView(id) {
      console.log("entrou");
      for (let i = 0; i < this.books.length; i++) {
        if (this.books[i].bookId === id) {
          this.$store.dispatch("add_view", i);
          console.log("oi");
        }
      }
    }
  }
};
</script>
