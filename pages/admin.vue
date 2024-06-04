<script setup lang="ts">

const email = ref('')
const password = ref('')
const role = ref('')

async function registerUser() {
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

</template>

<style scoped lang="scss">

</style>