<script setup lang="ts">
import { Role, type User } from '@prisma/client';

const users = ref<User[]>([])
const search = ref()
const email = ref('')
const password = ref('')
const role = ref('')
const router = useRouter()

// Create a user
async function onSubmit() {
    const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            email: email.value,
            password: password.value,
            role: role.value
        })
    })
    const data = await response.json()
    if (data.status === 201) {
        router.push('/login')
    }
}

// Fetch all users
onMounted(async () => {
    const response = await $fetch('/api/users/getUsers')

    console.log(response)

    users.value = response.users as User[]
})

// Delete user
async function deleteUser(userId: any) {  
    const response = await fetch(`/api/users/deleteUser`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            id: userId
        })
    })
    if (response.ok) {
        users.value = users.value.filter(user => user.id !== userId)
    } else {
        console.log('Error deleting user')
    }
}

</script>

<template>
    <!--Create a user-->
    <div class="full-width row items-center justify-center">
        <QForm @submit="onSubmit" class="q-gutter-md" style="min-width: 30rem; margin-top: 5rem;">
            <h5>Register</h5>
            <QInput filled v-model="email" label="Email">
                <template v-slot:append>
                    <QIcon name="close" @click="email = ''" class="cursor-pointer" />
                </template>
            </QInput>
            <QInput filled v-model="password" label="Password" type="password" >
                <template v-slot:append>
                    <QIcon name="close" @click="password = ''" class="cursor-pointer" />
                </template>
            </QInput>
            <QSelect filled v-model="role" :options="['ADMINISTRASJON', 'MONTOR', 'SALG']" label="Role" />
            <QBtn label="Submit" type="submit" color="secondary" />
        </QForm>
    </div>

    <!--Delete a user and user list-->
    <div class="full-width column items-center justify-center">
        <QInput v-model="search" placeholder="Søk etter brukere" style="min-width: 50rem;" />
        <div v-for="user in users" :key="user.id" style="display: flex; flex-direction: row; max-width: 50rem;">
            <MainUsers 
                :user="user" 
                :search="search" 
            
                style="min-width: 50rem;" />

            <QBtn dense style="max-height: 2.5rem; margin-top: 2rem;" @click="deleteUser(user.id)">Delete</QBtn>
        </div>
    </div>
</template>

<style scoped lang="scss"></style>