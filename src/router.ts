import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import { Question } from "./models/Question.model";
import HomePage from "./pages/Home.vue";
import QuestionPage from "./pages/Question.vue";
import ProfilePage from "./pages/Profile.vue";

const pages: RouteRecordRaw[] = [
  { path: "/", component: HomePage },
  { path: "/profile", component: ProfilePage },
  { path: "/question", component: QuestionPage, props: { question: Question } },
];

const router = createRouter({
  history: createWebHistory(),
  routes: pages,
});

export { router };
