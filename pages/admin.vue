<script setup lang="ts">
import { encrypt } from '~/server/utils/auth'



const newUser = ref({
    email: '',
    password: '',
    role: ''
})

async function createUser() {

}

</script>

<template>
        <QForm @submit="createUser" class="q-gutter-md q-ml-xl q-mt-xl" style="max-width: 15rem;">
            <h5>Register</h5>
            <QInput class="inset-shadow-down" outlined v-model="newUser.email" label="Email" />
            <QInput class="inset-shadow-down" outlined v-model="newUser.password" label="Password" type="password" />
            <QInput class="inset-shadow-down" outlined v-model="newUser.role" label="Role" />
            <QBtn label="Submit" type="submit" color="secondary" />
        </QForm>
</template>

<style scoped lang="scss">

</style>