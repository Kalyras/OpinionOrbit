<template>
  <div id="app" v-on:keyup.left="prev()">
    <river
      :cards = "riverCards"
    ></river>
    <orbit
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

//import StackOHelper from './assets/stackoverflow-api-helper.js'
//import Velocity from './assets/velocity.js'

export default {
  name: 'app',
  components: {
    Orbit,
    River
  },
  data (){
    return {
      current: 1,
      cards: [
        {
            "title": "card1",
            "content": "this is card 1",
            "children": [
              {
                  "title": "card1.1",
                  "content": "this is card 1.1"
              },{
                  "title": "card1.2",
                  "content": "this is card 1.2"
              },{
                  "title": "card1.3",
                  "content": "this is card 1.3"
              },{
                  "title": "card1.4",
                  "content": "this is card 1.4"
              }
            ]
        },
        {
            "title": "card2",
            "content": "this is card 2"
        },
        {
            "title": "card3",
            "content": "this is card 3"
        },
        {
            "title": "card4",
            "content": "this is card 4"
        },
        {
            "title": "card5",
            "content": "this is card 5"
        },
        {
            "title": "card6",
            "content": "this is card 6"
        }
      ],
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
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
