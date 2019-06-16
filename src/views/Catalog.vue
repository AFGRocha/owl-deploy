<template>
  <div class="home">
    <Header/>
    <div class="margin5 mt-4">
      <div class="row">
        <div class="col-12 col-lg-3 col-md-12">
          <div class="boxTitle">
            <div class="row">
              <div class="col-2">
                <h3 id="filterTitle">Filtros</h3>
              </div>
              <div class="ml-auto mr-4 mt-1">
                <a v-b-toggle.collapse-1 v-if="windowWidth <= 990" id="collapse">
                  <i class="fas fa-chevron-down fa-lg"></i>
                </a>
              </div>
            </div>
          </div>
          <b-collapse visible id="collapse-1">
            <div class="boxContent alignLeft" id="margin">
              <label for="filterName">Por Titulo:</label>
              <input type="text" class="form-control" v-model="titleFilter">
              <label for="filterAuthors" class="mt-2">Por Autor:</label>
              <select class="form-control" id="filterAuthors" v-model="authorFilter">
                <option>Todos</option>
                <option v-for="(author, index) in authors" :key="index">{{author}}</option>
              </select>

              <label for="filterPublisher" class="mt-2">Por Editora:</label>
              <select class="form-control" id="filterPublisher" v-model="publisherFilter">
                <option>Todos</option>
                <option v-for="(publisher, index) in publishers" :key="index">{{publisher}}</option>
              </select>

              <label for="filterTag" class="mt-2">Por Tag:</label>
              <select class="form-control" id="filterTag" v-model="tagFilter">
                <option>Todos</option>
                <option v-for="(tag, index) in tags" :key="index">{{tag.tagDescription}}</option>
              </select>
              <br>
              <button
                class="btn btn-lg btn-block buttonColor"
                id="btnLogin"
                @click="filterBooks"
              >Filtrar</button>
            </div>
          </b-collapse>
        </div>
        <div class="col-12 col-lg-9 mt-4 mt-lg-0">
          <div class="boxTitle">
            <div class="row">
              <div class="col-2">
                <h3 id="catalogTitle">Catalogo</h3>
              </div>
              <div class="ml-auto" id="ordenarPC">
                <form class="form-inline">
                  <label>Ordenar por:</label>
                  <select v-on:change="sortBooks" v-model="orderTab" class="form-control ml-2 mr-4">
                    <option>Mais Populares</option>
                    <option>Menos Populares</option>
                    <option>Alfabetico (Por Titulo)</option>
                    <option>Alfabetico (Por Autor)</option>
                  </select>
                </form>
              </div>
            </div>
          </div>
          <div class="boxContent" id="margin">
            <div class="ml-auto" id="ordenarMobile">
              <form class="form-inline">
                <label>Ordenar por:</label>
                <select v-on:change="sortBooks" v-model="orderTab" class="form-control ml-2 mr-4">
                  <option>Mais Populares</option>
                  <option>Menos Populares</option>
                  <option>Alfabetico (Por Titulo)</option>
                  <option>Alfabetico (Por Autor)</option>
                </select>
              </form>
            </div>
            <div class="row">
              <div class="col-6 col-sm-4 col-xl-3" v-for="book in filteredBooks" :key="book.bookId">
                <router-link
                  v-on:mouseover.native="clickBook(book._id)"
                  @click.native="addView(book.bookId)"
                  :to="{ name: 'book', params:{id: book._id}}"
                >
                  <img class="owlCovers mt-3" v-bind:src="book.cover">
                </router-link>
                <h6 class="mt-2">{{book.title}}</h6>
                <h6>{{book.author}}</h6>
                <p v-if="book.availability == true">Disponivel</p>
                <p v-else>Indisponivel</p>
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
#filterBar {
  background-color: #bf6e26 !important;
  height: 50px;
  color: white;
  padding-top: 8px;
  text-align: left;
}
#filterContents {
  background-color: #d9b97e;
  height: 330px;
  text-align: left;
  color: #592316;
}
#catalogBar {
  background-color: #bf6e26 !important;
  height: 50px;
  color: white;
  padding-top: 8px;
  text-align: left;
}
#catalogContents {
  background-color: #d9b97e;

  color: #592316;
}

#catalogTitle {
  padding-left: 15px;
}

#filterTitle {
  padding-left: 15px;
}

#catalogOrder {
  padding-left: 460px;
}

#margin {
  padding: 15px 15px 15px 15px;
  /* box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19); */
}

.box {
  margin-left: 5%;
  margin-right: 5%;
  margin-top: 5%;
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

#collapse {
  /* background-color: #bf6e26 !important; */
  color: white
}

@media screen and (max-width: 576px) {
  #ordenarPC {
    display: none;
  }
}

@media screen and (min-width: 576px) {
  #ordenarMobile {
    display: none;
  }
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
      books: [],
      tags: [],
      publishers: [],
      authors: [],
      titleFilter: "",
      filteredBooks: [],
      authorFilter: "Todos",
      publisherFilter: "Todos",
      tagFilter: "Todos",
      clickedBook: 0,
      orderTab: "",
      windowWidth: 0,
      window: null
    };
  },
  created() {
    window.addEventListener("resize", this.handleResize)
    this.handleResize()
    //Axios mongodb books
    axios
      .get("https://owl-server-pw2.herokuapp.com/books")
      .then(res => {
        this.books = res.data;
        this.filteredBooks = res.data;
        

        for (let i = 0; i < this.books.length; i++) {
          if (this.authors.indexOf(this.books[i].author) == -1) {
            this.authors.push(this.books[i].author);
          }
        }

        for (let i = 0; i < this.books.length; i++) {
          if (this.publishers.indexOf(this.books[i].publisher) == -1) {
            this.publishers.push(this.books[i].publisher);
          }
        }
      })
      .catch(error => {
        console.log(error);
      });

    //Axios mongodb tags
    axios
      .get("https://owl-server-pw2.herokuapp.com/tags")
      .then(res => {
        this.tags = res.data;
        
      })
      .catch(error => {
        console.log(error);
      });
  },
  methods: {
    clickBook(index) {
      this.$store.dispatch("open_book", index);
      this.clickedBook = index;
      /*for (let i = 0; i < this.books.length; i++) {
        if (this.books[i].bookId === index) {
          this.$store.dispatch("open_book", i);
          this.clickedBook = i;
        }
      }*/
    },

    addView(id) {
      console.log("entrou");
      for (let i = 0; i < this.books.length; i++) {
        if (this.books[i].bookId === id) {
          this.$store.dispatch("add_view", i);
          console.log("oi");
        }
      }
    },

    sortBooks() {
      //Ordenar alfabeticamente
      if (this.orderTab == "Alfabetico (Por Titulo)") {
        this.filteredBooks.sort(function(a, b) {
          if (a.title < b.title) {
            return -1;
          }
          if (a.title > b.title) {
            return 1;
          }
          return 0;
        });
      }

      //Ordenar por autor
      if (this.orderTab == "Alfabetico (Por Autor)") {
        this.filteredBooks.sort(function(a, b) {
          if (a.author < b.author) {
            return -1;
          }
          if (a.author > b.author) {
            return 1;
          }
          return 0;
        });
      }

      if (this.orderTab == "Mais Populares") {
        this.filteredBooks.sort(function(a, b) {
          if (a.nViews > b.nViews) {
            return -1;
          }
          if (a.nViews < b.nViews) {
            return 1;
          }
          return 0;
        });
      }

      if (this.orderTab == "Menos Populares") {
        this.filteredBooks.sort(function(a, b) {
          if (a.nViews < b.nViews) {
            return -1;
          }
          if (a.nViews > b.nViews) {
            return 1;
          }
          return 0;
        });
      }
    },

    filterBooks() {
      console.log(this.filteredBooks);
      this.filteredBooks = [];
      let filterBookResult = false;
      let temp = [];
      let temp2 = [];

      for (let i = 0; i < this.books.length; i++) {
        let upperTitle = this.books[i].title.toUpperCase();
        let upperFilter = this.titleFilter.toUpperCase();
        console.log();
        filterBookResult = upperTitle.includes(upperFilter);
        if (filterBookResult) {
          temp2.push(this.books[i]);
        }
      }
      this.filteredBooks = temp2;
      console.log("depois:");
      console.log(this.filteredBooks);

      /* this.filteredBooks = this.books.filter(book => {
        let filterBookResult = true;
        if (this.titleFilter !== "") {
          filterBookResult = book.title.includes(this.titleFilter);
        }
        console.log(filterBookResult)
        if(filterBookResult)
      });*/

      this.filteredBooks = this.filteredBooks.filter(
        book =>
          book.author === this.authorFilter || this.authorFilter == "Todos"
      );
      this.filteredBooks = this.filteredBooks.filter(
        book =>
          book.publisher === this.publisherFilter ||
          this.publisherFilter == "Todos"
      );

      //tag filter
      if (this.tagFilter != "Todos") {
        for (let i = 0; i < this.filteredBooks.length; i++) {
          for (let j = 0; j < this.filteredBooks[i].idTag.length; j++) {
            for (let z = 0; z < this.tags.length; z++) {
              if (this.filteredBooks[i].idTag[j] == this.tags[z]._id) {
                if (this.tags[z].tagDescription == this.tagFilter) {
                  temp.push(this.filteredBooks[i]);
                }
              }
            }
          }
        }

        this.filteredBooks = temp;
      }

      console.log(this.filteredBooks);
      console.log("searched title: " + this.titleFilter);
    },

    handleResize() {
      this.windowWidth = window.innerWidth
    }
  },
  computed: {}
};
</script>