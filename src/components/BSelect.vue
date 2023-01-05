<template>
  <div>
    <VueMultiselect
      v-model="selected"
      :options="options"
      :placeholder="placeholder"
      :multiple="isMultiple"
      @update:model-value="handleSelect"
    >
    </VueMultiselect>
  </div>
</template>

<script>
import VueMultiselect from "vue-multiselect";

export default {
  components: { VueMultiselect },
  props: {
    value: {
      type: Array,
      default: () => [],
    },
    options: {
      type: Array,
      default: () => [],
    },
    placeholder: {
      type: String,
      default: "Please select",
    },
    isMultiple: {
      type: Boolean,
      default: false,
    },
    trackBy: {
      type: String,
      default: "name",
    },
  },

  data() {
    return {
      selected: null,
    };
  },

  methods: {
    handleSelect(value) {
      this.$emit("input", value);
    },
  },

  watch: {
    selected() {
      this.$emit("input", this.selected);
    },
    value(newValue) {
      this.selected = newValue;
    },
  },
};
</script>

<style src="vue-multiselect/dist/vue-multiselect.css"></style>
