<template>
  <div class="all-blogs pt-10 pb-10">
    <div class="container mx-auto">
      <template v-if="!posts.length">
        <div class="text-center">No post available in this category</div>
      </template>

      <template v-else>
        <BlogCard :blog-data="posts" />
      </template>
    </div>
  </div>
</template>

<script>
import BlogCard from "../components/BlogCard.vue";

export default {
  name: "CategoryPosts",
  components: {
    BlogCard,
  },
  data() {
    return {
      posts: [],
    };
  },
  computed: {
    categoryName() {
      return this.$route.params.category || "";
    },
  },
  created() {
    this.getAllPostRelatedCategory();
  },
  methods: {
    getAllPostRelatedCategory() {
      this.$axios
        .get(`https://studlog-backend.herokuapp.com/v1/blogs/category/${this.categoryName}`)
        .then((res) => {
          this.posts = res.data.data.blogs;
        })
        .catch((error) => console.log(error));
    },
  },
};
</script>

<style></style>
