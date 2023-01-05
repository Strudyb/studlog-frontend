<template>
  <div class="newest-article">
    <div class="container">
      <h2 class="text-2xl font-bold mb-12 leading-6">Newest Articles</h2>

      <div class="grid lg:grid-cols-2 gap-9">
        <article
          v-for="(post, i) in articles"
          :key="i"
          class="post md:flex items-center group blog-card rounded-t-md rounded-b-md transition-shadow bg-white shadow-md hover:shadow-xl"
        >
          <div class="post-image md:w-[250px] flex-shrink-0 flex-grow-0 rounded-[10px] overflow-hidden relative"
          >
            <router-link :to="{ name: 'blogDetail', params: { id: post._id } }">
              <img
                :src="post.imageCover"
                :alt="post.title"
                class="object-cover object-top h-[150px] w-[250px] group-hover:scale-125 transition-all duration-500"
              />
            </router-link>
          </div>

          <div class="post-info flex flex-col justify-center w-full h-full md:px-7 md:py-2 self-center md:mt-0 mt-5">
            <div class="flex">
              <!-- <router-link
                v-for="(category, categoryIndex) in post.categories"
                :key="categoryIndex"
                :to="`/category/${cat}`"
                class="category bg-[#edebf5] capitalize rounded-md px-4 py-1.5 mr-2 hover:bg-primary hover:text-white"
              >
                {{ category.name }}
              </router-link> -->
              <div class="date flex items-center text-gray-600 font-medium">
                <i class="fa-regular fa-calendar"></i>
                <p class="pl-2">{{ formatDate(post.createdAt) }}</p>
              </div>
            </div>
            <h2 class="mb-0 text-lg !leading-relaxed pt-2 md:pt-5">
              <router-link
                :to="{ name: 'blogDetail', params: { id: post._id } }"
                class="hover:text-primary font-bold mb-3 text-lg"
              >
                {{ truncate(post.title, 55, '...') }}
              </router-link>
            </h2>
          </div>
        </article>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { formatDate } from "../mixins/formatDate";
import { truncateString } from "../mixins/truncateString";

export default {
  name: "NewestArticle",
  mixins: [formatDate, truncateString],
  props: {},

  data() {
    return {
      articles: [],
    };
  },

  created() {
    this.getNewestArticles();
  },

  methods: {
    getNewestArticles() {
      this.$axios
        .get("https://studlog-backend.herokuapp.com/v1/blogs/newest")
        .then((res) => {
          this.articles = res.data.data.blogs;
          console.log(res.data.data.blogs);
        })
        .catch((error) => console.log(error));
    },
  },
};
</script>

<style></style>
