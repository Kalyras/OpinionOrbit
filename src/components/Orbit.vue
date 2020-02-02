<template>
  <div class="orbit-container">
    <div class="orbit">
      <!--<card 
        v-for="card in activecards" 
        v-bind:key="card.title"
        :title="card.title"
        :content="card.content"
      ></card>-->

      <card class ="card-l"
      v-if="activecards[0]"
        :title="activecards[0].title"
        :content="activecards[0].content"
      ></card>
       <card class ="card-c"
       v-if="activecards[1]"
        :title="activecards[1].title"
        :content="activecards[1].content"
      ></card>
       <card class ="card-r"
       v-if="activecards[2]"
        :title="activecards[2].title"
        :content="activecards[2].content"
      ></card>

    <div class="navigation">
        <button id="prev" v-on:click="prev()">prev</button>
        <button id="next" v-on:click="next()">next</button>
    </div>
    </div>

    <orbit
      v-if = "nest && this.hasChildren(this.current)"
      :cards = "this.getChildren(this.current)"
      :nets = "false"
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
    'orbit' : this
  },
  props: {
      cards: Array,
      nest: Boolean
  },
  data (){
    return {
      current: 1,
      activecards: [
        {
          "title": "No Cards",
          "content": "There is currently no content available"
        }
      ]
    }
  },
  methods: {
    prev: function (){

      if (this.current > 0){
        this.current -= 1
        this.activecards = this.getActive(this.cards, this.current)
      }

    },
    next: function (){

      if (this.current < this.cards.length -1){
        this.current +=1
        this.activecards = this.getActive(this.cards, this.current)
      }
    },
    getActive: function (source, index){
      var resultArray = []

      if (source.length == 0){
        console.log("source is empty");
        return [
          {
            "title": "No Cards available",
            "content" : " --- "
          }
        ]
      }

      var next = index + 1
      var prev = index - 1

      if (prev < source.length -1 && prev >= 0){
        resultArray.push(source[prev]);
      }

      if (index < source.length && index >= 0){
        resultArray.push(source[index]);
      }

      if (next < source.length && next >= 1){
        resultArray.push(source[next])
      }

      this.getChildren(this.current);
      return resultArray
    },
    hasChildren: function (index){
      if (this.cards[index].children){
        return true;
      } 
      
      return false;
    },
    getChildren: function (index){
      var children = []
      if (this.cards[index].children){
        children = this.cards[index].children;
      }
      return children;
    }
  },
  mounted: function(){
    this.activecards = this.getActive(this.cards, this.current);
  }
}
</script>

<style>
</style>
