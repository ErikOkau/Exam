<script setup lang="ts">
const props = defineProps<{
  article: Article;
  search: string
}>();

const titleEl = computed(() => {
    const title = props.article.title;

    const { html, isMatch } = highlightSearch(title, props.search);

    if(!props.search) {
        show.value = true
    } else {
        show.value = isMatch;
    }

    return html
})

const show = ref(true)
</script>

<template>
<div v-show="show">
    <div v-html="titleEl"></div>
    <div>{{ article.content }}</div>
</div>
</template>

<style scoped lang="scss">

</style>