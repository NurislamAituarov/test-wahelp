<template>
  <div class="container">
    <ul class="users">
      <li v-for="user of users" :key="user" class="user">
        <p>
          <strong>Name:</strong>
          {{ user.name }}
        </p>

        <p>
          <strong>Email:</strong>
          {{ user.email }}
        </p>

        <p>
          <strong>Phone:</strong>
          {{ user.phone }}
        </p>

        <button @click="viewUserPosts(user.id)" class="btn">
          Посмотреть посты пользователя
        </button>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { inject } from "vue";
import { users } from "@/modules/main";
const setTab = inject(["set-tab"]);

function viewUserPosts(id) {
  setTab("posts", id);
}
</script>


<style scoped lang="scss">
.users {
  .user {
    list-style: none;
    padding: 10px;
    border: 1px solid gray;
    margin-bottom: 10px;
    border-radius: 4px;
    .btn {
      padding: 5px 15px;
      margin-top: 10px;
      background-color: #d9d9d9;
      color: black;
      border: 1px solid gray;
      &:hover {
        opacity: 0.8;
      }
    }
  }
}
</style>