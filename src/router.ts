import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import { Question } from "./models/Question.model";
import HomePage from "./pages/Home.vue";
import QuestionPage from "./pages/Question.vue";
import ProfilePage from "./pages/Profile.vue";
import LoginPage from "./pages/Login.vue";
import { AuthService } from "./services/auth.service";

const pages: RouteRecordRaw[] = [
  { path: "/login", component: LoginPage, name: "Login" },
  { path: "/", component: HomePage, name: "Home" },
  { path: "/profile", component: ProfilePage, name: "Profile" },
  { path: "/question", component: QuestionPage, props: true, name: "Question" },
];

const router = createRouter({
  history: createWebHistory(),
  routes: pages,
});

router.beforeEach((to, from, next) => {
  console.log("before each");
  if (to.name !== "Login" && !AuthService.instance.isLoggedIn.value) next({ name: "Login" });
  else next();
});

export { router };
