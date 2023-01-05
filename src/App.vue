<template>
  <div class="page-content">
    <header>
      <div class="logo">
        <div style="font-size: 34px; filter: drop-shadow(3px -2px 2px #757474)">
          STUDLOG
        </div>
      </div>
      <nav class="nav-links">
        <RouterLink class="nav-link" to="/">Home</RouterLink>
        <RouterLink class="nav-link" to="/about">About Me</RouterLink>
        <RouterLink class="nav-link" to="/blogs">Blogs</RouterLink>
        <RouterLink class="nav-link" to="/create-blog">Create Blog</RouterLink>
        <RouterLink
          v-if="isLoggedIn"
          class="nav-link profile disabled"
          to="/profile"
          >Profile</RouterLink
        >
        <RouterLink v-if="!isLoggedIn" class="nav-link login" to="/login"
          >Login</RouterLink
        >
        <RouterLink v-if="!isLoggedIn" class="nav-link register" to="/register"
          >Register</RouterLink
        >
        <RouterLink
          v-if="isLoggedIn"
          class="nav-link bg-red-900 text-white"
          to="/"
          @click="logout"
          >Log Out</RouterLink
        >
      </nav>
    </header>

    <div id="page-view">
      <RouterView :key="$route.fullPath" />
    </div>

    <footer class="bg-by-black py-10">
      <div class="container mx-auto">
        <div class="text-center">
          <div
            class="text-white font-bold"
            style="font-size: 34px; filter: drop-shadow(3px -2px 2px #000)"
          >
            STUDLOG
          </div>
          <p class="text-white">Studied blog posts system</p>
        </div>

        <div class="text-center mt-10 text-white">
          <h6 class="font-bold">Contact</h6>
          <p>E-Mail: me@berk-yilmaz.com</p>
          <p>Phone: 0543 422 61 54</p>
        </div>
      </div>
    </footer>
    <div class="bg-slate-700 p-2 text-white text-center">
      Made with <i class="fa fa-heart"></i> by Berk Yılmaz
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    isLoggedIn() {
      return this.$store.getters["isLoggedIn"];
    },
  },

  methods: {
    logout() {
      this.$store.dispatch("clearAccessToken");
    },
  },
};
</script>

<style lang="postcss">
body {
  @apply text-black;
  background-color: #f5f7fa;
  min-height: 100vh;

  #app {
    /* width: 100%;
    height: 100%; */

    .page-content {
      min-height: 100vh;
      display: flex;
      flex-direction: column;

      #page-view {
        flex: 1;
      }
    }
  }

  header {
    @apply flex items-center justify-between bg-white font-bold px-4 shadow-sm;

    .nav-links {
      @apply flex items-center justify-evenly;

      .nav-link {
        @apply px-5 py-7 text-sm transition-all hover:bg-brand-dark hover:text-white;

        &.profile {
          @apply bg-brand-light hover:bg-brand-dark;
        }

        &.login {
          @apply bg-by-black text-white hover:bg-by-light-black;
        }

        &.register {
          @apply bg-by-light-black text-white hover:bg-by-black;
        }
      }
    }
  }
}
</style>
