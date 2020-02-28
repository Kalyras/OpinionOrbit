<template>
<div class="card" v-on:click="putToRiver()">
    <div class="card-title">{{card.title}}</div>
    <div class="tag-container">
        <div class="tag"  v-for="tag in card.tags" v-bind:key="tag">{{tag}}</div>
    </div>
    <div v-html="card.body" class="card-content"></div>
    <button
        v-if="inRiver && parentIndex >= 0"
        v-on:click="goBackTo(parentIndex)"
    >Up</button>
</div>
</template>

<script>
    export default {
        name: 'card',
        props: {
            card: Object,
            inRiver: Boolean,
            parentIndex: Number,
        },
        methods: {
            putToRiver: function (){
                this.$emit('cardChosen', this.card);
            },
            goBackTo: function(parentIndex){
                this.$emit('goBackTo', parentIndex);
            }
        }
    }
</script>

