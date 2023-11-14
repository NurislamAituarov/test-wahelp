<template>
  <main class="main">
    <the-tabs @set-tab="setTab" :active-tab="activeTab" />
    <component :is="routes[activeTab]" :user-id="userId"> </component>
  </main>
</template>

<script setup>
import { provide, ref } from "vue";
import ThePosts from "./components/ThePosts.vue";
import TheUsers from "./components/TheUsers.vue";
import TheTabs from "./components/TheTabs.vue";
import { fetchData } from "./modules/main";
const activeTab = ref("posts");

const routes = {
  posts: ThePosts,
  users: TheUsers,
};
const userId = ref(null);

function setTab(tab, id) {
  activeTab.value = tab;
  userId.value = +id;
  if (!id) {
    fetchData();
  }
}

provide("set-tab", setTab);
</script>

<style lang="scss">
@import url("./assets/style/main.scss");
</style>
