<template>
<div class="card" v-on:click="putToRiver()">
    <div class="card-title">{{title}}</div>
    <div class="tag-container">
        <div class="tag"  v-for="tag in tags" v-bind:key="tag">{{tag}}</div>
    </div>
    <div v-html="content" class="card-content">{{content}}</div>
</div>
</template>

<script>
    export default {
        name: 'card',
        props: {
            title: String,
            content: String,
            tags: Array
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

