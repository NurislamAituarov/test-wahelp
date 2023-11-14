import { get } from '@/api';
import axios from 'axios';
import { ref } from 'vue';

export const posts = ref([]);
export const users = ref([]);
export const comments = ref([]);

export function fetchData() {
  axios
    .all([get('/posts'), get('/users'), get('/comments')])
    .then(
      axios.spread((postsRes, usersRes, commentsRes) => {
        posts.value = postsRes.data;
        users.value = usersRes.data;
        comments.value = commentsRes.data;
      }),
    )
    .catch((error) => {
      console.error('Error fetching data:', error);
    });
}

export function getPosts(id) {
  return posts.value.filter((post) => post.userId === id);
}

export function getUser(userId) {
  return users.value.find((user) => user.id === userId) || {};
}
export function getComments(postId) {
  return comments.value.filter((comment) => comment.postId === postId);
}
