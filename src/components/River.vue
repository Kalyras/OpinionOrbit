<template>
  <div>
    <card
      v-for="card in cards"
      v-bind:key="card.title"
      :title = "card.title"
      :content = "card.content"
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
  }
}
</script>