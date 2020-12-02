export interface IScrollBar {
  el: HTMLElement
  scrollbar: HTMLElement
  inactiveDelay: number
  timer: number
  elHeight: number
  max: number
  thumb: HTMLElement
  height: number
  timerTicker: any
  interval: any
  reset: () => void
}
