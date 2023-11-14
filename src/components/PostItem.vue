<template>
  <li class="post">
    <h3>{{ index + 1 }} Post</h3>
    <p>{{ post.body }}</p>
    <p><strong>Пользователь:</strong> {{ getUser(post.userId).name }}</p>
    <h4>Комментарии:</h4>
    <ul class="comments">
      <li v-for="comment in getComments(post.id)" :key="comment.id">
        {{ comment.body }}
      </li>
    </ul>
  </li>
</template>

<script setup>
import { getComments, getUser, defineProps } from "@/modules/main";

defineProps({
  post: Object,
  index: Number,
});
</script>