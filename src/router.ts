import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import { Question } from "./models/Question.model";
import HomePage from "./pages/Home.vue";
import QuestionPage from "./pages/Question.vue";
import ProfilePage from "./pages/Profile.vue";
import LoginPage from "./pages/Login.vue";
import SearchPage from "./pages/Search.vue";
import { AuthService } from "./services/auth.service";

const pages: RouteRecordRaw[] = [
  { path: "/login", component: LoginPage, name: "Login" },
  { path: "/", component: HomePage, name: "Home" },
  { path: "/profile/:user", component: ProfilePage, name: "Profile", props: true },
  { path: "/question/:question", component: QuestionPage, props: true, name: "Question" },
  { path: "/search/:term", component: SearchPage, props: true, name: "Search" },
];

const router = createRouter({
  history: createWebHistory(),
  routes: pages,
});

router.beforeEach((to, from, next) => {
  if (to.name !== "Login" && !AuthService.instance.isLoggedIn.value) next({ name: "Login" });
  else next();
});

export { router };
