<template>
<div class="card" v-on:click="putToRiver()">
        <button
        class="btn direction-btn btn-labeled"
        v-if="inRiver && parentIndex >= 0"
        v-on:click="goBackTo(parentIndex)"
    >
        <span class="btn-label">
            <i class="glyphicon glyphicon-chevron-up"></i>
        </span>
        Go back to upper card
    </button>
    <div class="card-author">Written by: {{card.author}}</div>
    <div class="card-title">{{card.title}}</div>
    <div class="tag-container">
        <div class="tag"  v-for="tag in card.tags" v-bind:key="tag">{{tag}}</div>
    </div>
    <div v-html="card.body" class="card-content"></div>
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

