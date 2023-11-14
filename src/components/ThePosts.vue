<template>
  <div v-if="posts.length" class="container">
    <h2 class="username" v-if="userId">
      Посты пользователя: {{ getUserName }}

      <button @click="setTab('posts', 'reset')" class="btn">X</button>
    </h2>

    <ul class="posts">
      <post-item
        v-for="(post, ind) of showPosts"
        :key="post.id"
        :post-item="post"
        :index="ind"
      />
    </ul>
  </div>

  <p class="loading" v-else>Loading...</p>
  <div ref="infinitiesScrollTrigger"></div>
</template>

<script setup>
import { computed, onMounted, ref, defineProps, inject } from "vue";
import { posts, getPosts, users } from "@/modules/main";
import PostItem from "./PostItem.vue";
const props = defineProps({
  userId: Number,
});
const amountPosts = ref(20);
const setTab = inject(["set-tab"]);
onMounted(() => {
  scrollTrigger();
});

const showPosts = computed(() => {
  if (props.userId) {
    return getPosts(props.userId);
  }
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
  infinitiesScrollTrigger.value &&
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

.loading {
  text-align: center;
  margin: 50px 0;
}
</style>