import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/sign_up",
      name: "sign_up",
      component: () => import("../views/SignUp.vue"),
    },
    {
      path: "/sign_in",
      name: "sign_in",
      component: () => import("../views/SignIn.vue"),
    },
    {
      path: "/admin/sign_in",
      name: "admin_sign_in",
      component: () => import("../views/SignInAdmin.vue"),
    },
    {
      path: "/courses",
      name: "courses",
      component: () => import("../views/Courses.vue"),
    },
    {
      path: "/courses/mine",
      name: "my_courses",
      component: () => import("../views/CoursesMine.vue"),
    },
    {
      path: "/courses/new",
      name: "new_course",
      component: () => import("../views/CourseNew.vue"),
    },

    {
      path: "/courses/:slug/edit",
      name: "edit_course",
      component: () => import("../views/CourseEdit.vue"),
    },
    {
      path: "/courses/:slug",
      name: "course",
      component: () => import("../views/CourseDetail.vue"),
    },
    {
      path: "/admin/courses",
      name: "admin_rooms",
      component: () => import("../views/CoursesAdmin.vue"),
    },
  ],
});

export default router;
