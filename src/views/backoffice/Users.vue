<template>
  <div>
    <backOfficeNav/>
    <div class="margin5 mt-4">
      <div class="row">
        <div class="col-12 col-md-12 boxTitle">
          <h3>Utilizadores</h3>
        </div>
      </div>
      <div class="row">
        <div class="col-12 col-md-12 boxContent alignLeft">
          <form action class="mt-4">
            <label for="nameFilter" class="ml-2">Filtrar por nome de utilizador:</label>
            <div class="form-inline">
              <input type="text" class="form-control ml-2" id="nameFilter" v-model="nameFilter">
              <button class="btn buttonColor ml-4" id="btnLogin" @click="filterUsersByName">Filtrar</button>
            </div>
          </form>

          <table class="table mt-4 table-responsive">
            <thead>
              <tr>
                <!-- <th scope="col">Id</th> -->
                <th scope="col">Nome Próprio</th>
                <th scope="col">Último Nome</th>
                <th scope="col">Email</th>
                <th scope="col">Foto</th>
                <th scope="col">Tipo</th>
                <th scope="col">Pode Requisitar</th>
                <th scope="col">Ações</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="user in filteredUsers" :key="user.userId">
                <!-- <td>{{user._id}}</td> -->
                <td>{{user.firstName}}</td>
                <td>{{user.lastName}}</td>
                <td>{{user.email}}</td>
                <td>{{user.photo}}</td>
                <td>{{user.type}}</td>
                <td>
                  <span v-if="user.ableToRequest == true">Sim</span>
                  <span v-if="user.ableToRequest == false">Não</span>
                  <button
                    v-if="user.ableToRequest == true"
                    type="button"
                    style="color:white"
                    @click="denyRequest(user._id)"
                    class="btn btn-danger ml-2"
                  >
                    <i class="fas fa-ban"></i>
                  </button>
                  <button
                    v-if="user.ableToRequest == false"
                    type="button"
                    style="color:white"
                    @click="letRequest(user._id)"
                    class="btn btn-success ml-2"
                  >
                    <i class="fas fa-check"></i>
                  </button>
                </td>
                <td>
                  <button
                    type="button"
                    style="color:white"
                    @click="deleteUser(user._id)"
                    class="btn btn-danger mr-2"
                  >
                    <i class="fas fa-trash-alt"></i>
                  </button>
                  <button
                    v-if="user.type != 'admin'"
                    type="button"
                    style="color:white"
                    @click="addAdmin(user._id)"
                    class="btn btn-dark"
                  >Tornar Admin</button>
                  <button
                    v-if="user.type == 'admin'"
                    type="button"
                    style="color:white"
                    @click="deleteAdmin(user._id)"
                    class="btn btn-dark"
                  >Retirar Admin</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
</style>

<script>
import backOfficeNav from "@/components/backOfficeNav.vue";
import swal from "sweetalert2";
import axios from "axios";

export default {
  components: {
    backOfficeNav
  },
  data: function() {
    return {
      users: null,
      filteredUsers: null,
      nameFilter: "",
      username: ""
    };
  },

  created() {
    axios
      .get("http://localhost:3000/users")
      .then(res => {
        this.users = res.data;
        this.filteredUsers = res.data;
        console.log("users:");
        console.log(this.users);
      })
      .catch(error => {
        console.log(error);
      });
  },

  // async mounted() {
  //   this.filteredUsers = (await axios.get("http://localhost:3000/users")).data
  //   console.log(this.filteredUsers)
  // },

  methods: {
    deleteUser(id) {
      swal({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!"
      }).then(result => {
        if (result.value) {
          for (let i = 0; i < this.users.length; i++) {
            if (this.users[i]._id === id) {
              let route = "http://localhost:3000/users/" + this.users[i]._id;

              axios
                .delete(route)
                .then(res => {
                  console.log(res);
                })
                .catch(error => {
                  console.log(error);
                });
              this.users.splice(i, 1);
              //this.$store.dispatch("delete_user", i);
              swal("Deleted!", "User has been deleted.", "success");
            }
          }
        }
      });
    },

    addAdmin(id) {
      console.log(id);
      for (let i = 0; i < this.users.length; i++) {
        if (this.users[i]._id === id) {
          let route = "http://localhost:3000/users/" + this.users[i]._id;

          axios
            .put(route, {
              type: "admin"
            })
            .then(res => {
              console.log(res);
            })
            .catch(error => {
              console.log(error);
            });
          this.users[i].type = "admin";
          //this.$store.dispatch("add_admin", i);
          swal({
            type: "success",
            title: "Admin adicionado com sucesso."
          });
        }
      }
    },

    deleteAdmin(id) {
      for (let i = 0; i < this.users.length; i++) {
        if (this.users[i]._id === id) {
          let route = "http://localhost:3000/users/" + this.users[i]._id;

          axios
            .put(route, {
              type: "user"
            })
            .then(res => {
              console.log(res);
            })
            .catch(error => {
              console.log(error);
            });
          this.users[i].type = "user";
          //this.$store.dispatch("delete_admin", i);
          swal({
            type: "success",
            title: "Admin retirado com sucesso."
          });
        }
      }
      //location.reload();
    },

    letRequest(id) {
      for (let i = 0; i < this.users.length; i++) {
        if (this.users[i]._id === id) {
          let route = "http://localhost:3000/users/" + this.users[i]._id;

          axios
            .put(route, {
              ableToRequest: true
            })
            .then(res => {
              console.log(res);
            })
            .catch(error => {
              console.log(error);
            });
          this.users[i].ableToRequest = true;
          //this.$store.dispatch("let_request", i);
          swal({
            type: "success",
            title: "O utilizador já pode requisitar."
          });
        }
      }
    },

    denyRequest(id) {
      for (let i = 0; i < this.users.length; i++) {
        if (this.users[i]._id === id) {
          let route = "http://localhost:3000/users/" + this.users[i]._id;

          axios
            .put(route, {
              ableToRequest: false
            })
            .then(res => {
              console.log(res);
            })
            .catch(error => {
              console.log(error);
            });
          this.users[i].ableToRequest = false;
          //this.$store.dispatch("deny_request", i);
          swal({
            type: "success",
            title: "O utilizador esta proibido de requisitar."
          });
        }
      }
    },

    filterUsersByName() {
      this.filteredUsers = [];
      let filterNameResult = false;

      for (let i = 0; i < this.users.length; i++) {
        this.username = this.users[i].firstName + " " + this.users[i].lastName;

        let upperName = this.username.toUpperCase();
        let upperFilterName = this.nameFilter.toUpperCase();

        filterNameResult = upperName.includes(upperFilterName);

        if (filterNameResult) {
          this.filteredUsers.push(this.users[i]);
        }
      }
    }
  }
};
</script>

