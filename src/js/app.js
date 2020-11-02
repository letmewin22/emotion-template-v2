import './libs/ie-detect'
import './libs/sayHello'
import cssWebP from './libs/testWebP'
import moveEl from './libs/moveEl'

import Highway from '@dogstudio/highway'

import {Home, About} from './core/renderers'
import {Basic} from './core/transitions'
import Hooks from './core/Hooks'
import {setState, state} from './state'

import bgWebP from './utils/bgWebP'
import {resize} from './utils/Resize'
import {winH} from './utils/winH'

process.env.NODE_ENV === 'production' && cssWebP()

const H = new Highway.Core({
  renderers: {
    home: Home,
    about: About
  },
  transitions: {
    default: Basic
  }
})

const hooks = new Hooks(H)

hooks.useNavigateOut(() => {
  setState(state, state.isLoaded = false)
})

hooks.useNavigateEnd(() => {
  setState(state, state.isLoaded = true)
})

let smoothScroll

hooks.useBothStart(() => {
  bgWebP()
  moveEl()

  smoothScroll && smoothScroll.reset()
})

hooks.useLoad(() => {

  resize.on(winH)

  // const navbarPos = new NavbarPos()
  // navbarPos.init()

  import(
    /* webpackChunkName: "smooth-scroll" */
    './components/SmoothScroll/SmoothScroll'
  ).then((module) => {
    const SmoothScroll = module.default
    smoothScroll = new SmoothScroll('#scroll-container')
  })
})


const links = document.querySelectorAll('nav a')

hooks.useBoth(() => {
  links.forEach(link => {
    link.classList.remove('is-active')
    link.href === location.href && link.classList.add('is-active')
  })
})

