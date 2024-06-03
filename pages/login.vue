<script setup lang="ts">
const email = ref('')
const password = ref('')
const router = useRouter()

function onSubmit() {
    
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


<style scoped lang="scss">
h5 {
    margin-bottom: 1rem;
}

html,
body {
  margin: 0;
  height: 100%;
  overflow: hidden;
}
</style>