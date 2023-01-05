<template>
  <div class="categories grid lg:grid-cols-1 sm:grid-cols-2 grid-cols-1 gap-5">
    <router-link
      v-for="(category, index) in categoryData"
      :key="index"
      :to="{ name: 'category', params: { category: category.name } }"
      class="relative block after:absolute after:content-[''] after:inset-0 after:bg-black rounded-[10px] overflow-hidden after:opacity-50 hover:after:bg-primary hover:after:opacity-80 after:transition-all"
    >
      <div class="'h-[150]'">
        <img :src="category.thumbnail" :alt="category.name" class="w-full" />
      </div>
      <div
        class="w-full text-center absolute top-1/2 z-10 transform -translate-y-1/2"
      >
        <h4 class="mb-0 text-white capitalize">{{ category.name }}</h4>
      </div>
    </router-link>
  </div>
</template>

<script>
export default {
  name: "HeroCategories",
  props: {
    categoryData: {
      type: Array,
      default: () => [],
    },
  },
};
</script>

<style></style>
