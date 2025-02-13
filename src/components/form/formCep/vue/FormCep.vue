<template>
  <div class="form-cep">
    <h2>Endereço</h2>
    <span class="form-cep__search">
      <FormInput
        class="form-cep__search-input"
        v-model="address.cep"
        name="cep"
        label="CEP"
        title="Insira seu CEP"
        :value="address.cep"
        :required="true"
        type="text"
        @input="inputCep"
        :valid="isCepValid"
        msgAlertInvalid="Preencha o CEP corretamente XXXXX-XXX"
      />
      <FormButton
        :class="{
          'form-cep__search-button-disabled': !address.cep,
          'form-cep__search-button': address.cep,
        }"
        type="button"
        @click="fetchAddress"
        :disabled="!address.cep"
      >
        <img v-if="!isLoading" src="../../../../assets/search.svg" alt="procurar" />
        <img v-else class="spinner" src="../../../../assets/spinner.svg" alt="loading" />
      </FormButton>
    </span>

    <FormInput
      v-model="address.street"
      name="street"
      label="Rua"
      title="Nome da Rua"
      :value="address.street"
      :required="true"
      type="text"
      @input="inputStreet"
      :disabled="!address.street"
      :valid="validateEmptyFields(address.street)"
    />
    <span class="form-cep__neighborhood">
      <FormInput
        class="form-cep__neighborhood-number"
        v-model="address.number"
        name="number"
        label="Número"
        title="Número da Residência"
        :value="address.number"
        :required="true"
        @input="inputNumber"
        type="number"
        :valid="isNumberValid"
      />
      <FormInput
        class="form-cep__neighborhood-district"
        v-model="address.district"
        name="district"
        label="Bairro"
        title="Nome do Bairro"
        :value="address.district"
        :required="true"
        @input="inputDistrict"
        type="text"
        :disabled="!address.district"
        :valid="validateEmptyFields(address.district)"
      />
    </span>
    <span class="form-cep__province">
      <FormInput
        class="form-cep__province-city"
        v-model="address.city"
        name="city"
        label="Cidade"
        title="Nome da Cidade"
        :value="address.city"
        :required="true"
        type="text"
        @input="inputCity"
        :disabled="!address.city"
        :valid="validateEmptyFields(address.city)"
      />
      <FormInput
        class="form-cep__province-state"
        v-model="address.state"
        name="state"
        label="Estado"
        title="Sigla do Estado"
        :value="address.state"
        :required="true"
        type="text"
        @input="inputState"
        :disabled="!address.state"
        :valid="validateEmptyFields(address.state)"
      />
    </span>
  </div>
</template>

<script lang="ts">
import cep from 'cep-promise'
import FormInput from '../../formInput/vue/FormInput.vue'
import FormButton from '../../formButton/vue/FormButton.vue'

export default {
  components: {
    FormInput,
    FormButton,
  },
  data() {
    return {
      address: {
        cep: '',
        street: '',
        number: '',
        district: '',
        city: '',
        state: '',
      },
      isLoading: false,
      isCepValid: null as boolean | null,
      isNumberValid: null as boolean | null,
    }
  },
  methods: {
    async fetchAddress() {
      this.isLoading = true
      await new Promise((resolve) => setTimeout(resolve, 2000))
      try {
        const resAddress = await cep(this.address.cep)

        if (resAddress) {
          this.address.street = resAddress.street
          this.address.district = resAddress.neighborhood
          this.address.city = resAddress.city
          this.address.state = resAddress.state
        }
      } catch (error) {
        console.error('Error fetching address:', error)
        alert('Erro ao buscar o endereço. Por favor, tente novamente.')
      } finally {
        this.isLoading = false
      }
    },

    inputCep(event: Event): void {
      let value = (event.target as HTMLInputElement).value
      value = value.replace(/\D/g, '')
      if (value.length > 5) {
        value = value.replace(/^(\d{5})(\d{3})$/, '$1-$2')
      }
      this.address.cep = value
      this.isCepValid = value.replace(/\D/g, '').length === 8
    },

    inputStreet(event: Event): void {
      this.address.street = (event.target as HTMLInputElement).value
    },

    inputNumber(event: Event): void {
      const value = (event.target as HTMLInputElement).value
      this.address.number = value
      this.isNumberValid = !!value.trim()
    },

    inputDistrict(event: Event): void {
      this.address.district = (event.target as HTMLInputElement).value
    },

    inputCity(event: Event): void {
      this.address.city = (event.target as HTMLInputElement).value
    },

    inputState(event: Event): void {
      this.address.state = (event.target as HTMLInputElement).value
    },

    validateEmptyFields(...fields: string[]) {
      return fields.every((field) => !!field.trim())
    },

    validateCep() {
      return !!this.address.cep.trim()
    },

    validateAllFields() {
      return (
        this.isCepValid &&
        this.validateEmptyFields(
          this.address.street,
          this.address.district,
          this.address.number,
          this.address.city,
          this.address.state,
        )
      )
    },

    submitForm() {
      if (this.validateAllFields()) {
        this.$emit('update-address', { ...this.address })
      } else {
        alert('Por favor, preencha todos os campos corretamente.')
      }
    },
  },
}
</script>

<style lang="less" scoped>
@import '../less/form-cep.less';
</style>
