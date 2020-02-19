<template>
  <div class="orbit-container">
    <div class="orbit">
      <card
        v-if="activecards.left"
        :title="activecards.left.title"
        :body="activecards.left.body"
        :tags="activecards.left.tags"
      ></card>
      
      <div class="invis-card card" v-else>
      </div>
      
      <button type="button" id="prev" v-if="orbitCards.length > 0" v-on:click="prev()" class="btn direction-btn btn-labeled ">
              <span class="btn-label">
                <i class="glyphicon glyphicon-chevron-left"></i>
              </span>
              Prev
      </button>
      
      <card
       v-on:cardChosen="cardChosen($event)"
       v-if="activecards.center"
        :title="activecards.center.title"
        :body="activecards.center.body"
        :tags="activecards.center.tags"
      ></card>
      
      <button type="button" id="next" v-if="orbitCards.length > 0" v-on:click="next()" class="btn direction-btn btn-labeled ">
          Next 
          <span class="btn-label">
            <i class="glyphicon glyphicon-chevron-right"></i>
          </span>
      </button>
      
      <card
        v-if="activecards.right"
        :title="activecards.right.title"
        :body="activecards.right.body"
        :tags="activecards.right.tags"
      ></card>
      
      <div class="invis-card card" v-else>
      </div>
    </div>

    <orbit
      v-if = "nest && this.hasChildren(this.current)"
      :cards = "getChildren(this.current)"
      :nest = "false"
      :current = "1"
    ></orbit>

  </div>
</template>

<script>
import Card from './Card.vue'

//import StackOHelper from './assets/stackoverflow-api-helper.js'
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
    }
  },
  data (){
    return {
      orbitCards: this.cards,
      activecards: {
        "center": {
          "title": "No Cards",
          "body": "There is currently no content available"
        }
      },
      orbitCurrent: this.current
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
        return {
          "center": {
            "title": "No Cards available",
            "body" : " --- "
          }
        }
      }

      var next = index + 1
      var prev = index - 1

      if (index < source.length && index >= 0){
        resultArray.center = source[index];
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
    getChildren: function (index){
      var children = []
      if (this.orbitCards[index].children){
        children = this.orbitCards[index].children;
      }

      return children;
    },
    cardChosen: function (card){
      this.$emit('cardChosen', card);
      
      var currentCard = this.orbitCards[this.current];

      if (typeof currentCard.children == "undefined" || currentCard.children.length == 0){
        this.orbitCards = [];
        this.activecards = [];
      }
    }
  },
  mounted: function(){
    this.activecards = this.getActive(this.orbitCards, this.current);
  }
}
</script>

<style>

code{
  white-space: normal;
}
</style>
