import gsap from 'gsap'

export default class MouseParallax {

  constructor({el, parent}) {
    this.el = el
    this.parent = parent
    this.parent.addEventListener('mousemove', (e) => this.event(e))
  }

  event(e) {
    gsap.to(this.el, {duration: 1, left: window.innerWidth / 2 - e.clientX / 5, ease: 'sine.out'})
  }
}
