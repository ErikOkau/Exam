<script setup lang="ts">
const search = ref()
</script>

<template>
    <QInput v-model="search" />
    <MainArticle 
        :article="{
            title: 'title',
            content: 'content'
        }" 
        :search="search"
    />
</template>

<style scoped lang="scss">

</style>