<template>
  <div id="app">

    <div class="nav_custom">
      <nav class="navbar navbar-light bg-custom">
        <a class="navbar-brand" href="#">
          <img src="./assets/orbit.png" width="55" height="55" class="d-inline-block" alt="">
            Opinion Orbit
        </a>
      </nav>
    </div>

    <div class="search-custom">
      <input id="questionId" v-model="questionId" placeholder="Enter quesition ID">
      <button class="btn btn-danger search-btn" v-on:click="getCard(questionId)">Search</button>
    </div>

    <river
      :cards = "riverCards"
      class="river"
    ></river>

    <orbit
      v-if="cards.length > 0"
      v-on:cardChosen="addToRiver($event)"
      :cards = "cards"
      :current = "current"
      :nest = "true"
    ></orbit>

  </div>
</template>

<script>
import Orbit from './components/Orbit.vue'
import River from './components/River.vue'

//import StackOHelper from './assets/stackoverflow-api-helper.js'
import StackFacade from './assets/stack-overflow-facade.js'
//import Velocity from './assets/velocity.js'

export default {
  name: 'app',
  components: {
    Orbit,
    River,
  },
  data (){
    return {
      questionId: "42936588",
      current: 0,
      cards: [],
      riverCards: []
    }
  },
  methods:{
    addToRiver: function(card){
      this.riverCards.push(card); 
    },
    getCard: function(postId){
      try{
        var cardPromise = StackFacade(postId);
        const vm = this
        cardPromise.then(function(val){
          vm.addToRiver(val);
          vm.cards = val.children
        })
      } catch (e){
        console.log(e);
      }
      
      
    }
  }
}
</script>


<style>
#app {
  font-family: 'Roboto', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  
}


</style>

