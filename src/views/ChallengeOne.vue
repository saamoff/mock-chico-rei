<script lang="ts">
  import StoreItem from "../components/productItem/vue/StoreItem.vue"
  export default {
    components: { StoreItem },
    data() {
      return {
        items: Array.from({ length: 21 }, (_, i) => ({ id: i + 1, name: `Item ${i + 1}` })),
      }
    }

  }
</script>

<template>
  <div class="items-container">
    <store-item
      v-for="item in items"
      :key="item.id"
      :item="item"
    />
  </div>
</template>


<style scoped>
.items-container {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 1.875rem;
}
</style>