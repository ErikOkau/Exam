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
    const data = await response.json()
    if (data.status === 200) {
        router.push('/')
    }
}

</script>
<template>
    <QForm @submit="onSubmit" class="q-gutter-md q-ml-xl q-mt-lg" style="max-width: 15rem;">
        <h5>Login</h5>
        <QInput class="inset-shadow-down" outlined v-model="email" label="Email" />
        <QInput class="inset-shadow-down" outlined v-model="password" label="Password" type="password" />
        <QBtn label="Submit" type="submit" color="secondary" />
    </QForm>
</template>


<style scoped lang="scss"></style>