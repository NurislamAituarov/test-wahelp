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

    <form
      @submit.prevent="commentsValue && addComment(post.id)"
      class="form-comments"
    >
      <textarea v-model="commentsValue" type="text" placeholder="New comment" />
      <button type="submit">Add</button>
    </form>
  </li>
</template>

<script setup>
import { post } from "@/api";
import { getComments, getUser, defineProps } from "@/modules/main";
import { computed, ref } from "vue";

const props = defineProps({
  postItem: Object,
  index: Number,
});

const commentsValue = ref();
const createdDataComments = ref([]);

const allComments = computed(() => {
  const comments = getComments(props.postItem.id);
  if (createdDataComments.value.length) {
    return [...comments, ...createdDataComments.value];
  }
  return comments;
});

function addComment(postId) {
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
    });
}
</script>

<style lang="scss" scoped>
.form-comments {
  margin-top: 10px;
  display: flex;
  align-items: center;
  gap: 10px;
  textarea {
    width: 50%;
    max-width: 50%;
    min-width: 275px;
    max-height: 100px;
    min-height: 50px;
    padding: 5px 10px;
    border: 1px solid gray;
    border-radius: 4px;
  }
}
</style>