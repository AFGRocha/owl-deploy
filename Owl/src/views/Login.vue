<template>
  <div class="login">
    <Header/>
    <div class="margin5 mt-4">
      <div class="row">
        <div class="col-12 col-md-4 offset-md-4 boxTitle">
          <h3>Login</h3>
        </div>
      </div>
      <div class="row">
        <div class="col-12 col-md-4 offset-md-4 boxContent">
          <div class="form-wrapper text-center">
            <form class="form-signin">
              <label for="inputEmail" class="sr-only">Email address</label>
              <input
                type="email"
                id="inputEmail"
                class="form-control"
                placeholder="Email address"
                v-model="form.email"
                required
                autofocus
              >
              <label for="inputPassword" class="sr-only">Password</label>
              <input
                type="password"
                id="inputPassword"
                class="form-control"
                placeholder="Password"
                v-model="form.password"
                required
              >
              <button class="btn btn-lg btn-block" id="btnLogin" @click="login" type="submit">Log in</button>
            </form>
          </div>
        </div>
      </div>
    </div>
    <Footer/>
  </div>
</template>

<style scoped>
html,
body {
  height: 100%;
}

.form-wrapper {
  display: -ms-flexbox;
  display: flex;
  -ms-flex-align: center;
  align-items: center;
  padding-top: 40px;
  padding-bottom: 40px;
  /*background-color: #f5f5f5;*/
}

.form-signin {
  width: 100%;
  max-width: 330px;
  padding: 15px;
  margin: auto;
}

.form-signin .form-control {
  position: relative;
  box-sizing: border-box;
  height: auto;
  padding: 10px;
  font-size: 16px;
}

.form-signin input[type="email"] {
  margin-bottom: 5px;
}
.form-signin input[type="password"] {
  margin-bottom: 10px;
}

#btnLogin {
  background-color: #bf6e26;
  color: white;
}

#btnLogin:hover {
  opacity: 0.9;
}
</style>

<script>
import Header from "@/components/Header.vue";
import swal from "sweetalert2";
import Footer from "@/components/Footer.vue";
import axios from "axios";
import AuthenticationService from "../services/authenticate.js";

export default {
  name: "login",
  components: {
    Header,
    Footer
  },
  data: function() {
    return {
      form: {
        email: "",
        password: ""
      },
      url: "http://localhost:3000/",
      success: 0
    };
  },
  methods: {
    async login() {
      /* let user = {
        email: this.form.email,
        password: this.form.password
      };

      let loginVerified = this.$store.getters.Login(user);
      if (loginVerified) {
        this.$router.push("/");
        swal({
          type: "success",
          title: "Login efetuado com sucesso."
        });
      } else {
        swal({
          type: "error",
          title: "Os seus dados estão incorretos."
        });
      } */

      try {
        const response = await axios.post(this.url + "users/login", {
          email: this.form.email,
          password: this.form.password
        });
        console.log(response.data);
        //this.$store.dispatch("setToken", response.data.token);
        //this.$store.dispatch("login", response.data.user);
        swal({
          type: "success",
          title: "Login efetuado com sucesso."
        });

        localStorage.setItem("userLoggedIn",response.data.user._id );
        this.$router.push("/")
      } catch (error) {
        this.error =
          !!error.response.data.error == true ? error.response.data.error : "";

        swal({
          type: "error",
          title: "Os seus dados estão incorretos."
        });
      }
    }
  }
};
</script>
