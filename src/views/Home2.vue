<template>
  <div class="home">
    <Header/>

    <header id="home" v-if="userLoggedIn == -1">
      <div class="row" style="height:600px;">
        <div class="col-6 col-md-6 " style="padding-top: 200px;">
          <h1>Descubra o que o Owl tem para si!</h1>
          <p>Owl fornece uma vasta libraria, veja o nosso catálogo!</p> 
          <div>
            <router-link  :to="{name: 'catalog'}">
              <button class="btn btn-owl">Ver catálogo</button>
            </router-link>
          </div>
        </div>
        <div class="col-6">
          <img src="https://cdn.discordapp.com/attachments/373524098954821632/578234339976937492/books.png" style="padding-right: 100px; padding-top:30px"  alt="">
        </div>
      </div>
    </header>

    <div v-if="userLoggedIn != -1">
      <div class id="recBar">
        <h3 id="recommended">Recomendados</h3>
      </div>
      <div class id>
        <br>
        <div class="row">
          <div class="col-6 col-md-3" v-for="book in recommended.slice(0,4)" :key="book.bookId">
            <router-link
              v-on:mouseover.native="clickBook(book.bookId)"
              @click.native="addView(book.bookId)"
              :to="{ name: 'book', params:{id: clickedBook}}"
            >
              <img class="owlBigCovers mt-3" v-bind:src="book.cover">
            </router-link>
          </div>
        </div>
        
      </div>
    </div>

    <div class id="landingBar">
      <h3 id="owlTitle">Mais Populares</h3>
    </div>
    <div class id="catalogContents">
      <br>
      <div class="row">
        <div class="col-6 col-md-3" v-for="book in mostViews.slice(0,4)" :key="book.bookId">
          <router-link
            v-on:mouseover.native="clickBook(book.bookId)"
            @click.native="addView(book.bookId)"
            :to="{ name: 'book', params:{id: clickedBook}}"
          >
            <img class="owlBigCovers mt-3" v-bind:src="book.cover">
          </router-link>
        </div>
      </div>
      <br>
      <br>
      <br>
    </div>

    <Footer/>
  </div>
</template>
<style>
#topBooks {
  background-color: #d9b97e;

  color: #592316;
  height: 552px;
}

.owlCoversTop {
  height: 200px;
  width: 150px;
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
      users: this.$store.state.users,
      books: [],
      recommended: [],
      mostViews: [],
      userTags: [],
      clickedBook: 0
    };
  },
  created() {
    axios
      .get("http://localhost:3000/books")
      .then(res => {
        this.books = res.data;
        this.mostViews = this.books.sort(function orderByViews(a, b) {
          if (a.nViews > b.nViews) return -1;
          if (a.nViews < b.nViews) return 1;
          else return 0;
        });

        //this.mostViews.splice(4,this.mostViews.length-1)

        console.log(this.mostViews);
        console.log(this.books);
      })
      .catch(error => {
        console.log(error);
      });

    console.log("userLoggedIn: " + this.userLoggedIn);

    this.userTags = this.users[this.userLoggedIn].favTags;

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
