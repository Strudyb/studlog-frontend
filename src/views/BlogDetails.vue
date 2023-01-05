<template>
  <div class="container mx-auto py-20">
    <div class="grid grid-cols-12 gap-10">
      <div class="col-span-12 md:col-span-9">
        <div
          class="blog-card rounded-t-md rounded-b-md transition-shadow bg-white shadow-md hover:shadow-xl p-10"
        >
          <div class="blog-img">
            <img class="mx-auto" :src="blog.imageCover" :alt="blog.title" />
          </div>

          <div class="blog-body">
            <h1 class="font-bold mt-5 text-center text-2xl mb-3">
              {{ blog.title }}
            </h1>

            <p>
              {{ blog.content }}
            </p>
          </div>
        </div>
      </div>

      <div class="col-span-12 md:col-span-3">
        <div
          class="author-card flex flex-col justify-center items-center rounded-t-md rounded-b-md transition-shadow bg-white shadow-md hover:shadow-xl p-10"
        >
          <h4
            class="font-bold text-brand text-center mb-6 border-b border-brand border-solid w-full"
          >
            Author
          </h4>

          <div class="mb-5">
            <img
              :src="author.photo"
              :alt="author.name"
              class="rounded-full w-[120px] h-[120px]"
            />
          </div>
          <span class="font-bold">{{ author.name }} {{ author.surname }}</span>
        </div>

        <div
          class="newest-articles rounded-t-md rounded-b-md transition-shadow bg-white shadow-md hover:shadow-xl p-10 mt-10"
        >
          <h4
            class="font-bold text-brand text-center mb-6 border-b border-brand border-solid"
          >
            Newest Articles
          </h4>
          <div
            v-for="(article, index) in newestArticles"
            :key="index"
            class="sidebar-newest-article flex items-center gap-3 mb-4 drop border-b border-gray-200 border-solid pb-4"
          >
            <div class="basis-[40px]">
              <router-link
                :to="{ name: 'blogDetail', params: { id: article._id } }"
              >
                <img
                  :src="article.imageCover"
                  :alt="article.title"
                  class="rounded-full w-[40px] h-[40px]"
                />
              </router-link>
            </div>
            <router-link
              :to="{ name: 'blogDetail', params: { id: article._id } }"
            >
              <span class="font-bold text-xs flex-1">{{ article.title }}</span>
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      blog: {},
      newestArticles: [],
    };
  },

  computed: {
    author() {
      return this.blog.author || {};
    },
  },

  created() {
    this.getSingleBlog();
    this.getNewestArticles();
  },

  methods: {
    getSingleBlog() {
      axios
        .get(`https://studlog-backend.herokuapp.com/v1/blogs/${this.$route.params.id}`)
        .then((res) => {
          this.blog = res.data.data.blog;
        })
        .catch(console.log);
    },

    getNewestArticles() {
      axios
        .get("https://studlog-backend.herokuapp.com/v1/blogs/newest")
        .then((res) => {
          this.newestArticles = res.data.data.blogs;
        })
        .catch((error) => console.log(error));
    },
  },
};
</script>

<style></style>
