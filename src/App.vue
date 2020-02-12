<template>
  <div id="app" v-on:keyup.left="prev()">
    <div>
      <input id="questionId" v-model="questionId" placeholder="Enter quesition ID">
      <button v-on:click="getCards(questionId)">Search</button>
    </div>
    <river
      :cards = "riverCards"
      class="river"
    ></river>
    <orbit
      v-if="cards.length > 0"
      :cards = "cards"
      :current = "current"
      :nest = "true"
      v-on:cardChosen="addToCards($event)"
    ></orbit>
    <div class="navigation">
        <button id="prev" v-on:click="prev()">prev</button>
        <button id="next" v-on:click="next()">next</button>
    </div>
  </div>
</template>

<script>
import Orbit from './components/Orbit.vue'
import River from './components/River.vue'

import StackOHelper from './assets/stackoverflow-api-helper.js'
import {getCards} from './assets/stack-overflow-facade.js'
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
    addToCards: function(card){
      this.riverCards.push(card)
    },
    prev: function (){

      if (this.current > 0){
        this.current -= 1
      }

    },
    next: function (){

      if (this.current < this.cards.length -1){
        this.current +=1
      }
    },
    getQuestion: function(id){
      var questionPromise = StackOHelper.getQuestion(id);
      const vm  = this;

      questionPromise.then(function(val){
        const json = JSON.parse(val)
        const newCard =  {
            "title": json.items[0].title,
            "body": json.items[0].body,
            "tags": json.items[0].tags
        }
        vm.riverCards = [newCard] ;

        console.log(json);
        vm.getAnswers(id);
      })
    },
    getAnswers: function(questionId){
      var questionPromise  = StackOHelper.getAnswers(questionId);
      const vm = this;

      questionPromise.then(function(val){
        const json = JSON.parse(val)
        vm.cards = json.items;
        console.log(vm.cards);

      })
    },
    getCards: function(postId){
      var cardsPromise = getCards(postId);
      const vm = this

      cardsPromise.then(function(val){
        console.log(val);
        vm.cards = val
      })
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
