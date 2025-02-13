<template>
  <div>
    <label
      :for="name"
      :class="[
        'custom-input',
        type,
        {
          'has-content': value,
          disabled: disabled,
          valid: validClass,
          invalid: invalidClass,
        },
      ]"
    >
      <input
        :id="name"
        :name="name"
        :value="value"
        class="custom-input-field"
        :type="type"
        :required="required"
        :disabled="disabled"
        :autocomplete="autocomplete"
        @input="$emit('input', $event)"
        @focusout="handleFocusOut"
        @keypress="$emit('keypress', $event)"
      />
      <div
        :id="`input-label-${name}`"
        :class="[
          'custom-input-label',
          {
            invalid: invalidClass,
            valid: validClass,
            default: pattern && required === false,
          },
        ]"
      >
        {{ label }}
      </div>
    </label>
    <div
      v-if="valid != null && disabled === false"
      :id="idAlertLabel"
      role="alert"
      :class="['custom-input-alert-msg', { valid: valid, invalid: !valid }]"
    >
      {{ msgAlertValidation }}
    </div>
  </div>
</template>

<script lang="ts">
export default {
  props: {
    name: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
    required: {
      type: Boolean,
      required: false,
      default: () => false,
    },
    pattern: {
      type: RegExp,
      required: false,
      default: () => /[a-zA-z0-9]*@(.)*.([a-z]){2,3}?([a-z]){2}/,
    },
    label: {
      type: String,
      required: true,
    },
    value: {
      type: [String, Number],
      required: true,
    },
    valid: {
      type: [Boolean, null],
      required: false,
      default: null,
    },
    disabled: {
      type: Boolean,
      required: false,
      default: () => false,
    },
    msgAlertValid: {
      type: String,
      required: false,
      default: () => '',
    },
    msgAlertInvalid: {
      type: String,
      required: false,
      default: () => '',
    },
    msgRequiredAlert: {
      type: String,
      required: false,
      default: 'Preencha o campo',
    },
    resetValidation: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    msgAlertValidation() {
      if (this.valid === true && this.msgAlertValid) {
        return this.msgAlertValid
      }
      if (this.valid === false && this.msgAlertInvalid && this.value !== '') {
        return this.msgAlertInvalid
      }
      if (
        this.valid === false &&
        this.required === true &&
        this.msgRequiredAlert &&
        this.value === ''
      ) {
        return this.msgRequiredAlert
      }
      return undefined
    },
    invalidClass() {
      return (
        (this.required === true || (this.required === false && this.value !== '')) &&
        this.valid != null &&
        !this.valid &&
        this.disabled === false
      )
    },
    validClass() {
      return (
        (this.required === true || (this.required === false && this.value !== '')) &&
        this.valid &&
        this.disabled === false
      )
    },
    idAlertLabel() {
      return `ventiqo-input-msg-alert-${this.name}`
    },
  },
  watch: {
    value() {
      if (this.resetValidation === false) {
        if (this.disabled === false) {
          const regex = new RegExp(this.pattern)
          const regexValidation = regex.test(String(this.value))
          this.$emit('update:valid', regexValidation)
          return regexValidation
        }
        return undefined
      }
    },
    disabled() {
      if (this.resetValidation === false) {
        this.handleFocusOut()
      }
    },
  },
  methods: {
    handleFocusOut() {
      if (this.disabled === false) {
        const regex = new RegExp(this.pattern)
        const regexValidation = regex.test(String(this.value))
        this.$emit('update:valid', regexValidation)
        return regexValidation
      }
      return undefined
    },
  },
}
</script>
<style lang="less">
@import '../less/form-input.less';
</style>
