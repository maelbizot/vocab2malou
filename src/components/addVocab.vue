<script setup lang="ts">
import { ref } from 'vue'
import { collection, addDoc } from "firebase/firestore"; 
import { db } from '../firebase'

// import { useStore } from '../store'
// import { MutationType } from '../store/mutations'





// const text = ref('')
// const store = useStore()
// const createTask = () => {
//   if (text.value === '') return
//   const item: TodoItem = {
//     id: Date.now(),
//     text: text.value,
//     completed: false
//   }
//   store.commit(MutationType.CreateItem, item)
//   text.value = ''
// }


const textFR = ref('')
const textES = ref('')



async function addVocab(){
  console.log('addVocabulay')
  console.log(textES.value)
  if (textFR.value === '') return
    const docRef = await addDoc(collection(db, "mots"), {
      fr: textFR.value,
      esp: textES.value
    });
    console.log("Document written with ID: ", docRef.id);
    textFR.value = ''
    textES.value = ''
}


</script>

<template>
  <p>Ajouter un mot de vocabulaire</p>
  <form @submit.prevent="addVocab">
    <input v-model='textFR' type="text" placeholder="entrer un mot en français">
    <input v-model='textES' type="text" placeholder="traduction en espagnol">
    <button type="submit">add</button>
  </form>

  
</template>








<style scoped>
.read-the-docs {
  color: #888;
}
input{
  display : flex;
  padding: 5px;
  margin: 10px;
  
}
</style>
