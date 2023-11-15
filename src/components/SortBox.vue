<template>
  <div v-if="!userId" class="sort">
    <button v-if="!isSort" @click="sort" class="btn">
      Сортировка по алфавиту
    </button>
    <button v-if="isSort" @click="revertSorting" class="btn">Вернуть</button>
  </div>
</template>

<script setup>
import { ref, defineProps } from "vue";
import { alphabeticalSortingPosts, revertSortingPosts } from "@/modules/main";

defineProps(["userId"]);

const isSort = ref(false);
function sort() {
  isSort.value = true;
  alphabeticalSortingPosts();
}

function revertSorting() {
  isSort.value = false;
  revertSortingPosts();
}
</script>

<style scoped lang="scss">
.sort {
  margin-bottom: 20px;
  display: flex;
  justify-content: flex-end;
  .btn {
    padding: 5px 15px;
    &:hover {
      color: rgb(135, 135, 135);
    }
  }
}
</style>