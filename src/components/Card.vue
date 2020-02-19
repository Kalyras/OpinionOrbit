<template>
<div class="card" v-on:click="putToRiver()">
    <div class="card-title">{{title}}</div>
    <div class="tag-container">
        <div class="tag"  v-for="tag in tags" v-bind:key="tag">{{tag}}</div>
    </div>
    <div v-html="body" class="card-content">{{body}}</div>
</div>
</template>

<script>
    export default {
        name: 'card',
        props: {
            title: String,
            body: String,
            tags: Array,
            children: Array
        },
        methods: {
            putToRiver: function (){
                this.$emit('cardChosen', {
                    "title" : this.title,
                    "body": this.body,
                    "children": this.children ? this.children : [],
                });
            }
        }
    }
</script>

