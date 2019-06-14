<template>
  <div id="app">
    <div id="nav">
    </div>
    <router-view/>
  </div>
</template>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

</style>

<script>
export default {
  // beforeDestroy() {
  //   if (localStorage.getItem("books") == null) {
  //     localStorage.setItem("books", JSON.stringify(this.$store.state.books))
  //   }
  //   if (localStorage.getItem("users") == null) {
  //     localStorage.setItem("users", JSON.stringify(this.$store.state.users))
  //   }
  //   if (localStorage.getItem("reviews") == null) {
  //     localStorage.setItem("reviews", JSON.stringify(this.$store.state.reviews))
  //   }
  //   if (localStorage.getItem("requisitions") == null) {
  //     localStorage.setItem("requisitions", JSON.stringify(this.$store.state.requisitions))
  //   }
  //   if (localStorage.getItem("tags") == null) {
  //     localStorage.setItem("tags", JSON.stringify(this.$store.state.tags))
  //   }
  //   if (localStorage.getItem("tags") == null) {
  //     localStorage.setItem("tags", JSON.stringify(this.$store.state.tags))
  //   }
  //   if (localStorage.getItem("bookSuggestions") == null) {
  //     localStorage.setItem("bookSuggestions", JSON.stringify(this.$store.state.bookSuggestions))
  //   }
  //   if (localStorage.getItem("notifications") == null) {
  //     localStorage.setItem("notifications", JSON.stringify(this.$store.state.notifications))
  //   }
  // },

  // created() {
    
  //   this.$store.state.books = JSON.parse(localStorage.getItem("books"))
  //   this.$store.state.users = JSON.parse(localStorage.getItem("users"))
  //   this.$store.state.reviews = JSON.parse(localStorage.getItem("reviews"))
  //   this.$store.state.requisitions = JSON.parse(localStorage.getItem("requisitions"))
  //   this.$store.state.tags = JSON.parse(localStorage.getItem("tags"))
  //   this.$store.state.bookSuggestions = JSON.parse(localStorage.getItem("bookSuggestions"))
  //   this.$store.state.notifications = JSON.parse(localStorage.getItem("notifications"))
  // }
}
</script>

