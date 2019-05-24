import { checkIsMobile } from './utils'
import Player from './player'

const videoId = 'ucAg5oeb0vE'

// @ts-ignore
window.onYouTubePlayerAPIReady = () => {
  new Player(videoId)
}
document.addEventListener('DOMContentLoaded', () => {
  document.body.classList.toggle('is-mobile', checkIsMobile())
})

document.querySelector<HTMLElement>('.call-to-action')
  .addEventListener('click', () => {
    document.querySelector<HTMLElement>('.video__overlay').click()
  })
