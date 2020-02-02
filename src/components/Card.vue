<template>
<div class="card">
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
    }
</script>

<style scoped>



</style>

