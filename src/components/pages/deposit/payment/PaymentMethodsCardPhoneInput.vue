<template>
  <div class="payment-methods-card-phone-input">
    <UiInput
      v-model="phone"
      label="Phone number"
      :mask="phoneMaskOptions"
      :disabled="disabled"
      :error="hasPhoneValidationError"
      @blur="validatePhone"
      @input="onPhoneInput"
    />
    <TransitionExpand>
      <UiFormError v-if="hasPhoneValidationError" class="payment-methods-card-phone-input__error">
        Valid format is +971 XX XXX XXXX
      </UiFormError>
    </TransitionExpand>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import UiInput from '~/components/ui/Input/UiInput'
import UiFormError from '~/components/ui/FormError/UiFormError'
import TransitionExpand from '~/components/ui/TransitionExpand/TransitionExpand'

export default {
  name: 'PaymentMethodsCard',

  components: {
    UiFormError,
    UiInput,
    TransitionExpand
  },

  props: {
    disabled: {
      type: Boolean,
      default: false
    }
  },

  data () {
    return {
      phone: '',
      hasPhoneValidationError: false,
      phoneMaskOptions: {
        mask: '+{971} 00 000 0000'
      }
    }
  },

  computed: {

  },

  methods: {
    ...mapActions({
      updateValidPhone: 'deposit/payment/updatePhone'
    }),
    onPhoneInput () {
      this.hasPhoneValidationError = false

      if (this.phone.length === 16) {
        this.updateValidPhone(this.phone)
      } else {
        this.updateValidPhone(null)
      }
    },
    validatePhone () {
      this.hasPhoneValidationError = this.phone.length !== 16
    }
  }
}
</script>

<style lang="scss">
.payment-methods-card-phone-input {
  &__error {
    margin-top: 4px;
  }
}
</style>
