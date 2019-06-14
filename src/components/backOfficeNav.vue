<template>
  <div>
    <nav class="navbar navbar-expand-lg navbar-light bg-light" id="navbarNav">
      <router-link class="navbar-brand" :to="{name: 'home'}" style="color:white">OWL</router-link>
  
      <b-navbar-toggle target="nav-collapse" id="white"><i class="fas fa-bars"></i></b-navbar-toggle>
      <b-collapse id="nav-collapse" class="alignLeft" is-nav>
        <ul class="navbar-nav">
        <li class="nav-item" id="navLinks">
          <router-link class="nav-link" :to="{name: 'users'}">Utilizadores</router-link>
        </li>
        <li class="nav-item">
          <router-link class="nav-link" :to="{name: 'books'}">Livros</router-link>
        </li>
        <li class="nav-item">
          <router-link class="nav-link" :to="{name: 'tags'}">Tags</router-link>
        </li>
        <li class="nav-item">
          <router-link class="nav-link" :to="{name: 'suggestions'}">Sugestões</router-link>
        </li>
        <li class="nav-item">
          <router-link class="nav-link" :to="{name: 'home'}">Voltar</router-link>
        </li>
      </ul>
      </b-collapse>
      
    </nav>
  </div>
</template>

<style>
#white {
  color:white
}

#navbar1 {
  background-color: #bf6e26 !important;
  color: white !important;
  height: 100px;
}

#logo {
  width: 171px;
  height: 94px;
}

#navbarNav {
  background-color: #592316 !important;
  color: white !important;
}

.nav-link {
  color: white !important;
  padding-left: 25px !important;
}
</style>

<script>
export default {};
</script>
