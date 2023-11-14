<template>
  <div class="tabs">
    <tab-btn
      name="Посты"
      @click="activeTab !== 'posts' && $emit('set-tab', 'posts')"
      :class="{ 'active-tab': activeTab === 'posts' }"
    />
    <tab-btn
      name="Пользователи"
      @click="$emit('set-tab', 'users')"
      :class="{ 'active-tab': activeTab === 'users' }"
    />
  </div>
</template>

<script setup>
import { defineProps, defineEmits } from "vue";
import TabBtn from "./TabBtn.vue";

defineProps({
  activeTab: String,
});

defineEmits(["set-tab"]);
</script>


<style lang="scss" scoped>
.tabs {
  display: flex;
  gap: 20px;
  margin-bottom: 20px;
}
</style>