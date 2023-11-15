<template>
  <form class="form-comments">
    <textarea
      type="text"
      placeholder="напишите комментарий"
      :value="modalValue"
      @input="$emit('update:modalValue', $event.target.value)"
    />
    <button class="btn" :disabled="!modalValue || isLoading" type="submit">
      Добавить комментарии
    </button>
  </form>
</template>

<script setup>
import { defineProps, defineEmits } from "vue";

defineProps(["modalValue", "isLoading"]);
defineEmits(["update:modalValue"]);
</script>


<style lang="scss" scoped>
.form-comments {
  margin-top: 10px;
  display: flex;
  align-items: flex-end;
  gap: 10px;
  textarea {
    width: 50%;
    max-width: 50%;
    min-width: 50%;
    max-height: 100px;
    min-height: 50px;
    padding: 5px 10px;
    border: 1px solid gray;
    border-radius: 4px;
  }
  .btn {
    width: 100%;
    height: 50px;
    padding: 10px 25px;
    background-color: #e0e0e0;
    &:hover {
      background-color: rgb(212, 212, 212);
    }
    &:disabled {
      pointer-events: none;
      background-color: rgb(245, 245, 245);
    }
  }
}

@media all and (max-width: 768px) {
  .form-comments {
    flex-wrap: wrap;
    textarea {
      width: 100%;
      min-width: 100%;
    }
    .btn {
      width: 100%;
    }
  }
}
</style>