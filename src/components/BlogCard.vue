<template>
  <div class="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
    <div
      class="blog-card rounded-t-md rounded-b-md transition-shadow bg-white shadow-md flex flex-col hover:shadow-xl"
      v-for="(item, index) in blogData"
      :key="index"
    >
      <div class="blog-img group overflow-hidden rounded-t-md">
        <img
          class="w-full rounded-t-md group-hover:scale-125 transition-all duration-500 aspect-square max-h-[150px]"
          :src="item.imageCover"
          :alt="item.title"
        />
      </div>

      <div
        v-if="item.categories?.length || false"
        class="blog-categories flex flex-wrap gap-[2px] px-4 mt-1"
      >
        <router-link
          v-for="(category, index) in item.categories"
          :key="index"
          :to="{ name: 'category', params: { category } }"
          class="bg-brand text-white text-xs p-1 rounded"
        >
          {{ category }}
        </router-link>
      </div>

      <div class="blog-body p-4">
        <h3 :title="item.title" class="font-bold mb-3 text-lg break-word">
          {{ truncate(item.title, 38, "...") }}
        </h3>
        <p class="mb-3">
          {{ truncate(item.shortDescription, 50, "...") }}
        </p>
      </div>

      <div class="blog-footer px-4 pb-4 mt-auto">
        <router-link
          :to="{ name: 'blogDetail', params: { id: item._id } }"
          class="text-brand font-bold hover:text-brand-dark"
        >
          Read More ->
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import { truncateString } from "../mixins/truncateString";

export default {
  name: "BlogCard",

  mixins: [truncateString],

  props: {
    blogData: {
      type: Array,
      default: () => [],
    },
  },
};
</script>

<style lang="postcss"></style>
