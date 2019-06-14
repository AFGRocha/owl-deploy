<template>
  <div class="home">
    <Header/>
    <div class="margin5 mt-4">
      <div class="row">
        <div class="col-12 col-md-12 boxTitle" id>
          <h3>Sugerir livro</h3>
        </div>
      </div>
      <div class="row">
        <div class="col-12 col-md-12 boxContent" id>
          <form action id="formSugestion">
            <label for="formTitle" class="mt-3">Titulo</label>
            <input type="text" class="form-control" id="formTitle" v-model="form.title" required>
            <label for="formCover" class="mt-3">Capa</label>
            <input type="text" class="form-control" id="formCover" v-model="form.cover">
            <label for="formAuthor" class="mt-3">Autor</label>
            <input type="text" class="form-control" id="formAuthor" v-model="form.author">
            <button
              type="button"
              id="btnSubmit"
              @click="addSuggestion"
              class="btn btn-lg mt-3 mb-3"
            >Submeter</button>
          </form>
        </div>
      </div>
    </div>
    <Footer/>
  </div>
</template>

<style scoped>
#formSugestion {
  text-align: left;
}

.form-control {
  position: relative;
  box-sizing: border-box;
  height: auto;
  padding: 10px;
  font-size: 16px;
}

#btnSubmit {
  background-color: #592316;
  color: white;
}

#btnSubmit:hover {
  opacity: 0.9;
}
</style>


<script>
import Header from "@/components/Header.vue";
import swal from "sweetalert2";
import Footer from "@/components/Footer.vue";
import axios from "axios";

export default {
  components: {
    Header,
    Footer
  },
  data: function() {
    return {
      userLoggedIn: localStorage.getItem("userLoggedIn"),
      form: {
        title: "Foi Sem Querer Que Te Quis",
        cover:
          "https://img.wook.pt/images/programacao-em-python-ernesto-costa/MXwxNzA0MzMzNXwxMjY2NzI1MnwxNDQ4MjM2ODAwMDAw/502x",
        author: "Ernesto Costa"
      },
      bookSuggestions: []
    };
  },

  created() {
    axios
      .get("http://localhost:3000/bookSuggestions")
      .then(res => {
        console.log(res.data);
        this.bookSuggestions = res.data;
        console.log(this.bookSuggestions);
      })
      .catch(error => {
        console.log(error);
      });
  },

  methods: {
    addSuggestion() {
      let suggestionExists = false;
      for (let i = 0; i < this.bookSuggestions.length; i++) {
        if (this.bookSuggestions[i].suggestionTitle == this.form.title) {
          suggestionExists = true;
          let route = "http://localhost:3000/bookSuggestions/" + this.bookSuggestions[i]._id
          axios
            .put(route)
            .then(res => {
              swal({
                type: "success",
                title: "Livro sugerido com sucesso."
              });
            })
            .catch(error => {
              console.log(error);
            });

          /*this.$store.dispatch(
            "add_suggestion_number",
            this.bookSuggestions[i].suggestionId
          );*/

          document.getElementById("formSugestion").reset();
        }
      }
      console.log(suggestionExists);
      if (suggestionExists == false) {
        console.log("entrou");

        axios
          .post("http://localhost:3000/bookSuggestions", {
            suggestionTitle: this.form.title,
            suggestionAuthor: this.form.author,
            suggestionCover: this.form.cover,
            userId: this.userLoggedIn,
            suggestionDate: new Date().toLocaleString(),
            suggestNumber: 1
          })
          .then(res => {
            console.log(res);
            console.log("posted");
            swal({
              type: "success",
              title: "Livro sugerido com sucesso."
            });
          })
          .catch(error => {
            console.log(error);
          });
        /*this.$store.dispatch("add_suggestion", {
          suggestionId: this.$store.getters.getLastIdSuggestions,
          suggestionTitle: this.form.title,
          suggestionAuthor: this.form.author,
          suggestionCover: this.form.cover,
          userId: this.userLoggedIn,
          suggestionDate: new Date().toLocaleString(),
          suggestNumber: 1
        });*/
        document.getElementById("formSugestion").reset();
      } else {
      }
    }
  }
};
</script>
