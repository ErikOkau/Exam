<script setup lang="ts">
const route = useRoute()
const router = useRouter()

const breadcrumbs = computed(() => {
  const pathList = route.fullPath.split("/").filter(Boolean)

  return pathList.map((path) => {
    if (path == "artikkel/newArticle") return { path: "Artikkel", name: path }

    return { path, name: path }
  })
})

const listItems = [
  { name: " Ny artikkel", caption: "Lag ny artikkel", path: "/artikkel/newArticle"},
]


async function logout() {
    const response = await $fetch('/api/auth/logout', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        }
    })

    router.push('/login')
    window.location.reload()
}

const loggedIn = ref(false)



onMounted(async () => {
    const response = await $fetch('/api/auth/decrypt', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    if (response.status === 200) {
        loggedIn.value = true
    } else {
        loggedIn.value = false
        router.push('/login')
    }
})


</script>

<template>
  <QLayout view="hHh lpR lFf">
    <QDrawer show-if-above side="left" behavior="desktop" elevated>

      <QList separator>
        <QItem clickable v-ripple v-for="item in listItems" :to="item.path" active-class="text-positive">
          <QItemSection>
            <QItemLabel class="text-bold">{{ item.name }}</QItemLabel>
            <QItemLabel caption>{{ item.caption }}</QItemLabel>
          </QItemSection>
        </QItem>
      </QList>

    </QDrawer>

    <QHeader elevated class="bg-secondary text-white">
      <QToolbar inset>
        <QToolbarTitle class="row items-center">
          Solcellespesialisten

          <QBreadcrumbs active-color="white" style="font-size: 16px; margin-left: 10rem;">
            <QBreadcrumbsEl label="Home" icon="home" to="/" />
            <QBreadcrumbsEl v-for="item in breadcrumbs" :label="item.path[0].toUpperCase() + item.path.slice(1)"
              :to="{ name: item.name }" />
          </QBreadcrumbs>

          <!--Logout button-->
          <QBtn flat round dense icon="logout" class="q-ml-md" @click="logout" style="margin-left: auto;" v-if="loggedIn">Logout</QBtn>

        </QToolbarTitle>
      </QToolbar>
    </QHeader>

    <QPageContainer>
      <NuxtPage />
    </QPageContainer>

  </QLayout>
</template>


<style scoped lang="scss"></style>