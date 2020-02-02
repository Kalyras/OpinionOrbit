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

.card {
    background-color: #f3f3f3;
    padding: 20px;
    margin: 20px;
}

.card-title {
    font-size: 2em;
    font-weight: bold;
}

</style>

