<script setup lang="ts">

const props = defineProps({
    usersProp: Array
})
const users = ref([])
// const users = ref(props.usersProp)

// onMounted(() => {
//     users.value = props.usersProp
// })


watch(() => props.usersProp, (newVal) => {
    users.value = newVal
    console.log('users', users.value)
}, { immediate: true })

const deleteUser = async (user) => {
    await fetch(`/api/users/deleteUser`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ id: user.id })
    })
    users.value = users.value.filter(u => u.id !== user.id)
}
const updateUser = async (user, value, key) => {
    await fetch(`/api/users/updateUser/${user.id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ [key]: value })
    })

    user[key] = value
}
</script>

<template>
    <QTable :rows="users" row-key="id" :columns="[
        { name: 'email', required: true, label: 'Email', align: 'left', field: 'email', sortable: true },
        { name: 'password', required: true, label: 'Password', align: 'left', field: 'password', sortable: true },
        { name: 'role', required: true, label: 'Role', align: 'left', field: 'role', sortable: true },
        { name: 'delete', required: true, label: 'Delete', align: 'left', field: 'delete' },
        { name: 'edit', required: true, label: 'Edit', align: 'left', field: 'edit' }
    ]">
        <template v-slot:body-cell-email="props">
            <QPopupEdit v-model="props.row.email" @save="val => updateUser(props.row, val, 'email')">
                <QTd :props="props">
                    {{ props.row.email }}
                </QTd>
            </QPopupEdit>
        </template>
        <template v-slot:body-cell-password="props">
            <QPopupEdit v-model="props.row.password" @save="val => updateUser(props.row, val, 'password')">
                <QTd :props="props">
                    {{ props.row.password }}
                </QTd>
            </QPopupEdit>
        </template>
        <template v-slot:body-cell-role="props">
            <QPopupEdit v-model="props.row.role" @save="val => updateUser(props.row, val, 'role')">
                <QTd :props="props">
                    {{ props.row.role }}
                </QTd>
            </QPopupEdit>
        </template>

        <template v-slot:body-cell-delete="props">
            <QBtn color="negative" icon="delete" @click="deleteUser(props.row)" />
        </template>

        <template v-slot:body-cell-edit="props">
            <QBtn color="secondary" icon="edit" @click="updateUser(props.row)" />
        </template>
    </QTable>
</template>

<style scoped lang="scss"></style>