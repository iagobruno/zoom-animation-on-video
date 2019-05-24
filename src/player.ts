import { checkIsFullScreen, checkIsMobile, isFirefox, zoomIn, zoomOut, calcWidthAspectRatio } from './utils';

export default class Player {
  public ytplayer: YT.Player;

  private wrapper = document.querySelector<HTMLElement>('.video__wrapper');
  private iframe = this.wrapper.querySelector<HTMLIFrameElement>('#ytplayer');
  private overlay = this.wrapper.querySelector<HTMLElement>('.video__overlay');

  private isFullscreen: boolean = false;
  private height: number;
  private width: number;

  constructor(private videoId: string) {
    // Init YouTube Player
    // See more: https://developers.google.com/youtube/iframe_api_reference
    this.ytplayer = new YT.Player(this.iframe, {
      videoId: this.videoId,
      height: 1,
      width: 1,
      playerVars: {
        controls: 0,
      },
      events: {
        'onReady': () => this.onInit(),
        'onStateChange': (event) => {
          // switch (event.data) {
          //   case YT.PlayerState.PLAYING: return this.onPlay();
          // }
        },
      }
    })
  }

  private onInit() {
    this.iframe = this.wrapper.querySelector<HTMLIFrameElement>('#ytplayer')

    this.calcPlayerSize()
    window.addEventListener('resize', () => this.calcPlayerSize())

    this.overlay.addEventListener('click', () => this.onPlay())

    this.iframe.addEventListener('fullscreenchange', () => {
      this.isFullscreen = checkIsFullScreen()

      if (this.isFullscreen === false) this.onExitFullScreen()

      console.log('this.isFullscreen', this.isFullscreen)
    })
  }

  private async onPlay() {
    // Check if the player is already fullscreen
    if (this.isFullscreen === true) return;

    // Hide the video overlay
    this.overlay.style.display = 'none'
    this.ytplayer.playVideo()

    if (checkIsMobile()) {
      return this.requestFullScreen()
    }

    if (isFirefox) {
      // Solicitar o fullscreen
      this.requestFullScreen()
      // Iniciar o zoom in
      zoomIn(this.wrapper)
    } else {
      // Iniciar o zoom in
      await zoomIn(this.wrapper)
      // Solicitar o fullscreen
      this.requestFullScreen()
    }
  }

  private async onExitFullScreen() {
    this.ytplayer.pauseVideo()

    if (!checkIsMobile()) {
      // Iniciar o zoom out
      await zoomOut(this.wrapper)
    }

    // Voltar a mostrar o botão de play
    this.overlay.style.display = ''
  }

  private requestFullScreen() {
    // @ts-ignore
    const requestFullscreen = this.iframe.requestFullscreen || this.iframe.mozRequestFullscreen || this.iframe.webkitRequestFullscreen
    
    if (requestFullscreen) requestFullscreen.bind(this.iframe)()
  }

  private calcPlayerSize() {
    const fortyPercentOfWindowWidth = (0.4 * window.innerWidth)
    const windowWidthWithoutPadding = (window.innerWidth - (30 * 2))

    this.width = checkIsMobile() ? windowWidthWithoutPadding : fortyPercentOfWindowWidth
    this.height = calcWidthAspectRatio(this.width)

    this.wrapper.style.height = `${this.height}px`
    this.wrapper.style.width = `${this.width}px`
    this.iframe.style.height = `${this.height}px`
    this.iframe.style.width = `${this.width}px`

    document.body.classList.toggle('is-mobile', checkIsMobile())
  }

}