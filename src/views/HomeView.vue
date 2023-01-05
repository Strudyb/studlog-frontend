<template>
  <div class="home-view">
    <div class="hero-section pt-12 pb-12">
      <div class="container mx-auto">
        <div class="grid grid-cols-12 gap-7">
          <div class="lg:col-span-3 col-span-12">
            <HeroCategories :category-data="categories" />
          </div>
          <div class="hidden md:block lg:col-span-9 col-span-12 space-y-[30px]">
            <BlogCard :blog-data="blogs" />
          </div>
        </div>
      </div>
    </div>

    <div class="trending-section pt-12 pb-12 bg-slate-200">
      <div class="container mx-auto">
        <NewestArticle />
      </div>
    </div>
  </div>
</template>

<script>
import BlogCard from "../components/BlogCard.vue";
import HeroCategories from "../components/HeroCategories.vue";
import NewestArticle from "../components/NewestArticle.vue";
import axios from "axios";

export default {
  name: "HomeView",
  components: {
    BlogCard,
    HeroCategories,
    NewestArticle
  },
  data() {
    return {
      blogs: [],
      categories: [],
    };
  },

  created() {
    this.getAllBlogs();
    this.getHeroCategories();
  },

  methods: {
    getAllBlogs() {
      axios
        .get("https://studlog-backend.herokuapp.com/v1/blogs/random")
        .then((res) => {
          this.blogs = res.data.data.blogs;
          console.log(res.data.data.blogs);
        })
        .catch((error) => console.log(error));
    },

    getHeroCategories() {
      axios
        .get("https://studlog-backend.herokuapp.com/v1/category")
        .then((res) => {
          this.categories = res.data.data.categories;
          console.log(res.data.data.categories);
        })
        .catch((error) => console.log(error));
    },
  },
};
</script>
