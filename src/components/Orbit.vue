<template>
  <div class="orbit-container">
    <div class="orbit">
      <card
        v-if="activecards.left"
        :title="activecards.left.title"
        :content="activecards.left.content"
      ></card>
      <div class="invis-card card" v-else>
      </div>

       <card
       v-on:cardChosen="cardChosen($event)"
       v-if="activecards.center"
        :title="activecards.center.title"
        :content="activecards.center.content"
      ></card>

       <card
       v-if="activecards.right"
        :title="activecards.right.title"
        :content="activecards.right.content"
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
    current: function(newVal){
      this.activecards = this.getActive(this.orbitCards, newVal);
    }
  },
  data (){
    return {
      orbitCards: this.cards,
      activecards: {
        "center": {
          "title": "No Cards",
          "content": "There is currently no content available"
        }
      }
    }
  },
  methods: {
    getActive: function (source, index){
      var resultArray = {}

      if (source.length == 0){
        return {
          "center": {
            "title": "No Cards available",
            "content" : " --- "
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
      if (this.orbitCards[index].children){
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
      var children = this.orbitCards[this.current].children;
      if (!children.empty){
         this.orbitCards = children
         this.activecards = this.getActive(this.orbitCards, 1)
      }
      
    }
  },
  mounted: function(){
    this.activecards = this.getActive(this.orbitCards, this.current);
  }
}
</script>

<style>
</style>
