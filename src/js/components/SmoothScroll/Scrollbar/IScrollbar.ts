export interface IScrollBar {
  readonly el?: HTMLElement
  init: () => void
  setHeight: () => void
  scroll: () => void
  events: () => void
  controlsEvent: () => void
  detectInactivity: () => void
  destroy: () => void
}
