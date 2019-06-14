<template>
    <div class="footer">
          <br>
  
      <div class="container">
        <div class="row">
            <div class="col-sm-12 col-md-4 col-lg-4">
                <a href="https://www.ipp.pt/"><img src="https://www.esmad.ipp.pt/logo_pporto_branco.png" width="200"></a>
              </div>
              <div class="col-sm-12 col-md-4 col-lg-4">
                  <p>Escola Superior de Media Artes e Design </p>
                  <p>Rua D. Sancho I, n.º 981</p>
                  <p>4480-876 Vila do Conde</p>
                  <p>Portugal</p>
                  <p>T. +351 252 291 700</p>
                  <p>E. geral@esmad.ipp.pt</p>
  
                </div>
                <div class="col-sm-12 col-md-4 col-lg-4">
                    <p>ESMAD © 2019</p>
                    <p>Owl © 2019</p>
                    <a href="https://moodle.esmad.ipp.pt/mdl1819/?redirect=0"><p>Moodle</p></a>

                  </div>
        </div>
        
      </div>
    
  </div>
  
</template>

<style>

.footer{

        text-align: left;
        background-color: rgb(41, 41, 41);
        padding: 5px;
        line-height: 80%;
        color: white;
        text-decoration: none;
      }




</style>


<script>
export default {
  data: function() {
    return {
        userLoggedIn: localStorage.getItem("userLoggedIn"),
        users: this.$store.state.users,
        userName: ""
    };
  },

  created() {
    if (localStorage.getItem("userLoggedIn") == null) {
        localStorage.setItem("userLoggedIn", -1)
    } 

    this.userName = this.getUser()
   
    
           
  },
  methods: {
      logout() {
          localStorage.setItem("userLoggedIn", -1)
          //this.$router.push("/")
          //por sweetalert
          
      },

      getUser() {
          for (let i = 0; i < this.users.length; i++) {
              if (this.users[i].userId == this.userLoggedIn) {
                  this.userName = this.users[i].firstName + " " + this.users[i].lastName[0] + "."
              }
          }
          return this.userName
      }
  },
  computed: {
      
  }
  
};
</script>
