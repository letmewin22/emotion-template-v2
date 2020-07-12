import Highway from '@dogstudio/highway'
import '@/libs/smoothscroll'

import cssWebP from '@/libs/testWebP'
<<<<<<< HEAD
// import {Home} from './renderers'
=======
import {Home} from './renderers'
import repeatedText from './repeatedText'
>>>>>>> c7c25d8831175814de89414433596ff43b3bb4de

new Highway.Core()

cssWebP()
<<<<<<< HEAD
// const H = new Highway.Core({
//   renderers: {
//     home
//   },
//   transitions: {
//     name: CustomTransition,
//     default: OtherTransition
//   }
// })

=======
const H = new Highway.Core({
  renderers: {
    home: Home
  }
  // },
  // transitions: {
  //   name: CustomTransition,
  //   default: OtherTransition
  // }
})

repeatedText('btn', 'btn__text-wrapper', 8)
repeatedText('transition-rails', 'transition-rails__items', 20)

const linesSize = () => {
  document.querySelector('.main-header__line-wrapper').style.height = document.querySelector('.main-header__content').getBoundingClientRect().height + 'px'
  document.querySelector('.main-header__line-wrapper').style.width = document.querySelector('.main-header__content').getBoundingClientRect().width + 'px'
}

window.addEventListener('load', linesSize)
window.addEventListener('resize', linesSize)


const blackBg = () => {
  const item = document.querySelector('.dark-section')

  if(item.getBoundingClientRect().top <= window.innerHeight * 0.9 && -item.getBoundingClientRect().top <= item.getBoundingClientRect().height / 2) {
    document.body.classList.add('black')
  } else {
    document.body.classList.remove('black')
  }

  window.requestAnimationFrame(blackBg)

}

blackBg()
>>>>>>> c7c25d8831175814de89414433596ff43b3bb4de
