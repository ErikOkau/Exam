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
    <div class="full-width row items-center justify-center">
        <QForm @submit="onSubmit" class="q-gutter-md" style="min-width: 30rem; margin-top: 5rem;">
            <h5>Login</h5>
            <QInput filled v-model="email" label="Email">
                <template v-slot:append>
                    <QIcon name="close" @click="email = ''" class="cursor-pointer" />
                </template>
            </QInput>
            <QInput filled v-model="password" label="Password" type="password">
                <template v-slot:append>
                    <QIcon name="close" @click="password = ''" class="cursor-pointer" />
                </template>
            </QInput>
    
            <QBtn label="Submit" type="submit" color="secondary" />
        </QForm>
    </div>
</template>


<style scoped lang="scss"></style>