<script setup lang="ts">
import { type Article } from '@prisma/client';


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
<div v-show="show" class="q-mt-md">
    <div v-html="titleEl" style="font-size: 1.75rem; color: blue; "></div>
    <div style="font-size: 1.2rem;">{{ article.content }}</div>
</div>
</template>

<style scoped lang="scss">

</style>