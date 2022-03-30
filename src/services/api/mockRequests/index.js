import { sleep } from '~/helpers/utils'

export async function getAvailableAccountsForDeposit () {
  await sleep(2000)

  return [
    {
      id: '435345311',
      name: 'MT5 / 435345311',
      currency: 'AED',
      balance: 0
    },
    {
      id: '123486787',
      name: 'MT5 / 123486787',
      currency: 'USD',
      balance: 131.2
    },
    {
      id: '435345345',
      name: 'MT5 / 435345345',
      currency: 'AED',
      balance: 131.2
    }
  ]
}

export async function getAvailablePaymentMethodsForDeposit () {
  await sleep(2000)

  return [
    {
      id: '12',
      name: 'Visa / Mastercard',
      type: 'CARD',
      logoUrl: 'visa.svg',
      commission: 0,
      notices: [
        {
          title: 'Notice',
          text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad amet, asperiores, commodi doloribus error expedita molestiae, molestias pariatur possimus quasi quisquam ratione rem sit veritatis.'
        }
      ]
    },
    {
      id: '13',
      name: 'M-Pesa',
      type: 'M_PESA',
      logoUrl: 'm-pesa-logo.png',
      commission: 0
    },
    {
      id: '14',
      name: 'Bank transfer',
      type: 'BANK_TRANSFER',
      logoUrl: 'bank-transfer.svg',
      commission: 0,
      notices: [
        {
          title: 'Bank notice',
          text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consectetur earum eligendi harum molestias nisi nostrum odio quas vero! Maxime, officia.'
        }
      ]
    }
  ]
}
