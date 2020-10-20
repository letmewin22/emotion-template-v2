import Highway from '@dogstudio/highway'

class Basic extends Highway.Transition {
  in({to, from, done}) {
    window.scrollTo(0, 0)
    // Remove Old View
    from.remove()
    done()
  }

  out({done}) {
    done()
  }
}

export default Basic
