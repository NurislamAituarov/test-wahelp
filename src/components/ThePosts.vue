<template>
  <div v-if="posts.length" class="container">
    <h2 class="username" v-if="userId">
      Посты пользователя: <span> {{ getUserName }}</span>

      <button @click="setTab('posts', 'reset')" class="btn">&times;</button>
    </h2>

    <sort-box :user-id="userId" />

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
import { computed, onMounted, ref, inject } from "vue";
import { posts, getPosts, users } from "@/modules/main";
import PostItem from "./PostItem.vue";
import SortBox from "./SortBox.vue";

const props = defineProps({
  userId: Number,
});
const setTab = inject(["set-tab"]);

const amountPosts = ref(20);

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

// бесконечный скролл
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
  span {
    font-weight: 500;
    margin-left: 5px;
  }
  .btn {
    padding: 0 5px;
    color: red;
    background-color: rgb(201, 201, 201);
    margin-left: 20px;
    font-size: 22px;
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