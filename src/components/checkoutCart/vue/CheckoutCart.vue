<template>
  <article class="checkout-cart">
    <section class="checkout-cart__form">
      <form @submit.prevent="handleSubmit">
        <div class="checkout-cart__form-contact">
          <span>
            <h1>Finalização do Pedido</h1>
            <h2>Informações de contato</h2>
          </span>
          <span>
            <FormInput
              class="checkout-cart__form-contact-info"
              v-model="email"
              name="email"
              label="E-mail"
              title="Insira seu E-mail"
              :value="email"
              :required="true"
              type="email"
              @input="inputEmail"
              :valid="isEmailValid"
              msgAlertInvalid="Preencha o email corretamente exemplo@exemplo.com"
            />
            <FormInput
              v-model="cellphone"
              name="cellphone"
              label="Telefone"
              title="Insira seu Telefone"
              :value="cellphone"
              :required="true"
              v-mask="'(##) #####-####'"
              type="text"
              @input="inputPhone"
              :valid="isCellphoneValid"
              msgAlertInvalid="Preencha o telefone corretamente (XX) XXXXX-XXXX"
            />
          </span>
        </div>
        <FormCep :address="address" @update-address="handleUpdateAddress" ref="formCep" />
        <div class="checkout-cart__form-payment">
          <span>
            <h2>Informações de pagamento</h2>
            <FormInput
              v-model="payment.cardNumber"
              name="cardNumber"
              label="Número do Cartão"
              title="Insira o número do Cartão"
              :value="payment.cardNumber"
              :required="true"
              type="text"
              v-mask="'#### #### #### ####'"
              @input="inputCardNumber"
              :valid="isCardNumberValid"
              msgAlertInvalid="Forneca um cartao valido XXXX XXXX XXXX XXXX"
            />
            <FormInput
              v-model="payment.cardOwner"
              name="cardOwner"
              label="Titular do Cartão"
              title="Insira o nome do Titular do Cartão"
              :value="payment.cardOwner"
              :required="true"
              type="text"
              @input="inputCardOwner"
              :valid="isCardOwnerValid"
            />
            <span class="flexing">
              <FormInput
                class="checkout-cart__form-date"
                v-model="payment.cardDate"
                name="cardDate"
                label="Data de Vencimento"
                title="MM/AA"
                :value="payment.cardDate"
                :required="true"
                v-mask="'##/##'"
                type="text"
                @input="inputCardDate"
                :valid="isCardDateValid"
                msgAlertInvalid="Por favor informe uma data valida no formato (MM/YY)"
              />
              <FormInput
                class="checkout-cart__form-vin"
                v-model="payment.cardVin"
                name="cardVin"
                label="CVC"
                title="Insira o CVC"
                :value="payment.cardVin"
                :required="true"
                v-mask="'###'"
                type="number"
                @input="inputCardVin"
                :valid="isCardVinValid"
              />
            </span>
          </span>
        </div>
        <div class="checkout-cart__form-box">
          <FormButton class="checkout-cart__form-box-button" type="submit" title="Finalizar Pedido">
            <p v-if="!isLoading">Finalizar Pedido</p>
            <img v-else class="spinner" src="../../../assets/spinner.svg" alt="" />
          </FormButton>
        </div>
      </form>
    </section>
    <section class="checkout-cart__items">
      <CheckoutItem />
    </section>
  </article>
  <router-view></router-view>
</template>

<script lang="ts">
import FormInput from '../../form/formInput/vue/FormInput.vue'
import FormButton from '../../form/formButton/vue/FormButton.vue'
import FormCep from '../../form/formCep/vue/FormCep.vue'
import CheckoutItem from '../../checkoutItem/vue/CheckoutItem.vue'
import { mask } from 'vue-the-mask'

type FormCepType = InstanceType<typeof FormCep>

interface Address {
  cep: string
  street: string
  number: string
  district: string
  city: string
  state: string
}

export default {
  components: {
    FormInput,
    FormButton,
    FormCep,
    CheckoutItem,
  },
  directives: {
    mask,
  },
  data() {
    return {
      email: '',
      cellphone: '',
      address: {},
      payment: {
        cardNumber: '',
        cardOwner: '',
        cardDate: '',
        cardVin: '',
      },
      isLoading: false,
      isEmailValid: null as boolean | null,
      isCellphoneValid: null as boolean | null,
      isCardNumberValid: null as boolean | null,
      isCardOwnerValid: null as boolean | null,
      isCardDateValid: null as boolean | null,
      isCardVinValid: null as boolean | null,
    }
  },
  methods: {
    async handleSubmit() {
      this.isLoading = true
      const formCep = this.$refs.formCep as FormCepType
      formCep.submitForm()
      await new Promise((resolve) => setTimeout(resolve, 1000))
      try {
        if (!this.validateAllFields()) {
          alert('Por favor, preencha todos os campos corretamente.')
          return
        }

        console.log('Dados do formulário:', {
          email: this.email,
          cellphone: this.cellphone,
          address: this.address,
          payment: this.payment,
        })
        this.$router.push(`${this.$route.path}/success`)
      } catch (error) {
        console.log('Ops, algo deu errado', error)
      } finally {
        this.isLoading = false
      }
    },

    handleUpdateAddress(updatedAddress: Partial<Address>): void {
      this.address = { ...this.address, ...updatedAddress }
    },

    inputEmail(event: Event): void {
      const value = (event.target as HTMLInputElement).value
      this.email = value

      this.isEmailValid = this.validateEmail(value)
    },

    inputPhone(event: Event): void {
      const value = (event.target as HTMLInputElement).value
      this.cellphone = value
      this.isCellphoneValid = value.replace(/\D/g, '').length === 11
    },

    inputCardNumber(event: Event): void {
      const value = (event.target as HTMLInputElement).value
      this.payment.cardNumber = value
      this.isCardNumberValid = value.replace(/\D/g, '').length === 16
    },

    inputCardOwner(event: Event): void {
      const value = (event.target as HTMLInputElement).value
      this.payment.cardOwner = value

      this.isCardOwnerValid = this.validateCardOwner(value)
    },

    inputCardDate(event: Event): void {
      const value = (event.target as HTMLInputElement).value
      this.payment.cardDate = value
      this.isCardDateValid = this.validateCardDate(value)
    },

    inputCardVin(event: Event): void {
      const value = (event.target as HTMLInputElement).value
      this.payment.cardVin = value
      this.isCardVinValid = value.replace(/\D/g, '').length === 3
    },

    validateEmail(email: string): boolean {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      return emailRegex.test(email)
    },

    validateCardOwner(cardOwner: string): boolean {
      const cardOwnerRegex = /^[A-Za-z\s]+$/
      return cardOwner.trim() !== '' && cardOwnerRegex.test(cardOwner)
    },

    validateCardDate(cardDate: string): boolean {
      if (!cardDate || cardDate.length !== 5) return false
      const [month, year] = cardDate.split('/')
      const currentDate = new Date()
      const currentYear = currentDate.getFullYear() % 100
      const currentMonth = currentDate.getMonth() + 1
      const inputMonth = parseInt(month, 10)
      const inputYear = parseInt(year, 10)
      if (inputMonth < 1 || inputMonth > 12) return false
      if (inputYear < currentYear) return false
      if (inputYear === currentYear && inputMonth < currentMonth) return false

      return true
    },

    validateAllFields() {
      return (
        this.isEmailValid &&
        this.isCellphoneValid &&
        this.isCardNumberValid &&
        this.isCardOwnerValid &&
        this.isCardDateValid &&
        this.isCardVinValid
      )
    },
  },
}
</script>

<style lang="less">
@import '../less/checkout-cart.less';
</style>
