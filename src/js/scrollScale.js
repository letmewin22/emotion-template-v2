const scrollScale = () => {
  const elem = document.querySelector('.full-screen-img__img')
  elem.style.transform = `scale(${1 + window.pageYOffset/5000}) translateY(-${elem.getBoundingClientRect().top/10}px)`
  window.requestAnimationFrame(scrollScale)
}

export default scrollScale
