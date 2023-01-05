<template>
  <div class="profile-options">
    <div class="container mx-auto">
      <div class="form-group">
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
      </div>

      <div class="form-group">
        <div class="form-row">
          <label class="block text-sm font-medium text-slate-700">
            E-Mail
          </label>
          <input v-model="user.email" type="text" class="w-full" />
        </div>

        <div class="form-row">
          <label class="block text-sm font-medium text-slate-700">
            Photo URL
          </label>
          <input v-model="user.photo" type="text" class="w-full" />
        </div>
      </div>

      <div class="form-row text-center mt-3">
        <button
          class="text-white bg-brand py-2 px-4 rounded-md font-bold"
          @click="updateUser"
        >
          Save Changes
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ProfileOptions",
  data() {
    return {
      user: {
        name: "",
        surname: "",
        email: "",
        photo: "",
      },
    };
  },

  computed: {
    userId() {
      return this.$store.getters["getUserId"];
    },
  },

  created() {
    this.getUserInformations();
  },

  methods: {
    updateUser() {
      this.$axios
        .patch(`https://studlog-backend.herokuapp.com/v1/users/${this.userId}`, this.user)
        .then((res) => {
          if (res) {
            alert("User updated successfully");
          }
        })
        .catch((err) => alert(err));
    },
    getUserInformations() {
      this.$axios
        .get(`https://studlog-backend.herokuapp.com/v1/users/${this.userId}`)
        .then((res) => {
          const { email, name, photo, surname } = res.data.data.user;

          this.user = {
            email,
            name,
            photo,
            surname,
          };
        })
        .catch((err) => alert(err));
    },
  },
};
</script>

<style lang="postcss">
.profile-options {
  .form-group {
    @apply flex justify-center gap-5;

    .form-row {
      @apply basis-1/2;
    }
  }
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
</style>
