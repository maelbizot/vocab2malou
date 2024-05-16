<script setup lang="ts">
import { onMounted, ref  } from 'vue'
// import { useStore } from '../store/index'
import { doc, collection, getDocs, updateDoc } from 'firebase/firestore'
import { db } from '../firebase'
// import { Store } from 'vuex/types/index.js';
// import { computed } from 'vue'
// import { useStore } from '../store'




// const store = useStore()
// const items = computed(() => store.state.items)
let showform: any = ref(false)
let list: any = ref([])
const button_fr:any = ref()
const button_esp:any = ref()
const francais:any = ref()
const espagnol:any = ref()

onMounted(async ()=> {
  let fb:any[] = []
  const querySnapshot = await getDocs(collection(db, 'mots'))
  querySnapshot.forEach((doc) => {
    const mot = {
      fr : doc.data().fr,
      esp : doc.data().esp,
      id: doc.id
    }
    fb.push(mot)
  });
  let currentIndex = fb.length,  randomIndex;

    // While there remain elements to shuffle.
    while (currentIndex != 0) {

    // Pick a remaining element.
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [fb[currentIndex], fb[randomIndex]] = [
        fb[randomIndex], fb[currentIndex]];
    }
    list.value = fb
})



async function updateData(documentId: any, newData: any, langue: any) {
  console.log(documentId, newData)
  if(langue === "fr"){
    try {
    const docRef = doc(db, "mots", documentId);
    await updateDoc(docRef, {
      fr : newData
    });
    console.log("Les données ont été mises à jour avec succès !");
  } catch (error) {
    console.error("Erreur lors de la mise à jour des données :", error);
  }
  }else{
    try {
    const docRef = doc(db, "mots", documentId);
    await updateDoc(docRef, {
      esp : newData
    });
    console.log("Les données ont été mises à jour avec succès !");
  } catch (error) {
    console.error("Erreur lors de la mise à jour des données :", error);
  }
  }
  showform.value = false
}



function toggleListEsp() {
  for(let i = 0; i < espagnol.value.length; i++){
    if (espagnol.value[i].style.opacity === '' || espagnol.value[i].style.opacity ==='1'){
        espagnol.value[i].style.opacity = '0'
      }else{
        espagnol.value[i].style.opacity = '1'
      }
  }
}

function toggleListFR() {
  for(let i = 0; i < francais.value.length; i++){
    if (francais.value[i].style.opacity === '' || francais.value[i].style.opacity ==='1'){
        francais.value[i].style.opacity = '0'
      }else{
        francais.value[i].style.opacity = '1'
      }
  }
}

function toggleModifer() {
  console.log("mael")
  showform.value === true ? showform.value = false : showform.value = true // Afficher le formulaire pour l'élément spécifié
}

</script>

<template>
  <p>Liste des mots de vocabulaire</p>
  <div>
    <table>
      <tr>
        <th>Français</th>
        <th>Espagnol</th>
      </tr>
      <tr v-for="item in list" :key="item">
        <td ref="francais">{{ item.fr }}
        <form v-if="showform" @submit.prevent="updateData( item.id, item.fr, 'fr')">
          <input v-model="item.fr" >
        </form>
        </td>
        <td ref="espagnol">{{ item.esp }}
        <form v-if="showform" @submit.prevent="updateData( item.id, item.esp, 'esp')">
          <input v-model="item.esp" >
        </form>
        </td>
      </tr>
    </table>
  </div>
  
  <p></p>
  <button ref="button_fr" type="button" @click="toggleListFR()">cacher français </button>
  <button ref="button_esp" type="button" @click="toggleListEsp()">cacher espagnol</button>
  <button class="modifier" @click="toggleModifer()"> <img src="/editor_9377261.png" alt="edit"> </button>
  <!-- <img src="/delete_1214428.png" alt="edit"> -->



</template>

<style scoped>


td {
  padding-right: 10px;
  /* background-color: red; */

}
table {
  font-family: arial, sans-serif;
  border-collapse: collapse;
  width: 100%;
}

td, th {
  border: 1px solid #dddddd;
  text-align: left;
  padding: 20px;
}

tr:nth-child(even) {
  background-color: grey;
}

img {
  width: 15px;
}
.modifier{
  background-color: white
  ;
}


</style>
