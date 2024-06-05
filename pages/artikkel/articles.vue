<script setup lang="ts">
import type { Article } from '@prisma/client';
const search = ref()
const articles = ref<Article[]>([])
const editRef = ref(false)

// Fetch all articles
onMounted(async () => {
    const response = await $fetch('/api/article/allArticles')

    console.log(response)

    articles.value = response.articles as Article[]
})

const loggedIn = ref(false)

// Check if user is logged in
onMounted(async () => {
    const response = await $fetch('/api/auth/decrypt', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    if (response.status === 200) {
        loggedIn.value = true
    } else {
        loggedIn.value = false
    }
})

// Delete article
async function deleteArticle(articleId: any) {  
    const response = await fetch(`/api/article/deleteArticle`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            id: articleId
        })
    })
    if (response.ok) {
        articles.value = articles.value.filter(article => article.id !== articleId)
    } else {
        console.log('Error deleting article')
    }
}

async function updateArticle(articleId: any) {
    const response = await fetch(`/api/article/updateArticle`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            id: articleId,
            title: articles.value.find(article => article.id === articleId)?.title,
            content: articles.value.find(article => article.id === articleId)?.content
        })
    })
    if (response.ok) {
        console.log('Article updated')
    } else {
        console.log('Error updating article')
    }
}


</script>


<template>
    <div class="full-width column items-center justify-center">
        <QInput v-model="search" placeholder="Søk etter artikkel" style="min-width: 50rem;" />
        <div v-for="article in articles" :key="article.id" style="display: flex; flex-direction: row; max-width: 50rem;">
            <MainArticle 
                :article="article" 
                :search="search" 
            
                style="min-width: 50rem;" />

            <QBtn v-if="loggedIn" dense style="max-height: 2.5rem; margin-top: 2rem;" @click="editRef = true" color="blue">Edit</QBtn>
            <div v-if="editRef" style="display: flex; flex-direction: column; max-width: 10rem;" class="q-ma-md">
                <QInput v-model="article.title" label="Title" />
                <QInput v-model="article.content" label="Content" />

                <QBtn label="Submit" type="submit" color="secondary" @click="updateArticle(article.id)" />
            </div>
            <QBtn v-if="loggedIn" dense style="max-height: 2.5rem; margin-top: 2rem;" @click="deleteArticle(article.id)" color="red">Delete</QBtn>
        </div>
    </div>
</template>

<style scoped lang="scss"></style>