import axios from 'axios';

export const host = "http://localhost:5000";

const API = axios.create({ baseURL: host });

API.interceptors.request.use((req) => {
  if (localStorage.getItem('profile')) {
    req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`;
  }

  return req;
});

export const fetchPost = (id) => API.get(`/posts/${id}`);
export const fetchPosts = (page) => API.get(`/posts?page=${page}`);
export const fetchAllPosts = () => API.get(`/posts/all`);
export const fetchPostsByCreator = (name) => API.get(`/posts/creator?name=${name}`);
export const fetchPostsBySearch = (searchQuery) => API.get(`/posts/search?searchQuery=${searchQuery.search || 'none'}&tags=${searchQuery.tags}`);
export const createPost = (newPost) => API.post('/posts', newPost);
export const likePost = (id) => API.patch(`/posts/${id}/likePost`);
export const comment = (value, id) => API.post(`/posts/${id}/commentPost`, { value });
export const updatePost = (id, updatedPost) => API.patch(`/posts/${id}`, updatedPost);
export const deletePost = (id) => API.delete(`/posts/${id}`);

export const signIn = (formData) => API.post('/user/signin', formData);
export const signUp = (formData) => API.post('/user/signup', formData);
export const detailUser = (id) => API.get(`/user/detail/${id}`);
export const allUsers = () => API.get('/user/all');
export const deleteUser = (id) => API.delete(`/user/delete/${id}`);
export const saveUser = (userData) => API.post(`/user/save`, userData);

export const sendMessage = (data) => API.post("/chat/add-msg", data);
export const receiveMessage = (data) => API.post("/chat/get-msg", data);
