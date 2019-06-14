<template>
  <div class="Achievements">
    <Header/>

    <div class="margin5 mt-4">
      <!--Header row-->
      <div class="row">
        <div class="col-12 col-md-12 boxTitle">
          <h3>Conquistas {{achComplete.length}}/{{achievements.type1.length}}</h3>
        </div>
      </div>

      <div class="row">
        <div class="col-12 col-md-12 boxContent">
          <!-- Show Points -->
          <div class="row">
            <div
              class="col-12 col-sm-6 col-lg-4 mt-3 mb-3 pl-5 pr-5"
              v-for="(achievement,i) in achievements.type1"
              :key="achievement"
            >
              <div class="row" style="background-color:white">
                <div class="col-3">
                  <i
                    class="fas fa-star-half-alt mt-4 pb-3"
                    style="font-size:60px"
                    v-bind:style="{ color: getTheRightAch(i)[0]}"
                  ></i>
                </div>
                <div class="col-8">
                  <h4 class="mt-4" v-if="getTheRightAch(i)[1]==1">
                    {{achievements.text1[0]}}{{achievements.type1[i]}}{{achievements.text1[1]}}
                    
                  </h4>
                  <h4 class="mt-4" v-if="getTheRightAch(i)[1]==2">
                    {{achievements.text2[0]}}{{achievements.type1[i]}}{{achievements.text2[1]}}
                    
                  </h4>
                  <h4 class="mt-4" v-if="getTheRightAch(i)[1]==3">
                    {{achievements.text3[0]}}{{achievements.type1[i]}}{{achievements.text3[1]}}
                    
                  </h4>
                  <h4 class="mt-4" v-if="getTheRightAch(i)[1]==4">
                    {{achievements.text4[0]}}{{achievements.type1[i]}}{{achievements.text4[1]}}
                    
                  </h4>
                  <div class="progress">
                    <div
                      v-if="achievementReq(achievements.type1[i],i)[1]==100"
                      class="progress-bar progress-bar-striped progress-bar-animated bg-primary"
                      role="progressbar"
                      aria-valuenow="75"
                      aria-valuemin="0"
                      aria-valuemax="100"
                      v-bind:style="{width: achievementReq(achievements.type1[i],i)[2]}"
                    >Completo</div>
                    <div
                      v-if="achievementReq(achievements.type1[i],i)[1]<100"
                      class="progress-bar progress-bar-striped progress-bar-animated bg-success"
                      role="progressbar"
                      aria-valuenow="75"
                      aria-valuemin="0"
                      aria-valuemax="100"
                      v-bind:style="{width: achievementReq(achievements.type1[i],i)[2]}"
                    >{{achievementReq(achievements.type1[i],i)[2]}}</div>
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
<style>
</style>
<script>
import Header from "@/components/Header.vue";
import Footer from "@/components/Footer.vue";
import swal from "sweetalert2";
import axios from "axios";

export default {
  data: function() {
    return {
      userLoggedIn: 0,
      requisitions: [],
      books: [],
      users: [],
      reviews: [],
      achievements: [],
      achComplete: []
    };
  },
  components: {
    Header,
    Footer
  },
  methods: {
    getTheRightAch(pos) {
      let index1 = "";
      let index2 = 0;

      if (pos < 3) {
        //Have the right text
        index2 = 1;
      } else if (pos < 6) {
        index2 = 2;
      } else if (pos < 9) {
        index2 = 3;
      } else {
        index2 = 4;
      }

      while (pos > 2) {
        pos -= 3;
      }

      if ((pos + 1) % 3 == 0) {
        //Change color of star (bronze, silver, gold)
        index1 = "Gold";
      } else if ((pos + 1) % 2 == 0) {
        index1 = "Silver";
      } else {
        index1 = "Peru";
      }

      return [index1, index2];
    },
    achievementReq(n, a) {
      let number = 0;
      let percent = 0;
      let text = "";

      if (a >= 0 && a < 3) {
        //Requisições
        for (let i = 0; i < this.requisitions.length; i++) {
          console.log(this.requisitions[i].userId )
          console.log(this.userLoggedIn)
          if (this.requisitions[i].userId == this.userLoggedIn) {
            number++;
          }
        }
        
      } else if (a >= 3 && a < 6) {
        //Reviews
        
        for (let i = 0; i < this.reviews.length; i++) {
          
          if (this.reviews[i].userId == this.userLoggedIn) {
            number++;
          }
        }
        //console.log("Entrou em " + a + " com " + number)
      } else if (a >= 6 && a < 9) {
        //Upvotes
        for (let i = 0; i < this.reviews.length; i++) {
          if (this.reviews[i].userId == this.userLoggedIn) {
            number += this.reviews[i].upVote.length;
          }
        }
        
      } else if (a >= 9) {
        //Pontos
        for (let i = 0; i < this.users.length; i++) {
          if (this.users[i]._id == this.userLoggedIn) {
            number = this.users[i].points;
          }
        }
        
      }
      
      if (number >= n) {
        text = 100 + "%";
        percent = 100;
        console.log(percent);
        let test = false
        for (let i = 0; i < this.achComplete.length; i++) {
          if(this.achComplete[i]==a){
            test = true
          }          
        }
        if(test==false){
          this.achComplete.push(a)
        }
      } else {
        percent = parseInt((number / n) * 100);
        text = percent + "%";
      }

      return [number, percent, text];
    }
  },
  created() {
    this.userLoggedIn = localStorage.getItem("userLoggedIn");

    console.log(this.userLoggedIn)
    /* this.requisitions = this.$store.getters.requisitions;
    this.books = this.$store.getters.books;
    this.users = this.$store.getters.users;
    this.reviews = this.$store.getters.reviews;
   
    console.table(this.reviews); */

    this.achievements = this.$store.state.achievements;

    axios
      .get("http://localhost:3000/users")
      .then(res => {
        this.users = res.data;
        console.log("users:");
        console.log(this.users);
      })
      .catch(error => {
        console.log(error);
      });

    axios
      .get("http://localhost:3000/books")
      .then(res => {
        this.books = res.data;
        console.log("books:");
        console.log(this.books);
      })
      .catch(error => {
        console.log(error);
      });

    axios
      .get("http://localhost:3000/reviews")
      .then(res => {
        this.reviews = res.data;
        console.log("reviews:");
        console.log(this.reviews);
      })
      .catch(error => {
        console.log(error);
      }); 

    console.log(this.userLoggedIn)
    axios
      .get("http://localhost:3000/requisitions?userId=" + this.userLoggedIn)
      .then(res => {
        this.requisitions = res.data;
        console.log("requisitions:");
        console.log(this.requisitions);
      })
      .catch(error => {
        console.log(error);
      });
  }
};
</script>
    