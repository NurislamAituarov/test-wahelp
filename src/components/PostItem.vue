<template>
  <li class="post">
    <h3>{{ index + 1 }} Post</h3>
    <p>{{ postItem.body }}</p>
    <p><strong>Пользователь:</strong> {{ getUser(postItem.userId).name }}</p>
    <h4>Комментарии:</h4>
    <ul class="comments">
      <li v-for="comment in allComments" :key="comment.id">
        {{ comment.body }}
      </li>
    </ul>

    <form-create-comments
      :modal-value="commentsValue"
      :is-loading="isLoading"
      @update:modal-value="(newValue) => (commentsValue = newValue)"
      @submit.prevent="commentsValue && addComment(post.id)"
    />
  </li>
</template>

<script setup>
import { computed, ref } from "vue";
import { post } from "@/api";
import FormCreateComments from "./FormCreateComments.vue";
import { getComments, getUser } from "@/modules/main";

const props = defineProps({
  postItem: Object,
  index: Number,
});

const commentsValue = ref();
const createdDataComments = ref([]);
const isLoading = ref(false);

const allComments = computed(() => {
  const comments = getComments(props.postItem.id);
  if (createdDataComments.value.length) {
    return [...comments, ...createdDataComments.value];
  }
  return comments;
});

function addComment(postId) {
  isLoading.value = true;
  post("/comments", {
    postId,
    name: "Name",
    email: "email@example.com",
    body: commentsValue,
  })
    .then((res) => {
      createdDataComments.value.push({
        ...res.data,
        body: commentsValue.value,
      });
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      commentsValue.value = "";
      isLoading.value = false;
    });
}
</script>

