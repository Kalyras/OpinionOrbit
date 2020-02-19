<template>
  <div v-if="!cards.length == 0">
    <card
      v-for="card in cards"
      v-bind:key="card.title"
      :title = "card.title ? card.title : ''"
      :body = "card.body"
      :tags = "card.tags"
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
  watch:{
    cards: function(newVal){
      console.log(newVal);
    }
  }
}
</script>