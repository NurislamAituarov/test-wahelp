<template>
  <div class="tabs">
    <tab-btn
      name="Посты"
      @click="!isActiveTabPosts && $emit('set-tab', tabs.posts)"
      :class="{ 'active-tab': isActiveTabPosts }"
    />
    <tab-btn
      name="Пользователи"
      @click="$emit('set-tab', tabs.users)"
      :class="{ 'active-tab': activeTab === tabs.users }"
    />
  </div>
</template>

<script setup>
import { computed } from "vue";
import TabBtn from "./TabBtn.vue";
import { tabs } from "@/lib/constants";

const props = defineProps({
  activeTab: String,
});
defineEmits(["set-tab"]);

const isActiveTabPosts = computed(() => {
  return props.activeTab === tabs.posts;
});
</script>


<style lang="scss" scoped>
.tabs {
  display: flex;
  gap: 20px;
  margin-bottom: 20px;
}
</style>