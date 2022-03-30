export const scrollTo = (el, offset, smoothness = 50) => {
  requestAnimationFrame(step)
  let start = null
  const startPos = window.pageYOffset
  const endPos = el.getBoundingClientRect().top + offset
  const V = smoothness / (startPos + endPos)

  function step (time) {
    if (start === null) {
      start = time
    }
    const progress = time - start
    const r = (endPos < 0 ? Math.max(startPos - progress / V, startPos + endPos) : Math.min(startPos + progress / V, startPos + endPos))
    window.scrollTo(0, r)
    if (r !== startPos + endPos) {
      requestAnimationFrame(step)
    }
  }
}

export const scrollToView = (el, offsetTop) => {
  if (el.getBoundingClientRect().top - offsetTop < 0) {
    scrollTo(el, -offsetTop)
  }
}

// Функции для блокировки скролла тега body. Используется при открывании всклывающих окон
let scrollPosition = 0

let isDesktop = true

if (typeof window !== 'undefined') {
  isDesktop = window.innerWidth > 1191

  window.addEventListener('resize', () => {
    isDesktop = window.innerWidth > 1191
  })
}

// TODO: поменять логику определения устройств, для которых overflow: hidden недостаточно и нужен трюк с position: fixed
export const lockBodyScroll = () => {
  if (window.scrollLockCounter) {
    window.scrollLockCounter += 1
    return
  }
  window.scrollLockCounter = 1

  // Считаем размер отступа справа от страницы - там, где был скроллбар. Если в браузере скроллбар не занимает место, то offset = 0
  const offset = window.innerWidth - document.documentElement.clientWidth + 'px'

  scrollPosition = window.pageYOffset

  document.body.classList.add('lock-scroll')
  // трюк для ios
  if (!isDesktop) {
    document.body.style.top = `-${scrollPosition}px`
  }

  document.body.style.marginRight = offset

  document.body.setAttribute('data-scroll-position', scrollPosition)
  // для fixed элементов задаем внутренний отступ, так как они игнорируют оступ, который мы выставили для body
  // новая шапка || старая шапка
  const headerFixed = document.querySelector('.js-app-header.is-sticky .js-app-header-desktop-main') || document.querySelector('.js-header-main.header__main--fixed')
  const headerMenu = document.querySelector('.js-app-header.is-sticky .js-header-catalog-menu-container') || document.querySelector('.js-header-menu')
  if (headerFixed) { headerFixed.style.paddingRight = offset }
  if (headerMenu) { headerMenu.style.paddingRight = offset }
}

export const unlockBodyScroll = () => {
  if (window.scrollLockCounter > 1) {
    window.scrollLockCounter -= 1
    return
  }
  if (window.scrollLockCounter === 0) {
    return
  }
  window.scrollLockCounter = 0

  document.body.classList.remove('lock-scroll')
  document.body.style.marginRight = '0'

  document.body.removeAttribute('data-scroll-position')

  if (!isDesktop) {
    document.body.style.removeProperty('top')
    window.scrollTo(0, scrollPosition)
  }
  // новая шапка || старая шапка
  const headerFixed = document.querySelector('.js-app-header.is-sticky .js-app-header-desktop-main') || document.querySelector('.js-header-main.header__main--fixed')
  const headerMenu = document.querySelector('.js-app-header.is-sticky .js-header-catalog-menu-container') || document.querySelector('.js-header-menu')
  if (headerFixed) { headerFixed.style.paddingRight = '0' }
  if (headerMenu) { headerMenu.style.paddingRight = '0' }
}
