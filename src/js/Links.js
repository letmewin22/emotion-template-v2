import gsap from 'gsap'

export default class Links {

  constructor(el) {
    this.el = el
    this.appendElements()
    this.el.forEach(el => el.addEventListener('mouseenter', this.mouseenter.bind(this, el)))
    this.el.forEach(el => el.addEventListener('mouseleave', this.mouseleave.bind(this, el)))
  }

  createElements() {
    const wrapper = document.createElement('div')
    wrapper.classList.add('js-lines')
    wrapper.innerHTML = `<div class="js-lines__js-line js-lines__js-line--first"></div>
      <div class="js-lines__js-line js-lines__js-line--second"></div>`
    return wrapper
  }

  appendElements() {
    
    this.el.forEach(el => {
      el.appendChild(this.createElements())
      el.classList.add('js-lines-added')
    })
  }

  mouseenter(el) {
    const tl = gsap.timeline()
    tl.set(el.querySelectorAll('.js-lines__js-line'), {left: 0, right: 'auto'})
    tl.to(el.querySelectorAll('.js-lines__js-line'), {duration: 0.5, width: '100%', ease: 'expo.out', stagger: 0.1}
    )
    tl.to(el, {color: '#F7A707', ease: 'expo.out'}, 0)
  }

  mouseleave(el) {
    const tl = gsap.timeline()
    tl.set(el.querySelectorAll('.js-lines__js-line'), {left: 'auto', right: 0})
    tl.to(el.querySelectorAll('.js-lines__js-line'), {duration: 0.5, width: '0%', ease: 'expo.out', stagger: 0.1})
    tl.to(el, {color: '#242424', ease: 'expo.out'}, 0)
  }
}
