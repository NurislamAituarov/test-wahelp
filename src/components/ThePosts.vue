<template>
  <div class="container">
    <h2 class="username" v-if="userId">
      Посты пользователя: {{ getUserName }}

      <button @click="setTab('posts', null)" class="btn">X</button>
    </h2>

    <ul class="posts">
      <post-item
        v-for="(post, ind) of showPosts"
        :key="post.id"
        :post="post"
        :index="ind"
      />
    </ul>

    <div ref="infinitiesScrollTrigger"></div>
  </div>
</template>

<script setup>
import {
  computed,
  onMounted,
  ref,
  watchEffect,
  defineProps,
  inject,
} from "vue";
import { fetchData, posts, getPosts, users } from "@/modules/main";
import PostItem from "./PostItem.vue";

const props = defineProps({
  userId: Number,
});
const amountPosts = ref(20);

const setTab = inject(["set-tab"]);

onMounted(() => {
  fetchData();
  scrollTrigger();
});

watchEffect(() => {
  if (props.userId) {
    getPosts(props.userId);
  }
});

const showPosts = computed(() => {
  return posts.value.filter((post, ind) => ind < amountPosts.value);
});

const getUserName = computed(() => {
  const user = users.value.find((user) => user.id === props.userId);
  return user.name;
});

const infinitiesScrollTrigger = ref();
function scrollTrigger() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.intersectionRatio) {
        if (posts.value.length > amountPosts.value) amountPosts.value += 20;
      }
    });
  });
  observer.observe(infinitiesScrollTrigger.value);
}
</script>


<style lang="scss">
.posts {
  padding: 0;
}
.post {
  padding: 10px;
  border: 1px solid black;
  margin-bottom: 20px;
  border-radius: 4px;
  list-style: none;
}
.comments {
  padding-left: 40px;
}
.username {
  margin-bottom: 20px;
}
.username {
  display: flex;
  align-items: center;
  gap: 20px;
  .btn {
    padding: 5px 10px;
    color: red;
    border-radius: 4px;
    background-color: rgb(201, 201, 201);
    transition: all 0.5s;
    &:hover {
      opacity: 0.8;
    }
  }
}
</style>