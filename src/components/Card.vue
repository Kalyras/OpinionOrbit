<template>
<div class="card" v-on:click="putToRiver()">
    <div class="card-title">{{title}}</div>
    <div class="card-content">{{content}}</div>
</div>
</template>

<script>
    export default {
        name: 'card',
        props: {
            title: String,
            content: String
        },
        methods: {
            putToRiver: function (){
                this.$emit('cardChosen', {
                    "title" : this.title,
                    "content": this.content
                });
            }
        }
    }
</script>

