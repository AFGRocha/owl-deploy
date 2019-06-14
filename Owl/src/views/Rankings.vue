<template>
  <div class="home">
    <Header/>

    <div class="margin5 mt-4">
      <div class="row">
        <div class="col-12 col-lg-6">
          <div class="boxTitle">
            <h3 id="title">Rank de Utilizadores</h3>
          </div>
          <div class="boxContent alignLeft" id="margin">
            <div class="row">
              <div class="col-2">
                <h4>#</h4>
              </div>
              <div class="col-7">
                <h4>Nome</h4>
              </div>
              <div class="col-3">
                <h4>Pontos</h4>
              </div>
            </div>
            <div class="mt-2">
              <div v-for="(users,i) in filtredUsers" :key="users.userId">
                <div class="row">
                  <div class="col-2">
                    <p>{{i+1}}</p>
                  </div>
                  <div class="col-1">
                    <i class="fas fa-trophy" style="color:gold" v-if="i+1==1"></i>
                    <i class="fas fa-trophy" style="color:silver" v-if="i+1==2"></i>
                    <i class="fas fa-trophy" style="color:bronze" v-if="i+1==3"></i>
                  </div>
                  <div class="col-6">
                    <p style="text-align: left">{{users.firstName}} {{users.lastName}}</p>
                  </div>
                  <div class="col-3">
                    <p>{{users.points}}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="col-12 col-lg-6 mt-4 mt-lg-0">
          <div class="boxTitle">
            <h3 id="title">Rank de Livros</h3>
          </div>
          <div class="boxContent alignLeft" id="margin">
            <div class="row">
              <div class="col-2">
                <h4>#</h4>
              </div>
              <div class="col-7">
                <h4>Livro</h4>
              </div>
              <div class="col-3">
                <h4>Views</h4>
              </div>
            </div>
            <div class="mt-2">
              <div v-for="(book, i) in filtredBooks" :key="book.bookId">
                <div class="row">
                  <div class="col-2">
                    <p>{{i+1}}</p>
                  </div>
                  <div class="col-1">
                    <i class="fas fa-trophy" style="color:gold" v-if="i+1==1"></i>
                    <i class="fas fa-trophy" style="color:silver" v-if="i+1==2"></i>
                    <i class="fas fa-trophy" style="color:DarkGoldenRod" v-if="i+1==3"></i>
                  </div>
                  <div class="col-6">
                    <p style="text-align: left">{{book.firstName}} {{book.title}}</p>
                  </div>
                  <div class="col-3">
                    <p>{{book.nViews}}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <Footer/>
  </div>
</template>

<style scoped>
#title {
  padding-left: 15px;
}

#margin {
  padding: 15px 15px 15px 15px;
  text-align: center;
}
</style>

<script>
import Header from "@/components/Header.vue";
import Footer from "@/components/Footer.vue";
import axios from "axios";
export default {
  components: {
    Header,
    Footer
  },
  data: function() {
    return {
      requisitions: [],
      books: [],
      users: [],
      reviews: [],
      filtredUsers: [],
      filtredBooks: [],
      count: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
    };
  },
  methods: {
    bookRank() {
      const top = this.books.sort(function orderByViews(a, b) {
        if (a.nViews > b.nViews) return -1;
        if (a.nViews < b.nViews) return 1;
        else return 0;
      });

      return top.slice(0, 10);
    },

    userRank() {
      const top = this.users.sort(function orderByPoints(a, b) {
        if (a.points > b.points) return -1;
        if (a.points < b.points) return 1;
        else return 0;
      });

      return top.slice(0, 10);
    }
  },
  computed: {},
  beforeMount() {
    this.requisitions = this.$store.getters.requisitions;
    //this.books = this.$store.getters.books;

    //Axios mongodb books
    axios
      .get("http://localhost:3000/books")
      .then(res => {
        this.books = res.data;
        console.log("books:");
        console.log(this.books);
        this.filtredBooks = this.bookRank();  
      })
      .catch(error => {
        console.log(error);
      });

    //this.users = this.$store.getters.users;
       axios
      .get("http://localhost:3000/users")
      .then(res => {
        this.users = res.data;
        console.log("users:");
        console.log(this.users);
        this.filtredUsers = this.userRank(); 
      })
      .catch(error => {
        console.log(error);
      });

    this.reviews = this.$store.getters.reviews;
    
  }
};
</script>
