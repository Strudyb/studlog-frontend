<template>
  <div class="profile-view">
    <div class="container mx-auto pt-10">
      <div class="grid grid-cols-12 gap-10">
        <div class="col-span-12 md:col-span-3">
          <div
            class="profile-menus rounded-t-md rounded-b-md transition-shadow bg-white shadow-md hover:shadow-xl p-10"
          >
            <h4
              class="font-bold text-brand text-center mb-6 border-b border-brand border-solid w-full"
            >
              Menu
            </h4>

            <ul>
              <li
                v-for="(item, index) in menuItems"
                :key="index"
                class="profile-menu-item"
                @click="activeMenuItem = item.component"
              >
                <i :class="item.icon"></i>
                {{ item.title }}
              </li>
            </ul>
          </div>
        </div>
        <div class="col-span-12 md:col-span-9">
          <div
            class="profile-selected-option rounded-t-md rounded-b-md transition-shadow bg-white shadow-md hover:shadow-xl p-10"
          >
            <h4
              class="font-bold text-brand text-center mb-6 border-b border-brand border-solid w-full"
            >
              Profile
            </h4>

            <div class="profile-body">
              <component :is="currentOptionComponent"></component>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ProfileOptions from "../components/ProfileOptions.vue";
import MyPosts from "../components/MyPosts.vue";

export default {
  name: "Profile",

  components: {
    ProfileOptions,
    MyPosts
  },

  data() {
    return {
      activeMenuItem: "PROFILE_OPTIONS",
    };
  },

  computed: {
    menuItems() {
      return [
        {
          title: "Profile Settings",
          icon: "fa-regular fa-user",
          component: "PROFILE_OPTIONS",
        },
        {
          title: "My Posts",
          icon: "fa-regular fa-align-justify",
          component: "MY_POSTS",
        },
        {
          title: "Create Blog",
          icon: "fa-regular fa-plus",
          component: "CREATE_BLOG",
        },
      ];
    },

    currentOptionComponent() {
      if (this.activeMenuItem === "CREATE_BLOG") {
        return this.$router.push({ name: "createBlog" });
      }

      const components = {
        PROFILE_OPTIONS: ProfileOptions,
        MY_POSTS: MyPosts,
      };

      return components[this.activeMenuItem];
    },
  },
};
</script>

<style lang="postcss">
.profile-menu-item {
  @apply border border-brand border-solid p-2 mb-1 transition-all font-medium flex items-center gap-3 text-brand cursor-pointer hover:bg-brand hover:text-white;
}
</style>
