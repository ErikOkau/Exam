<script setup lang="ts">
import { Role, type User } from '@prisma/client';
import UserTable from '~/components/global/userTable.vue';

const email = ref('')
const password = ref('')
const role = ref('')

const users = ref([]);

onMounted(async () => {
    const res = await fetch('/api/users/getUsers');
    const data = await res.json();

    console.log(data);  // Add this line
    users.value = data.users;
});

const router = useRouter()
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
            <QInput filled v-model="password" label="Password" type="password">
                <template v-slot:append>
                    <QIcon name="close" @click="password = ''" class="cursor-pointer" />
                </template>
            </QInput>
            <QSelect filled v-model="role" :options="['ADMINISTRASJON', 'MONTOR', 'SALG']" label="Role" />
            <QBtn label="Submit" type="submit" color="secondary" />
        </QForm>
    </div>

    <!--Delete a user-->
    <div class="full-width row items-center justify-center">
        <QLayout class="q-ml-xl q-mr-xl">
            <UserTable v-if="users.length" :usersProp="users"  />
        </QLayout>
    </div>
</template>

<style scoped lang="scss"></style>