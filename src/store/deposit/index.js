import { currencyFormatter } from '~/helpers/formatters'

const state = () => ({
})

const getters = {
  summaryData: (state) => { // ToDo: Need refactoring or moving a logic to API
    if (['CARD'].includes(state.payment.selectedMethod?.type)) {
      return {
        list: [
          {
            label: 'Trading account',
            value: state.account.selected?.name
          },
          {
            label: 'Current balance',
            value: currencyFormatter(state.account.selected?.balance, state.account.selected?.currency)
          },
          {
            label: 'Payment method',
            value: state.payment.selectedMethod?.name
          },
          {
            label: 'Amount',
            value: currencyFormatter(state.payment.amount, state.account.selected?.currency)
          },
          {
            label: 'Commission',
            value: state.payment.selectedMethod?.commission
          }
        ],

        ...(state.payment.selectedMethod?.notices && {
          notices: state.payment.selectedMethod?.notices
        })
      }
    }

    if (['M_PESA'].includes(state.payment.selectedMethod?.type)) {
      return {
        list: [
          {
            label: 'Trading account',
            value: state.account.selected?.name
          },
          {
            label: 'Current balance',
            value: currencyFormatter(state.account.selected?.balance, state.account.selected?.currency)
          },
          {
            label: 'Payment method',
            value: state.payment.selectedMethod?.name
          },
          {
            label: 'Phone number',
            value: state.payment.validPhone
          },
          {
            label: 'Amount',
            value: currencyFormatter(state.payment.amount, state.account.selected?.currency)
          },
          {
            label: 'Commission',
            value: state.payment.selectedMethod?.commission
          }
        ],

        ...(state.payment.selectedMethod?.notices && {
          notices: state.payment.selectedMethod?.notices
        })
      }
    }

    if (['BANK_TRANSFER'].includes(state.payment.selectedMethod?.type)) {
      return {
        list: [
          {
            label: 'Trading account',
            value: state.account.selected?.name
          },
          {
            label: 'Current balance',
            value: currencyFormatter(state.account.selected?.balance, state.account.selected?.currency)
          },
          {
            label: 'Payment method',
            value: state.payment.selectedMethod?.name
          },
          {
            label: 'Payment currency',
            value: state.payment.currency
          },
          {
            label: 'Commission',
            value: state.payment.selectedMethod?.commission
          },
          {
            label: 'IBAN',
            value: 'abcde'
          },
          {
            label: 'Account number',
            value: '21343535264'
          }
        ],

        ...(state.payment.selectedMethod?.notices && {
          notices: state.payment.selectedMethod?.notices
        })
      }
    }

    return {
      list: []
    }
  }
}

const actions = {

}

const mutations = {

}

export default {
  state,
  getters,
  actions,
  mutations
}
