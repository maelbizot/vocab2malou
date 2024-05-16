<script setup lang="ts">
import {  ref, onBeforeMount, onUnmounted  } from 'vue'
// import { useStore } from '../store/index'
import { collection, getDocs } from 'firebase/firestore'
import { db } from '../firebase'

let list: any = ref([])
let incr: any = ref(0) 
// const button_fr:any = ref()
// const button_esp:any = ref()
const motFR:any = ref()
const motEsp:any = ref()

onBeforeMount(async ()=> {
  startTimer()
  let fb:any[] = []
  const querySnapshot = await getDocs(collection(db, 'mots'))
  querySnapshot.forEach((doc) => {
    const mot = {
      fr : doc.data().fr,
      esp : doc.data().esp
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
    document.addEventListener('keydown', changerMot);
})


onUnmounted(()=>{
  document.removeEventListener("keydown", changerMot);
})






let startTime = 0;
let intervalId = 0;
let running = ref(false);
let elapsedTime = 0;
let formattedTime = ref('00:00:00');

const handleKeyDown = (event: KeyboardEvent) => {
  if (event.code === 'Space') {
    if (!running.value) {
      startTimer();
    } else if (elapsedTime === 0) {
      resetTimer();
    } else {
      pauseTimer();
    }
  }
};

const startTimer = () => {
  startTime = Date.now() - elapsedTime;
  intervalId = setInterval(updateTimer, 10);
  running.value = true;
};

const pauseTimer = () => {
  clearInterval(intervalId);
  elapsedTime = Date.now() - startTime;
  formattedTime.value = formatTime(elapsedTime);
  running.value = false;
};



const resetTimer = () => {
  clearInterval(intervalId);
  elapsedTime = 0;
  formattedTime.value = '00:00:00';
  running.value = false;
};

const updateTimer = () => {
  elapsedTime = Date.now() - startTime;
  formattedTime.value = formatTime(elapsedTime);
};

const formatTime = (milliseconds: number) => {
  const hours = Math.floor(milliseconds / (1000 * 60 * 60));
  const minutes = Math.floor((milliseconds % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((milliseconds % (1000 * 60)) / 1000);
  const centiseconds = Math.floor((milliseconds % 1000) / 10);
  return `${padNumber(hours)}:${padNumber(minutes)}:${padNumber(seconds)}.${padNumber(centiseconds)}`;
};

const padNumber = (number: number) => {
  return number.toString().padStart(2, '0');
};



function changerMot(){
    if(ref(list).value[ref(incr).value + 1 ] === undefined){
      ref(incr).value = 0
      resetTimer()
    }
    else{
      if(motEsp.value.style.display === '' || motEsp.value.style.display === 'none'){
        console.log("on affiche")
        motEsp.value.style.display = 'block'
        pauseTimer
      }
      else{
        ref(incr).value++
        motEsp.value.style.display = 'none'
        resetTimer()
        startTimer()
      }
    }
}



</script>

<template>

  <p>Mot à deviner</p>

  <div ref="motFR">
    <!-- <p>le mot fr</p> -->
    {{  ref(list).value[ref(incr).value].fr }}
  </div>
  <div ref="motEsp" class="motES">
    <!-- <p>le mot en espagnol</p> -->
    {{  ref(list).value[ref(incr).value].esp }}
  </div>
  
  <div class="container">
    <p>{{ formattedTime }}</p>
  </div>





</template>

<style scoped>
.motES{
    display: none;
}
.container {
  text-align: center;
  margin-top: 100px;
}

p {
  font-size: 40px;
  font-weight: bold;
  margin-top: 20px;
}

</style>
