<template>
  <div class="signup">
    <Header/>
    <div class="margin5 mt-4">
      <div class="row">
        <div class="col-12 col-md-4 offset-md-4 boxTitle">
          <h3>Signup</h3>
        </div>
      </div>
      <div class="row">
        <div class="col-12 col-md-4 offset-md-4 boxContent">
          <div class="form-wrapper text-center">
            <form class="form-signin col-6">
              <label for="inputFirstName" class="sr-only">Nome</label>
              <input
                type="firstName"
                id="inputFirstName"
                class="form-control"
                placeholder="Nome próprio"
                v-model="firstName"
                required
              >
              <label for="inputLastName" class="sr-only">Nome</label>
              <input
                type="lastName"
                id="inputLastName"
                class="form-control"
                placeholder="Apelido"
                v-model="lastName"
                required
              >
              <label for="inputEmail" class="sr-only">Email address</label>
              <input
                type="email"
                id="inputEmail"
                class="form-control"
                placeholder="Email"
                v-model="email"
                required
              >
              <label for="inputPassword" class="sr-only">Password</label>
              <input
                type="password"
                id="inputPassword"
                class="form-control"
                placeholder="Password"
                v-model="password"
                required
              >
              <label for="inputPassword2" class="sr-only">Repita a Password</label>
              <input
                type="password"
                id="inputPassword2"
                class="form-control"
                placeholder="Repita a Password"
                v-model="password2"
                required
              >

              <button
                class="btn btn-lg btn-block"
                id="btnSignup"
                @click="signup"
                type="submit"
              >Sign up</button>
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
  padding-top: 10px;
  padding-bottom: 10px;
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

.form-signin input[type="firstName"] {
  margin-bottom: 5px;
}
.form-signin input[type="lastName"] {
  margin-bottom: 5px;
}
.form-signin input[type="email"] {
  margin-bottom: 5px;
}
.form-signin input[type="password"] {
  margin-bottom: 5px;
}
.form-signin input[type="password2"] {
  margin-bottom: 10px;
}

#btnSignup {
  background-color: #bf6e26;
  color: white;
}

#btnSignup:hover {
  opacity: 0.9;
}
</style>

<script>
import Header from "@/components/Header.vue";
import swal from "sweetalert2";
import Footer from "@/components/Footer.vue";
import axios from "axios";

export default {
  name: "signup",
  components: {
    Header,
    Footer
  },
  data: function() {
    return {
      url: "http://localhost:3000/",
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      password2: "",
      err: false
    };
  },
  methods: {
    // signup() {
    //   let user = {
    //     userId: this.$store.getters.getLastId,
    //     firstName: this.form.firstName,
    //     lastName: this.form.lastName,
    //     email: this.form.email,
    //     password: this.form.password,
    //     password2: this.form.password2
    //   };

    //   let strError = this.$store.getters.Signup(user);

    //   if (strError == "") {
    //     this.$store.dispatch("add_user", {
    //       userId: this.$store.getters.getLastId,
    //       firstName: this.form.firstName,
    //       lastName: this.form.lastName,
    //       email: this.form.email,
    //       password: this.form.password,
    //       password2: this.form.password2,
    //       photo: "https://i.imgur.com/6NIOn6z.jpg",
    //       points: 0
    //     });
    //     this.$router.push("/login");
    //     swal({
    //       type: "success",
    //       title: "Registo efetuado com sucesso"
    //     });
    //   } else {
    //     swal({
    //       type: "error",
    //       title: strError
    //     });
    //   }
    // }
    async signup() {
      let hasEmail = this.email.includes("@")
      let emailCheck = this.email.indexOf("@")
      let emailCheckAfter = this.email[emailCheck+1]
      console.log(this.password.length)
      if (this.password == this.password2 && this.password.length > 0 && hasEmail && emailCheckAfter) {
        const response = await axios.post(this.url + "users", {
          firstName: this.firstName,
          lastName: this.lastName,
          email: this.email,
          password: this.password
          //confirmPassword: this.password2
        });
        swal({
          type: "success",
          title: "Registo efetuado com sucesso"
        });

        if (response.data.error) {
          console.log(response.data.error);
          swal({
            type: "error",
            title: "Ocorreu um erro, tente mais tarde"
          });
        }
      } else if(hasEmail && emailCheckAfter) {
        swal({
          type: "error",
          title: "As passwords não sao iguais!"
        });
      }
    }
  }
};
</script>

