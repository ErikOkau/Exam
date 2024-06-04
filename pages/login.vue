<script setup lang="ts">
import { useRouter } from 'vue-router'

const email = ref('')
const password = ref('')
const router = useRouter()

async function onSubmit() {
    const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            email: email.value,
            password: password.value
        })
    })
}

</script>
<template>
    <QLayout class="column q-ml-xl" style="max-width: 15rem;">
        <h5>Login</h5>
        <QForm @submit="onSubmit" class="q-gutter-md">
            <QInput class="inset-shadow-down" outlined v-model="email" label="Email" />
            <QInput class="inset-shadow-down" outlined v-model="password" label="Password" type="password" />
            <QBtn label="Submit" type="submit" color="secondary" />
        </QForm>
    </QLayout>
</template>


<style scoped lang="scss"></style>