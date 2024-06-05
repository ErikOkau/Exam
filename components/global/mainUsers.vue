<script setup lang="ts">
import { type User } from '@prisma/client';


// Highlight search
const props = defineProps<{
  user: User;
  search: string
}>();

// Highlight search
const titleEl = computed(() => {
    const title = props.user.email;

    const { html, isMatch } = highlightSearch(title, props.search);

    if(!props.search) {
        show.value = true
    } else {
        show.value = isMatch;
    }

    return html
})

// Highlight search
const show = ref(true)

</script>

<template>
<div v-show="show" class="q-mt-md">
    <div v-html="titleEl" style="font-size: 1.75rem; color: blue; "></div>
    <div style="font-size: 1.2rem;">{{ user.role }}</div>
</div>
</template>

<style scoped lang="scss">

</style>