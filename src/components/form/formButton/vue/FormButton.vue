<template>
  <button :type="buttonType" :class="[classStyled]" @click="onClickButton">
    <slot></slot>
  </button>
</template>

<script lang="ts">
export default {
  props: {
    classStyled: {
      type: [String, Array],
      required: false,
      default: () => 'btn-default',
    },
    buttonType: {
      type: String as () => 'button' | 'reset' | 'submit' | undefined,
      required: false,
      default: () => 'button',
    },
  },
  computed: {
    classes() {
      const isArray = this.classStyled instanceof Array
      if (isArray) {
        return this.classStyled.join(',')
      }
      return this.classStyled
    },
  },
  methods: {
    onClickButton(event: Event): void {
      this.$emit('on-click', event)
    },
  },
}
</script>

<style scoped></style>
