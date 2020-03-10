<template>
  <div class="orbit-container">
    <div class="orbit">
      <card
        class="disabled"
        v-if="activecards.left"
        :card = "activecards.left"
      ></card>
      
      <div class="invis-card card" v-else>
      </div>
      
      <button type="button" id="prev" v-if="orbitCards.length > 0 && orbitCurrent > 0" v-on:click="prev()" class="btn direction-btn btn-labeled ">
              <span class="btn-label">
                <i class="glyphicon glyphicon-chevron-left"></i>
              </span>
              Prev
      </button>
      
      <card
       v-on:cardChosen="cardChosen($event)"
       v-if="activecards.center"
       :card = "activecards.center"
      ></card>
      
      <button type="button" id="next" v-if="orbitCards.length > 0 && orbitCurrent < orbitCards.length-1" v-on:click="next()" class="btn direction-btn btn-labeled ">
          Next 
          <span class="btn-label">
            <i class="glyphicon glyphicon-chevron-right"></i>
          </span>
      </button>
      
      <card
        class="disabled"
        v-if="activecards.right"
        :card = "activecards.right"
      ></card>
      
      <div class="invis-card card" v-else>
      </div>
    </div>

    <button 
      type="button" 
      id="down" 
      v-if="nest && lvl2Cards.length > 0"
      style="margin: auto; display: block"
      v-on:click="cardChosen(activecards.center)" 
      class="btn direction-btn btn-labeled ">
          Go down this path 
          <span class="btn-label">
            <i class="glyphicon glyphicon-chevron-down"></i>
          </span>
    </button>

    <orbit
      class="lvl2Orbit"
      v-if = "nest && lvl2Cards.length > 0"
      :cards = "lvl2Cards"
      :nest = "false"
      :current = "1"
    ></orbit>

    

  </div>
</template>

<script>
import Card from './Card.vue'
import StackFacade from './../js/stack-overflow-facade.js'

//import Velocity from './assets/velocity.js'

export default {
  name: 'orbit',
  components: {
    Card,
    'orbit' : this,
  },
  props: {
      cards: Array,
      nest: Boolean,
      current: Number
  },
  watch: {
    orbitCurrent: function(newVal){
      this.activecards = this.getActive(this.orbitCards, newVal);
      //console.log(this.activecards.center);
      this.getChildren(this.activecards.center);
    },
    cards: function(newVal){
      this.orbitCards = newVal;
      this.activecards = this.getActive(this.orbitCards, 0);
    }
  },
  data (){
    return {
      orbitCards: this.cards,
      activecards: {},
      orbitCurrent: this.current,
      lvl2Cards: []
    }
  },
  methods: {
    prev: function (){

      if (this.orbitCurrent > 0){
        this.orbitCurrent -= 1
      }

    },
    next: function (){
      if (this.orbitCurrent < this.cards.length -1){
        this.orbitCurrent +=1
      }
    },
    getActive: function (source, index){
      var resultArray = {}

      if (source.length == 0){
        return {}
      }

      var next = index + 1
      var prev = index - 1

      if (index < source.length && index >= 0){
        resultArray.center = source[index];
        this.getChildren(source[index])
      }

      if (prev < source.length -1 && prev >= 0){
        resultArray.left = source[prev];
      }

      if (next < source.length && next >= 1){
        resultArray.right = source[next]
      }
      return resultArray
    },
    hasChildren: function (index){
      if (this.orbitCards[index] && this.orbitCards[index].children){
        return true;
      } 
      return false;
    },
    getChildren: function (card){
      var childrenPromise = StackFacade.getChildren(card);
      var vm = this;

      childrenPromise.then(function(val){
        var lvl2 = val;
        console.log(lvl2);
        vm.lvl2Cards = lvl2;
        
      })
    },
    cardChosen: function (card){
      this.$emit('cardChosen', card);
    }
  },
  mounted: function(){
    this.activecards = this.getActive(this.orbitCards, this.current);
  },
}
</script>

<style>

code{
  white-space: normal;
}
</style>
