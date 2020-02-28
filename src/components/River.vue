<template>
  <div v-if="!riverCards.length == 0">
    <card
      v-for="(card, index) in riverCards"
      v-bind:key="card.title"
      v-on:goBackTo="goBackTo($event)"
      :card = "card"
      :inRiver = "true"
      :parentIndex = "index-1"
    >
    </card>
  </div>
</template>
<script>
import Card from './Card.vue'

export default {
  name: 'river',
  components: {
    Card,
  },
  props: {
      cards: Array,
  },
  data() {
    return{
      riverCards: this.cards
    }
  },
  methods:{
    goBackTo: function(index){
      this.riverCards.splice(index+1);
      this.$emit('setBaseCard', this.riverCards[index]);
    }
  },
}
</script>