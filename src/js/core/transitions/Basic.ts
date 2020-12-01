/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import Highway from '@dogstudio/highway'

class Basic extends Highway.Transition {
  in({from, done}): void {
    window.scrollTo(0, 0)
    // Remove Old View
    from.remove()
    done()
  }

  out({done}): void {
    done()
  }
}

export default Basic
