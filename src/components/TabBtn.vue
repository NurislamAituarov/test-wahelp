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
  padding: 10px;
  border-radius: 4px;
  cursor: pointer;
  color: rgb(255, 255, 255);
  transition: all 0.5s;
  &:hover {
    background-color: rgb(164, 164, 164);
  }
}
.active-tab {
  background-color: black;
  color: white;
}
</style>