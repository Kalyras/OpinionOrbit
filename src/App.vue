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
      <button class="btn btn-danger search-btn" v-on:click="setSearchedCard(questionId)">Search</button>
    </div>

    <river class="river"
      v-on:setBaseCard = "setOrbitCards($event.id)"
      :cards = "riverCards"
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

import StackFacade from './js/stack-overflow-facade.js'
//import Velocity from './assets/velocity.js'

export default {
  name: 'app',
  components: {
    Orbit,
    River,
  },
  data (){
    return {
      questionId: "vue child",
      current: 0,
      cards: [],
      riverCards: []
    }
  },
  methods:{
    setSearchedCard: function(term){
      const vm = this;
      vm.cards=[];
      var cardPromise = StackFacade.searchCard(term);
      cardPromise.then(function(val){
        vm.cards = val;
      })
    },
    addToRiver: function(card){
      this.riverCards.push(card);
      this.setOrbitCards(card);
    },
    setOrbitCards: function(card){
      var vm = this;
      var childrenPromise = StackFacade.getChildren(card);
      childrenPromise.then(function(val){
          vm.cards = JSON.parse(val);
      });
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

