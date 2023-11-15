<template>
  <button class="btn btn-tab">{{ name }}</button>
</template>

<script setup>
import { defineProps } from "vue";

defineProps({
  name: String,
});
</script>

<style scoped lang="scss">
.btn-tab {
  outline: none;
  border: none;
  background-color: gray;
  padding: 10px 20px;
  color: rgb(0, 0, 0);
  font-weight: bold;
}
.active-tab {
  background-color: black;
  color: white;
}
</style>