import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import CreateBlog from "../views/CreateBlog.vue";
import BlogDetails from "../views/BlogDetails.vue";
import Login from "../views/Login.vue";
import Register from "../views/Register.vue";
import AllBlogs from "../views/AllBlogs.vue";
import About from "../views/About.vue";
import CategoryPosts from "../views/CategoryPosts.vue";
import Profile from "../views/Profile.vue";
import PageNotFound from "../views/PageNotFound.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/create-blog/:id?",
      name: "createBlog",
      component: CreateBlog,
    },
    {
      path: "/blogs",
      name: "blogs",
      component: AllBlogs,
    },
    {
      path: "/blog/:id",
      name: "blogDetail",
      component: BlogDetails,
    },
    {
      path: "/login",
      name: "login",
      component: Login,
    },
    {
      path: "/register",
      name: "register",
      component: Register,
    },
    {
      path: "/about",
      name: "about",
      component: About,
    },
    {
      path: "/category/:category?",
      name: "category",
      component: CategoryPosts,
    },
    {
      path: "/profile",
      name: "profile",
      component: Profile,
    },
    { path: "/:patchMatch(.*)*", name: "NotFound", component: PageNotFound },
  ],
});

router.beforeEach((to, from, next) => {
  const restrictedPages = ["/create-blog", "/profile"];
  const authRequired = restrictedPages.includes(to.path);
  const isLoggedIn = localStorage.getItem("access_token");

  // trying to access a restricted page + not logged in
  // redirect to login page
  if (authRequired && !isLoggedIn) {
    next("/login");
  } else {
    next();
  }
});

export default router;
