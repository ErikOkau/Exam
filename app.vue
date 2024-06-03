<script setup lang="ts">
const route = useRoute()

const breadcrumbs = computed(() => {
  const pathList = route.fullPath.split("/").filter(Boolean)

  return pathList.map((path) => {
    if (path == "a") return { path: "Artikkel", name: path }

    return { path, name: path }
  })
})

const listItems = [
  { name: "Artikkel", caption: "Se artikler", path: "/a"},
]
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
          Mock-exam

          <QBreadcrumbs active-color="white" style="font-size: 16px; margin-left: 10rem;">
            <QBreadcrumbsEl label="Home" icon="home" to="/" />
            <QBreadcrumbsEl v-for="item in breadcrumbs" :label="item.path[0].toUpperCase() + item.path.slice(1)"
              :to="{ name: item.name }" />
          </QBreadcrumbs>

        </QToolbarTitle>
      </QToolbar>
    </QHeader>

    <QPageContainer>
      <NuxtPage />
    </QPageContainer>

  </QLayout>
</template>


<style scoped lang="scss"></style>