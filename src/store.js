import Vue from 'vue'
import Vuex from 'vuex'
import axios from "axios"

Vue.use(Vuex)

export default new Vuex.Store({
  state: {

    userLoggedin: -1,

    loggedIn: false,

    currentBookId: 0,

    form: {
      title: "",
      cover: "",
      author: "",
      publisher: "",
      tags: [],
      launchDate: "",
      description: "",
      disponibility: "",
      bookStatus: ""
    },

    users: [{
      userId: 0,
      firstName: "Rogério",
      lastName: "Silva",
      email: "rs@gmail.com",
      password: "123456",
      ableToRequest: true,
      type: "admin",
      nRequisitionsNow: 0,
      photo: "https://i.imgur.com/6NIOn6z.jpg",
      points: 500,
      favTags: [0]
    },
    {
      userId: 1,
      firstName: "Oscar",
      lastName: "Sousa",
      email: "os@gmail.com",
      password: "123456",
      ableToRequest: true,
      type: "user",
      nRequisitionsNow: 0,
      photo: "https://i.imgur.com/6NIOn6z.jpg",
      points: 500,
      favTags: [0, 1]
    },
    {
      userId: 2,
      firstName: "Bernardo",
      lastName: "Ferreira",
      email: "bf@gmail.com",
      password: "123456",
      ableToRequest: true,
      type: "user",
      nRequisitionsNow: 0,
      photo: "https://i.imgur.com/6NIOn6z.jpg",
      points: 100,
      favTags: [0, 1]
    },
    {
      userId: 3,
      firstName: "Antonio",
      lastName: "Rocha",
      email: "ar@gmail.com",
      password: "123456",
      ableToRequest: true,
      type: "user",
      nRequisitionsNow: 0,
      photo: "https://i.imgur.com/6NIOn6z.jpg",
      points: 350,
      favTags: [0, 1]
    },
    {
      userId: 4,
      firstName: "Rodrigo",
      lastName: "Queiros",
      email: "rq@gmail.com",
      password: "123456",
      ableToRequest: true,
      type: "user",
      nRequisitionsNow: 0,
      photo: "https://i.imgur.com/6NIOn6z.jpg",
      points: 300,
      favTags: [0, 1]
    }
    ],

    books: [{
      bookId: 0,
      cover: "https://images-na.ssl-images-amazon.com/images/I/51HSkTKlauL._SX346_BO1,204,203,200_.jpg",
      title: "Harry Potter and the Sorcerer's Stone",
      author: "J.K. Rowling",
      publisher: "Scholastic",
      idTag: [1],
      launchDate: "",
      nPages: 100,
      description: "Em 2016 chega-nos em português o novo livro de Harry Potter, o célebre personagem de J.K. Rowling. Harry Potter e a Criança Amaldiçoada (Harry Potter and the Cursed Child) traz de volta as personagens mais carismáticas da série: Harry, Ron e Herminone, agora adultos, mas também os respetivos filhos e com estes desafios novos… e antigos:",
      nViews: 100,
      availability: true,
      bookStatus: "Good"
    },
    {
      bookId: 1,
      cover: "https://img.bertrand.pt/images/sangue-e-fogo---a-historia-dos-reis-targaryen-george-r-r-martin/NDV8MjI2MTk0NjV8MTg0OTc1NTl8MTU0NjQ3MzYwMDAwMA==/502x",
      title: "Sangue e Fogo - A História dos Reis Targaryen",
      author: "George R. R. Martin",
      publisher: "Scholastic",
      idTag: [1],
      launchDate: "",
      nPages: 100,
      description: "nfdljanfjlsahjlsdç",
      nViews: 100,
      availability: true,
      bookStatus: "Good"
    },
    {
      bookId: 2,
      cover: "https://img.bertrand.pt/images/onde-caem-os-anjos-nora-roberts/NDV8MTk3MDA3OTl8MTU1MzEwODN8MTQ5OTM4MjAwMDAwMA==/502x",
      title: "Onde Caem os Anjos",
      author: "Nora Roberts",
      publisher: "Scholastic",
      idTag: [1],
      launchDate: "",
      nPages: 100,
      description: "",
      nViews: 100,
      availability: true,
      bookStatus: "Good"
    },
    {
      bookId: 3,
      cover: "https://images-na.ssl-images-amazon.com/images/I/51z3fT5zLvL._SX390_BO1,204,203,200_.jpg",
      title: "Fullstack Vue: The Complete Guide to Vue.js",
      author: "Hassan Djirdeh",
      publisher: "CreateSpace Independent Publishing Platform",
      idTag: [1],
      launchDate: "",
      nPages: 320,
      description: "",
      nViews: 200,
      availability: false,
      bookStatus: "Worn"
    },
    {
      bookId: 4,
      cover: "https://img.wook.pt/images/duelo-nunca-visto-luciano-wernick/MXwyMjI2NzcxNXwxODE2MDUzOXwxNTM3Mzk4MDAwMDAw/502x",
      title: "Duelo Nunca Visto",
      author: "Luís Miguel Pereira",
      publisher: "Prime Books",
      idTag: [0, 1],
      launchDate: "",
      nPages: 100,
      description: "",
      nViews: 600,
      availability: true,
      bookStatus: "Good",
      description: "Nunca o futebol mundial assistiu a um duelo tão equilibrado. Fruto de uma aturada investigação, este livro apresenta pela primeira vez os dois jogadores, comparando-os relativamente a mais de 30 diferentes fatores. ",
    },
    {
      bookId: 5,
      cover: "https://img.wook.pt/images/programacao-em-java-pedro-coelho/MXwxODM1MDgwMHwxNDA0MTg5NHwxNDY5MDU1NjAwMDAw/502x",
      title: "Programação em Java",
      author: "Luís Miguel Pereira",
      publisher: "Prime Books",
      idTag: [0],
      launchDate: "",
      nPages: 100,
      description: "",
      nViews: 550,
      availability: true,
      bookStatus: "Good",
      description: "Nesta altura em que o Java se afirma em múltiplos ambientes de desenvolvimento e em que as interfaces por plug-in começam a ser descontinuadas nos browsers, surge esta obra com vários exemplos práticos, escrita de forma simples e acessível, destinada a todos aqueles que possuem conhecimentos básicos de programação em outras linguagens e queiram aprender Java.",
    },

    ],

    reviews: [{
      reviewId: 0,
      bookId: 0,
      userId: 0,
      rating: 4,
      date: "2018-07-11",
      comment: "This is a review test test. This is a review test test. This is a review test test. This is a review test test.This is a review test test.",
      upVote: [3, 4, 5],
      downVote: [1]
    },
    {
      reviewId: 1,
      bookId: 0,
      userId: 1,
      rating: 4,
      date: "2018-07-11",
      comment: "This is a review test test. This is a review test test. This is a review test test. This is a review test test. This is a review test test. ",
      upVote: [2, 5, 6, 7],
      downVote: [4, 5, 6]
    }],

    requisitions: [{
      requisitionId: 0,
      bookId: 2,
      userId: 0,
      requisitionDate: "Wed Jun 15 2019 20:29:40 GMT+0100 (Western European Summer Time)",
      deliveryDate: "",
      deliveryBookStatus: "",
      active: true
    },
    {
      requisitionId: 1,
      bookId: 0,
      userId: 0,
      requisitionDate: "Wed Jun 19 2019 20:29:40 GMT+0100 (Western European Summer Time)",
      deliveryDate: "",
      deliveryBookStatus: "",
      active: false
    },
    {
      requisitionId: 1,
      bookId: 0,
      userId: 0,
      requisitionDate: "Wed Jun 19 2019 20:29:40 GMT+0100 (Western European Summer Time)",
      deliveryDate: "",
      deliveryBookStatus: "",
      active: true
    }],


    tags: [{
      tagId: 0,
      tagDescription: "Desporto"
    },
    {
      tagId: 1,
      tagDescription: "Ciência"
    }],

    bookSuggestions: [{
      suggestionId: 0,
      suggestionTitle: "Foi Sem Querer Que Te Quis",
      suggestionAuthor: "Raul Minh'alma",
      suggestionCover: "https://img.wook.pt/images/foi-sem-querer-que-te-quis-raul-minhalma/MXwyMjM1ODA1OXwxODI0MDkxN3wxNTQwMTYyODAwMDAw/502x",
      userId: 1,
      suggestionDate: new Date().toLocaleString(),
      suggestNumber: 1
    }],
    notifications: [{
      notificationId: 0,
      userId: 0,
      type: "bookAvailable",
      bookId: 3,
      show: false
    }],
    achievements: {
      type1: [1, 5, 20, 2, 10, 50, 6, 60, 100, 200, 1000, 5000],
      text1: ["Fazer ", " requisições"],
      text2: ["Fazer ", " reviews"],
      text3: ["Fazer ", " upvotes"],
      text4: ["Atingir ", " pontos"],
    },


  },

  getters: {


    Login: (state) => (user) => {
      let verification = false
      for (let i = 0; i < state.users.length; i++) {
        if (state.users[i].email == user.email && state.users[i].password == user.password) {
          verification = true
          state.userLoggedin = state.users[i].userId
          localStorage.setItem("userLoggedIn", state.userLoggedin)
        }
      }
      return verification
    },


    Signup: (state) => (user) => {
      let strError = ""
      for (let i = 0; i < state.users.length; i++) {
        if (state.users[i].email == user.email) {
          strError += "Email já existe /n"
        }

        if (user.password != user.password2) {
          strError += "Passwords diferentes /n"
        }
      }

      return strError
    },

    getLastId: (state) => {
      let lastId = 0
      if (state.users.length > 0) {
        lastId = state.users[state.users.length - 1].userId + 1
      }
      return lastId
    },

    getLastIdReq: (state) => {
      let lastId = 0
      if (state.requisitions.length > 0) {
        lastId = state.requisitions[state.requisitions.length - 1].requisitionId + 1
      }
      return lastId
    },

    getLastIdBooks: (state) => {
      let lastId = 0
      if (state.books.length > 0) {
        lastId = state.books[state.books.length - 1].bookId + 1
      }
      return lastId
    },

    getLastIdSuggestions: (state) => {
      let lastId = 0
      if (state.bookSuggestions.length > 0) {
        lastId = state.bookSuggestions[state.bookSuggestions.length - 1].suggestionId + 1
      }
      return lastId
    },

    getLastIdTags: (state) => {
      let lastId = 0
      if (state.tags.length > 0) {
        lastId = state.tags[state.tags.length - 1].tagId + 1
      }
      return lastId
    },

    getUserLoggedIn(state) {
      return state.userLoggedin

    },
    //For book page
    ClickedBook(state) {
      return state.ClickedBook

    },
    books(state) {
      return state.books

    },
    requisitions(state) {
      return state.requisitions
    },
    users(state) {
      return state.users
    },
    reviews(state) {
      return state.reviews
    }
  },

  mutations: {

    open_book(state, payload) {
      state.currentBookId = payload
    },

    UP_VOTE(state, payload) {

      for (let i = 0; i < state.reviews.length; i++) {

        if (state.reviews[i].reviewId == payload[0]) {
          if (payload[2]) {
            state.reviews[i].upVote.push(payload[1]);
            if (payload[3] == false) {
              for (let j = 0; j < state.reviews[i].downVote.length; j++) {

                if (state.reviews[i].downVote[j] == payload[1]) {
                  state.reviews[i].downVote.splice(j, 1);
                }

              }
            }

          }
          else {
            for (let j = 0; j < state.reviews[i].upVote.length; j++) {

              if (state.reviews[i].upVote[j] == payload[1]) {
                state.reviews[i].upVote.splice(j, 1);
              }

            }
          }
        }
      }

    },

    DOWN_VOTE(state, payload) {
      console.log("Ola")
      for (let i = 0; i < state.reviews.length; i++) {

        if (state.reviews[i].reviewId == payload[0]) {
          if (payload[2]) {
            state.reviews[i].downVote.push(payload[1]);

            if (payload[3] == false) {

              for (let j = 0; j < state.reviews[i].upVote.length; j++) {

                if (state.reviews[i].upVote[j] == payload[1]) {
                  state.reviews[i].upVote.splice(j, 1);
                }

              }
            }
          }
          else {
            for (let j = 0; j < state.reviews[i].downVote.length; j++) {

              if (state.reviews[i].downVote[j] == payload[1]) {
                state.reviews[i].downVote.splice(j, 1);
              }

            }
          }
        }
      }
    },
    DELETE_REVIEW(state, payload) {
      state.reviews.splice(payload, 1);
    },

    ADD_USER(state, payload) {
      state.users.push(payload)
    },

    DELETE_BOOK(state, payload) {
      state.books.splice(payload, 1)
    },

    ADD_BOOK(state, payload) {
      state.books.push(payload)
    },

    DELETE_USER(state, payload) {
      state.users.splice(payload, 1)
    },

    ADD_ADMIN(state, payload) {
      // console.log("entrou mutation")
      // console.log(state.users)
      //   axios
      //    .put(payload[1], {
      //     firstName: state.users[payload[0]].firstName,
      //     lastName: state.users[payload[0]].lastName,
      //     email: state.users[payload[0]].email,
      //     password: state.users[payload[0]].password,
      //     ableToRequest: state.users[payload[0]].ableToRequest,
      //     type: "admin",
      //     nRequisitionsNow: state.users[payload[0]].nRequisitionsNow,
      //     photo: state.users[payload[0]].photo,
      //     points: state.users[payload[0]].points,
      //     favTags: state.users[payload[0]].favTags
      //    })
      //    .then(res => {
      //       // console.log("entrou axios")
      //       // state.users[payload[0]].type = "admin"

      //       console.log(res)

      //    })
      //    .catch(error => {
      //      console.log(error);
      //  });


      state.users[payload].type = "admin"
    },

    DELETE_ADMIN(state, payload) {
      state.users[payload].type = "user"
    },

    LET_REQUEST(state, payload) {
      state.users[payload].ableToRequest = true
    },

    DENY_REQUEST(state, payload) {
      state.users[payload].ableToRequest = false
    },

    ADD_SUGGESTION(state, payload) {
      state.bookSuggestions.push(payload)
    },

    ADD_SUGGESTION_NUMBER(state, payload) {
      state.bookSuggestions[payload].suggestNumber += 1
    },

    EDIT_BOOK(state, payload) {
      state.books[payload.bookId].author = payload.author
      state.books[payload.bookId].title = payload.title
      state.books[payload.bookId].publisher = payload.publisher
      state.books[payload.bookId].cover = payload.cover
      state.books[payload.bookId].description = payload.description
      state.books[payload.bookId].launchDate = payload.launchDate
      state.books[payload.bookId].bookStatus = payload.bookStatus
    },

    EDIT_PROFILE(state, payload) {
      state.users[payload.userId].firstName = payload.firstName
      state.users[payload.userId].lastName = payload.lastName
      state.users[payload.userId].email = payload.email
      state.users[payload.userId].photo = payload.photo
    },

    EDIT_TAG(state, payload) {
      state.tags[payload.tagId].tagDescription = payload.tagDescription
    },

    DELETE_TAG(state, payload) {
      state.tags.splice(payload, 1)
    },

    ADD_TAG(state, payload) {
      state.tags.push(payload)
    },

    ADD_VIEW(state, payload) {
      state.books[payload].nViews += 1
    },

    DELETE_SUGGESTION(state, payload) {
      state.bookSuggestions.splice(payload, 1)
    },
    ADD_REQ(state, payload) {
      state.requisitions.push(payload[0])
      state.requisitions[payload[1]].availability = false
    },
    DELIVERY_BOOK(state, payload) {
      state.requisitions[payload[0]].active = false
      state.users[payload[1]].points += payload[2]
      state.requisitions[payload[3]].availability = true
      state.requisitions[payload[3]].deliveryDate = payload[4]
    },
    EDIT_REVIEW(state, payload) {
      state.reviews[payload[0]].comment = payload[1]
    },
    DO_REVIEW(state, payload) {
      state.reviews.push(payload)
      state.users[payload.userId].points += 20
    },
    ADD_NOTIFICATION(state, payload) {
      state.notifications.push(payload)
    },
    NOTF_SHOW(state, payload) {
      state.notifications[payload].show = true
    },

    //to do
    UPDATE_FAVTAGS(state, payload) {
      state.users[payload[0]].favTags = payload[1]
    }
  },

  actions: {
    notf_show(context, payload) {
      context.commit("NOTF_SHOW", payload);
    },
    add_notification(context, payload) {
      context.commit("ADD_NOTIFICATION", payload);
    },
    do_review(context, payload) {
      context.commit("DO_REVIEW", payload);
    },
    edit_review(context, payload) {
      context.commit("EDIT_REVIEW", payload);
    },
    delivery_book(context, payload) {
      context.commit("DELIVERY_BOOK", payload);
    },
    add_req(context, payload) {
      context.commit("ADD_REQ", payload);
    },
    delete_review(context, payload) {
      context.commit("DELETE_REVIEW", payload);
    },
    open_book(context, payload) {
      context.commit('open_book', payload)
    },
    add_user(context, payload) {
      context.commit("ADD_USER", payload);
    },
    up_vote(context, payload) {
      context.commit("UP_VOTE", payload);
    },
    down_vote(context, payload) {
      context.commit("DOWN_VOTE", payload);
    },
    delete_book(context, payload) {
      context.commit("DELETE_BOOK", payload);
    },
    add_book(context, payload) {
      context.commit("ADD_BOOK", payload);
    },
    delete_user(context, payload) {
      context.commit("DELETE_USER", payload);
    },
    add_admin(context, payload) {
      context.commit("ADD_ADMIN", payload);
    },
    delete_admin(context, payload) {
      context.commit("DELETE_ADMIN", payload);
    },
    let_request(context, payload) {
      context.commit("LET_REQUEST", payload);
    },
    deny_request(context, payload) {
      context.commit("DENY_REQUEST", payload);
    },
    add_suggestion(context, payload) {
      context.commit("ADD_SUGGESTION", payload);
    },
    add_suggestion_number(context, payload) {
      context.commit("ADD_SUGGESTION_NUMBER", payload);
    },
    edit_book(context, payload) {
      context.commit("EDIT_BOOK", payload);
    },
    edit_profile(context, payload) {
      context.commit("EDIT_PROFILE", payload);
    },
    edit_tag(context, payload) {
      context.commit("EDIT_TAG", payload);
    },
    delete_tag(context, payload) {
      context.commit("DELETE_TAG", payload);
    },
    add_tag(context, payload) {
      context.commit("ADD_TAG", payload);
    },
    add_view(context, payload) {
      context.commit("ADD_VIEW", payload);
    },
    delete_suggestion(context, payload) {
      context.commit("DELETE_SUGGESTION", payload);
    },
    //to do
    update_favtags(context, payload) {
      context.commit("UPDATE_FAVTAGS", payload)
    }
  }
})
