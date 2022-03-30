export function currencyFormatter (amount, currency) {
  if (currency === 'USD') {
    return `$ ${amount}`
  }

  return `${amount} ${currency}`
}
