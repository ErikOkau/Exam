<script setup lang="ts">
import { Notify } from 'quasar';

const title = ref('')
const content = ref('')

async function postArticle() {
    const response = await fetch('/api/article/newArticle', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            title: title.value,
            content: content.value
        })
    })
    const data = await response.json()
    if (data.status === 201) {
        Notify.create({
            message: 'Article created successfully',
            color: 'positive',
            position: 'top'
        })
        title.value = ''
        content.value = ''
    } else {
        alert('Something went wrong')
    }
}

</script>

<template>
    <QInput v-model="title" label="Title" class="q-mb-md text-h4">
        <template v-slot:append>
            <QIcon name="send" @click="postArticle" class="cursor-pointer" />
        </template>
    </QInput>

    <QEditor v-model="content" min-height="5em" placeholder="Start writing your article..." />
</template>

<style scoped lang="scss"></style>