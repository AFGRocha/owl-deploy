<template>
  <div>
    <backOfficeNav/>
    <div class="margin5 mt-4">
      <div class="row">
        <div class="col-12 col-md-12 boxTitle" id>
          <h3>Adicionar Tag</h3>
        </div>
      </div>
      <div class="row">
        <div class="col-12 col-md-12 boxContent" id>
          <form action id="formTags">
            <div class="row alignLeft mt-2">
              <div class="col-4">
                <label for="inputTag">Categoria</label>
                <input type="text" id="inputTag" class="form-control" v-model="tag">
              </div>
              <div class="col-4 mt-3">
                <button
                  type="button"
                  id="btnSubmit"
                  @click="addTag"
                  class="btn btn-lg mt-3 mb-3 buttonColor"
                >Adicionar Tag</button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
    <div class="margin5 mt-4">
      <div class="row">
        <div class="col-12 col-md-12 boxTitle" id>
          <h3>Tags</h3>
        </div>
      </div>
      <div class="row">
        <div class="col-12 col-md-12 boxContent">
          <form action class="mt-4 alignLeft">
            <label for="tagFilter" class="ml-2">Filtrar por Tag:</label>
            <div class="form-inline">
              <input type="text" class="form-control ml-2" id="tagFilter" v-model="tagFilter">
              <button class="btn buttonColor ml-4" id="btnLogin" @click="filterTags">Filtrar</button>
            </div>
          </form>
          <table class="table mt-4 table-responsive">
            <thead>
              <tr>
                <th scope="col">Tag</th>
                <th scope="col">Ações</th>
                <th scope="col"></th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="tag in filteredTags" :key="tag.tagId">
                <td v-if="editBool || tag._id != editID">{{tag.tagDescription}}</td>
                <td v-if="editBool == false && tag._id == editID">
                  <input type="text" class="form-control editInput" v-model="edit.tagDescription">
                </td>
                <td>
                  <button
                    type="button"
                    style="color:white"
                    @click="editTag(tag._id)"
                    class="btn btn-dark"
                  >
                    <i class="fas fa-edit"></i>
                  </button>
                </td>
                <td>
                  <button
                    type="button"
                    style="color:white"
                    @click="deleteTag(tag._id)"
                    class="btn btn-danger"
                  >
                    <i class="fas fa-trash-alt"></i>
                  </button>
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
      tags: [],
      //tags: this.$store.state.tags,
      tag: "",
      edit: {
        tagDescription: ""
      },
      editBool: true,
      editID: 0,
      created: false,
      filteredTags: [],
      //filteredTags: this.$store.state.tags,
      tagFilter: ""
    };
  },

  created() {
    console.log("entrou");
    axios
      .get("http://localhost:3000/tags")
      .then(res => {
        this.tags = res.data;
        this.filteredTags = res.data;
        console.log("tags:");
        console.log(this.tags);
      })
      .catch(error => {
        console.log(error);
      });
  },

  methods: {
    editTag(id) {
      let a = false;
      let b = false;
      let storeEditId = 0;
      for (let i = 0; i < this.tags.length; i++) {
        if (this.tags[i]._id === id) {
          if (this.created == false) {
            this.edit.tagDescription = this.tags[i].tagDescription;
            this.created = true;
          }
          if (this.editBool && this.created) {
            this.editID = id;
            this.edit.tagDescription = this.tags[i].tagDescription;
            this.editBool = false;
          } else {
            b = true;
            console.log("d");
            storeEditId = i;
            for (let j = 0; j < this.tags.length; j++) {
              console.log(this.edit.tagDescription);
              if (
                this.tags[j].tagDescription === this.edit.tagDescription &&
                j != i
              ) {
                a = true;
              }
            }
          }
        }
      }
      if (a) {
        swal({
          type: "error",
          title: "Tag já existente."
        });
      } else if (b) {
        this.editBool = true;
        let route = "http://localhost:3000/tags/" + this.tags[storeEditId]._id;
        console.log(this.tags[storeEditId]._id);
        axios
          .put(route, {
            tagDescription: this.edit.tagDescription
          })
          .then(res => {
            console.log(res);
          })
          .catch(error => {
            console.log(error);
          });
        this.tags[storeEditId].tagDescription = this.edit.tagDescription;
        /*this.$store.dispatch("edit_tag", {
          tagId: storeEditId,
          tagDescription: this.edit.tagDescription
        });*/
        swal({
          type: "success",
          title: "Tag editada com sucesso."
        });
      }
    },

    deleteTag(id) {
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
          for (let i = 0; i < this.tags.length; i++) {
            if (this.tags[i]._id === id) {
              let route = "http://localhost:3000/tags/" + this.tags[i]._id;
              console.log("entrou");
              axios
                .delete(route)
                .then(res => {
                  console.log(res);
                })
                .catch(error => {
                  console.log(error);
                });
              this.tags.splice(i, 1);
              //this.$store.dispatch("delete_tag", i);
              swal("Deleted!", "Tag has been deleted.", "success");
            }
          }
        }
      });
    },

    addTag() {
      let tagExists = false;
      for (let i = 0; i < this.tags.length; i++) {
        if (this.tags[i].tagDescription === this.tag) {
          tagExists = true;
        }
      }
      if (tagExists) {
        swal({
          type: "error",
          title: "Tag já existente."
        });
        document.getElementById("formTags").reset();
      } else {
        axios
          .post("http://localhost:3000/tags", {
            tagDescription: this.tag,
            
          })
          .then(res => {
            console.log("entrou");
            console.log(res);
          })
          .catch(error => {
            console.log(error);
          });

        this.tags.push({
          tagId: null,
          tagDescription: this.tag
        })
        /*this.$store.dispatch("add_tag", {
          tagId: this.$store.getters.getLastIdTags,
          tagDescription: this.tag
        });*/
        swal({
          type: "success",
          title: "Tag adicionada com sucesso."
        });
        document.getElementById("formTags").reset();
      }
    },

    filterTags() {
      this.filteredTags = [];
      let filterTagsResult = false;

      for (let i = 0; i < this.tags.length; i++) {
        let upperTag = this.tags[i].tagDescription.toUpperCase();
        let upperFilterTag = this.tagFilter.toUpperCase();

        filterTagsResult = upperTag.includes(upperFilterTag);

        if (filterTagsResult) {
          this.filteredTags.push(this.tags[i]);
        }
      }
    }
  }
};
</script>
