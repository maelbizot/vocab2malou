<script setup lang="ts">

</script>

<template>
  
  <nav class="navbar">
    <router-link to="/">Home</router-link>
    <router-link to="/liste">Liste des mots</router-link>
    <router-link to="/addVocab">Ajouter du vocabulaire</router-link>
    <router-link to="/jeuVocab">Jeu</router-link>
  </nav>
  <router-view />

</template>

<style scoped>
.navbar {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  background-color: #f0f0f0;
  padding: 10px;
  display: flex;
  justify-content: space-evenly;
  z-index: 9999;
}

.navbar a {
  text-decoration: none;
  color: #333;
  margin-right: 10px;
}

.navbar a:last-child {
  margin-right: 0;
}
</style>
