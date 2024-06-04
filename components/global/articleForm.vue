<script setup lang="ts">
import { Notify } from 'quasar';

const confirm = ref(false)
const title = ref('')
const content = ref('')

async function areYouSure() {
    if (title.value === '' || content.value === '') {
        Notify.create({
            message: 'Please fill out all fields',
            color: 'negative',
            position: 'top'
        })
        return
    } else {
        confirm.value = true
    }

}

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

async function confirmPostArticle() {
    await postArticle()
}

</script>

<template>
    <QInput v-model="title" label="Title" class="q-mb-md text-h4">
        <template v-slot:append>
            <QIcon name="send" @click="areYouSure" class="cursor-pointer" />

            <QDialog v-model="confirm" persistent>
                <QCard>
                    <QCardSection class="row items-center">
                        <span class="q-ml-sm">Vil du legge ut artikkelen?</span>
                    </QCardSection>
                    <QCardActions align="right">
                        <QBtn flat label="avbryt" color="secondary" v-close-popup />
                        <QBtn @click="confirmPostArticle" flat label="Legg ut" color="secondary" v-close-popup />
                    </QCardActions>
                </QCard>
            </QDialog>

        </template>
    </QInput>

    <QEditor v-model="content" min-height="5em" placeholder="Start writing your article..." />
</template>

<style scoped lang="scss"></style>