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

export function getComments(postId) {
  return comments.value.filter((comment) => comment.postId === postId);
}
export function getUser(userId) {
  return users.value.find((user) => user.id === userId) || {};
}

const originalOrder = ref([]);

export function alphabeticalSortingPosts() {
  originalOrder.value = [...posts.value];
  posts.value.sort((a, b) => {
    const nameA = getUser(a.userId).name.toLowerCase();
    const nameB = getUser(b.userId).name.toLowerCase();

    if (nameA < nameB) return -1;
    if (nameA > nameB) return 1;

    return 0;
  });
}

export function revertSortingPosts() {
  posts.value = [...originalOrder.value];
}
