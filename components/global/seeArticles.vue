<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { Notify } from 'quasar';
import { prisma } from '~/server/server'
import { type Article } from "@prisma/client";

const articles = ref<Article[]>([]);

onMounted(async () => {
  try {
    const response = await fetch('/api/article/allArticles');
    if (!response.ok) {
      throw new Error('Failed to fetch articles');
    }
    articles.value = await response.json();
    console.log(articles.value)
  } catch (error) {
    Notify.create({
      message: error.message,
      color: 'negative',
    });
  }
});
</script>

<template>
  <div>
    <div v-for="(article, index) in articles" :key="index">
      <h2>{{ article.title }}</h2>
    </div>
  </div>
</template>

<style scoped lang="scss">

</style>