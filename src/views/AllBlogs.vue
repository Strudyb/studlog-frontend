<template>
  <div class="all-blogs pt-10 pb-10">
    <div class="container mx-auto">
      <BlogCard :blog-data="posts" />
    </div>
  </div>
</template>

<script>
import BlogCard from "../components/BlogCard.vue";

export default {
  name: "AllBlogs",
  components: {
    BlogCard,
  },
  data() {
    return {
      posts: [],
    };
  },
  created() {
    this.getAllBlogs();
  },
  methods: {
    getAllBlogs() {
      this.$axios
        .get("https://studlog-backend.herokuapp.com/v1/blogs")
        .then((res) => {
          this.posts = res.data.data.blogs;
        })
        .catch((error) => console.log(error));
    },
  },
};
</script>

<style></style>
