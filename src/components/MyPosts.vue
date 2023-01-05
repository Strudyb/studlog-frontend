<template>
  <div class="user-posts">
    <div class="container mx-auto">
      <div class="headers grid grid-cols-12 gap-5 bg-slate-400 text-black p-4">
        <div class="col-span-4 font-bold">Title</div>
        <div class="col-span-6 font-bold">Short Description</div>
        <div class="col-span-2 font-bold">Actions</div>
      </div>
      <div
        v-for="(post, index) in posts"
        :key="index"
        class="grid grid-cols-12 gap-5 p-4 border-b items-center hover:bg-slate-100"
      >
        <div class="col-span-4 text-sm font-medium text-brand-dark">
          {{ post.title }}
        </div>
        <div class="col-span-6 text-sm">{{ post.shortDescription }}</div>
        <div class="col-span-2 flex gap-4">
          <button
            class="text-white bg-brand px-2 py-1 rounded-md font-medium text-sm hover:bg-brand-dark transition-all"
            @click="editPost(post._id)"
          >
            Edit
          </button>
          <button
            class="text-white bg-red-600 px-2 py-1 rounded-md font-medium text-sm hover:bg-red-900 transition-all"
            @click="deletePost(post._id)"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "MyPosts",

  data() {
    return {
      posts: [],
    };
  },

  computed: {
    userId() {
      return this.$store.getters["getUserId"];
    },
  },

  created() {
    this.getUserPosts();
  },

  methods: {
    getUserPosts() {
      this.$axios
        .get(`https://studlog-backend.herokuapp.com/v1/blogs/user-posts/${this.userId}`)
        .then((res) => {
          this.posts = res.data.data.blogs;
        });
    },

    editPost(id) {
      this.$router.push({ name: "createBlog", params: { id } });
    },

    deletePost(id) {
      const isWantedToDelete = confirm("Are you sure to delete this post?");

      if (isWantedToDelete) {
        this.$axios
          .delete(`https://studlog-backend.herokuapp.com/v1/blogs/${id}`)
          .then((res) => {
            if (res) {
              alert("Blog deleted successfully")
            }
          })
          .then(this.getUserPosts)
          .catch(({ data }) => alert(data.message));
      }
    },
  },
};
</script>

<style></style>
