export default function ({ store, redirect }) {
  if (!store.state.deposit.account.selected) {
    redirect('/deposit/account/')
  }
}
