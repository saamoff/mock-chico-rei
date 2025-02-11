<template>
  <div class="select-router">
    <span class="custom-select">
      <select @change="navigateToRoute($event)">
        <option value="/camisetas">Camisetas</option>
        <option value="/moletons">Moletons</option>
        <option value="/xicaras">Xicaras</option>
      </select>
    </span>
    <span>
      <RouterView/>
    </span>
  </div>
</template>

<script lang="ts">
export default {
  name: 'SelectRouter',
  methods: {
    navigateToRoute(event: Event): void {
      const selectedRoute = (event.target as HTMLSelectElement).value;
      this.$router.push(`/${this.$route.params.id}${selectedRoute}`);
    },
  },
}
</script>

<style lang="less" scoped>
@import "../less/select-router.less";
</style>
