<template>
  <div class="login container mx-auto pt-10 w-96">
    <form>
      <div class="form-row">
        <label class="block text-sm font-medium text-slate-700"> Name </label>
        <input v-model="user.name" type="text" class="w-full" />
      </div>

      <div class="form-row">
        <label class="block text-sm font-medium text-slate-700">
          Surname
        </label>
        <input v-model="user.surname" type="text" class="w-full" />
      </div>

      <div class="form-row">
        <label class="block text-sm font-medium text-slate-700"> E-mail </label>
        <input v-model="user.email" type="text" class="w-full" />
      </div>

      <div class="form-row">
        <label class="block text-sm font-medium text-slate-700">
          Password
        </label>
        <input v-model="user.password" type="password" class="w-full" />
      </div>

      <div class="form-row">
        <label class="block text-sm font-medium text-slate-700">
          Password Confirm
        </label>
        <input v-model="user.passwordConfirm" type="password" class="w-full" />
      </div>

      <div class="form-row text-center">
        <button
          type="submit"
          class="bg-brand text-white font-medium rounded p-2 hover:bg-brand-dark mr-3 transition-all"
          @click.prevent="register"
        >
          Register
        </button>
        <button
          type="button"
          class="bg-white border-[1px] border-solid border-brand text-brand font-medium rounded p-2 hover:bg-brand-dark hover:text-white transition-all"
          @click="navigateLogin"
        >
          Have account? Log In
        </button>
      </div>
    </form>
  </div>
</template>

<script>
const DefaultUserData = {
  name: "",
  surname: "",
  email: "",
  password: "",
  passwordConfirm: "",
};

export default {
  name: "Register",
  data() {
    return {
      user: { ...DefaultUserData },
    };
  },

  created() {
    console.log(this.$store.getters["getAccessToken"]);
  },

  methods: {
    register() {
      this.$axios
        .post("https://studlog-backend.herokuapp.com/v1/users/signup", this.user)
        .then((res) => {
          this.$store.dispatch("setAccessToken", res.data.token);
        })
        .then((this.user = DefaultUserData))
        .then(() => {
          setTimeout(() => {
            this.$router.push({ name: 'home' })
          }, 500);
        })
        .catch(({ data }) => {
          alert(data.message);
        });
    },
    navigateLogin() {
      this.$router.push({ name: "login" });
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
