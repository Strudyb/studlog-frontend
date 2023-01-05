<template>
  <div class="login container mx-auto pt-10 w-96">
    <form>
      <div class="form-row">
        <label class="block text-sm font-medium text-slate-700">
          User E-mail
        </label>
        <input v-model="user.email" type="text" class="w-full" />
      </div>

      <div class="form-row">
        <label class="block text-sm font-medium text-slate-700">
          User Password
        </label>
        <input v-model="user.password" type="password" class="w-full" />
      </div>

      <div class="form-row text-center">
        <button
          type="submit"
          class="bg-brand text-white font-medium rounded p-2 hover:bg-brand-dark mr-3 transition-all"
          @click.prevent="login"
        >
          Login
        </button>
        <button
          type="button"
          class="bg-white border-[1px] border-solid border-brand text-brand font-medium rounded p-2 hover:bg-brand-dark hover:text-white transition-all"
          @click="navigateRegister"
        >
          Don't have account? Sign Up
        </button>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  name: "Login",
  data() {
    return {
      user: {
        email: "",
        password: "",
      },
    };
  },

  methods: {
    login() {
      this.$axios
        .post("https://studlog-backend.herokuapp.com/v1/users/login", this.user)
        .then((res) => {
          this.$store.dispatch("setAccessToken", res.data.token);
          this.$store.dispatch("setUser", res.data.user);
        })
        .then(() => {
          setTimeout(() => {
            this.$router.push({ name: "home" });
          }, 500);
        })
        .catch(({ data }) => {
          alert(data.message);
        });
    },
    navigateRegister() {
      this.$router.push({ name: "register" });
    },
  },
};
</script>

<style lang="postcss">
.login {
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
