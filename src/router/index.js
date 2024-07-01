import { nextTick } from "vue";
import { createRouter, createWebHashHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
      meta: { title: "Booom! - Home Page" },
    },
    {
      path: "/sign_up",
      name: "sign_up",
      component: () => import("../views/SignUp.vue"),
      meta: { title: "Booom! - Sign Up" },
    },
    {
      path: "/sign_in",
      name: "sign_in",
      component: () => import("../views/SignIn.vue"),
      meta: { title: "Booom! - Sign In" },
    },
    {
      path: "/admin/sign_in",
      name: "admin_sign_in",
      component: () => import("../views/SignInAdmin.vue"),
      meta: { title: "Booom! - Admin Sign In" },
    },
    {
      path: "/courses",
      name: "courses",
      component: () => import("../views/Courses.vue"),
      meta: { title: "Booom! - Discover Courses" },
    },
    {
      path: "/courses/mine",
      name: "my_courses",
      component: () => import("../views/CoursesMine.vue"),
      meta: { title: "Booom! - My Courses" },
    },
    {
      path: "/courses/new",
      name: "new_course",
      component: () => import("../views/CourseNew.vue"),
      meta: { title: "Booom! - New Course" },
    },

    {
      path: "/courses/:slug/edit",
      name: "edit_course",
      component: () => import("../views/CourseEdit.vue"),
      meta: { title: "Booom! - Edit Course" },
    },
    {
      path: "/courses/:slug",
      name: "course",
      component: () => import("../views/CourseDetail.vue"),
      meta: { title: "Booom! - Course Details" },
    },
    {
      path: "/admin/courses",
      name: "admin_rooms",
      component: () => import("../views/CoursesAdmin.vue"),
      meta: { title: "Booom! - Courses Management" },
    },
  ],
});

const DEFAULT_TITLE = "Booom!";
router.afterEach((to, from) => {
  nextTick(() => {
    document.title = to.meta.title || DEFAULT_TITLE;
  });
});

export default router;
