<template>
  <div class="create-blog container mx-auto py-20">
    <form>
      <div class="form-row">
        <label class="block text-sm font-medium text-slate-700">
          Blog Title
        </label>
        <input v-model="blog.title" type="text" class="w-full" />
      </div>

      <div class="form-row">
        <label class="block text-sm font-medium text-slate-700">
          Short Description
        </label>
        <textarea v-model="blog.shortDescription" rows="2" class="w-full" />
      </div>

      <div class="form-row">
        <label class="block text-sm font-medium text-slate-700">
          Text Content
        </label>
        <textarea v-model="blog.content" rows="5" class="w-full" />
      </div>

      <div class="form-row">
        <label class="block text-sm font-medium text-slate-700">Categories</label>
        <BSelect :value="blog.categories" :options="categoryOptions" :is-multiple="true" track-by="name" @input="handleSelect" />
      </div>

      <div class="form-row">
        <label class="block text-sm font-medium text-slate-700"> Image </label>
        <input
          v-model="blog.imageCover"
          ref="imgUpload"
          type="text"
          class="w-full"
        />
      </div>

      <div class="form-row text-center">
        <template v-if="!blogId">
          <button
            type="submit"
            class="
              bg-brand
              text-white
              font-medium
              rounded
              p-2
              hover:bg-brand-dark
            "
            @click.prevent="createBlog"
          >
            Create Blog
          </button>
        </template>
        <template v-else>
          <button
            type="submit"
            class="
              bg-brand
              text-white
              font-medium
              rounded
              p-2
              hover:bg-brand-dark
            "
            @click.prevent="updateBlog"
          >
            Update Blog
          </button>
        </template>
      </div>
    </form>
  </div>
</template>

<script>
import BSelect from '../components/BSelect.vue'
import axios from "axios";

export default {
  name: "CreateBlog",
  
  components: {
    BSelect
  },

  data() {
    return {
      blog: {
        title: "",
        shortDescription: "",
        content: "",
        imageCover: "",
        categories: []
      },
      categoryOptions: []
    };
  },

  computed: {
    blogId() {
      return this.$route.params.id;
    },
    userId() {
      return this.$store.getters['getUserId']
    }
  },

  created() {
    if (this.blogId) {
      axios
        .get(`https://studlog-backend.herokuapp.com/v1/blogs/${this.blogId}`)
        .then((res) => {
          const { title, shortDescription, content, imageCover, categories } = res.data.data.blog;
          this.blog.title = title;
          this.blog.shortDescription = shortDescription;
          this.blog.content = content;
          this.blog.imageCover = imageCover;
          this.blog.categories = categories
        })
        .catch(console.log);
    }

    this.getCategories()
  },

  methods: {
    handleFileUpload(event) {
      console.log(event.target.files[0]);
      this.blog.imageCover = event.target.files[0].name;
    },

    createBlog() {
      this.$axios
        .post("https://studlog-backend.herokuapp.com/v1/blogs", {...this.blog, author: this.userId })
        .then((res) => {
          console.log(res);
        })
        .catch(({ data }) => alert(data.message));
    },

    updateBlog() {
      axios
        .patch(`https://studlog-backend.herokuapp.com/v1/blogs/${this.blogId}`, this.blog)
        .then((res) => {
          console.log(res);
        })
        .catch(({ data }) => alert(data.message));
    },

    getCategories() {
      axios
        .get("https://studlog-backend.herokuapp.com/v1/category")
        .then((res) => {
          this.categoryOptions = res.data.data.categories.map(({ name }) => (name))
        })
        .catch((error) => console.log(error));
    },

    handleSelect(val) {
      this.blog.categories = val
    }
  },
};
</script>

<style lang="postcss">
.create-blog {
  form {
    .form-row {
      @apply mb-3;
    }
    label {
      @apply text-brand font-bold tracking-wider text-sm;
    }
    input,
    textarea {
      @apply mt-1 block px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
      focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500;
    }
  }
}
</style>