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
