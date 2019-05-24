// Firefox 1.0+. Stolen from https://stackoverflow.com/a/9851769/2789759
// @ts-ignore
export const isFirefox = typeof InstallTrigger !== 'undefined'

// @ts-ignore
export const checkIsFullScreen = () => (document.fullScreen || document.mozFullScreen || document.webkitIsFullScreen || document.msFullscreenElement || false) as boolean

export const checkIsMobile = () => window.innerWidth < 640

/**
 * Calcular a nova altura respeitando a proporção.
 *
 * @param {number} maxWidth 
 * @return {number} relativeHeight
 *
 * @example
 * calcWidthAspectRatio(400) // 640
 */
export function calcWidthAspectRatio(maxWidth: number): number {
  let relativeHeight = Math.round((maxWidth / 16) * 9) // Aspect Ratio 16:9
  return relativeHeight
}

export function zoomIn(element: HTMLElement) {
  let { left, top, width, height } = element.getBoundingClientRect()
  const scale = Math.max(Math.min( window.innerWidth / width, window.innerHeight / height ), 1)

  left *= scale
  top *= scale

  return magnify(scale, { left, top, width, height })
}

export function zoomOut(element: HTMLElement) {
  return magnify(1)
}

type Rect = {
  width: number;
  height: number;
  top: number;
  left: number;
}

/**
 * @see https://github.com/hakimel/zoom.js/blob/master/js/zoom.js
 */
function magnify(scale: number, rect?: Rect) {
  return new Promise((resolve, reject) => {
    const TRANSITION_DURATION = 800
    const scrollOffset = {
      left: window.scrollX !== undefined ? window.scrollX : window.pageXOffset,
      top: window.scrollY !== undefined ? window.scrollY : window.pageYOffset
    }
  
    if (scale === 1) {
      // Zoom out
      document.body.style.transform = '';
    }
    else {
      // Zoom in. Center the rect within the zoomed viewport
      rect.left -= ( window.innerWidth - ( rect.width * scale ) ) / 2
      rect.top -= ( window.innerHeight - ( rect.height * scale ) ) / 2
    
      const origin = `${scrollOffset.left}px ${scrollOffset.top}px`
      const transform = `translate(${-rect.left}px,${-rect.top}px) scale(${scale})`
      const transition = `transform ${TRANSITION_DURATION}ms ease`

      document.body.style.transformOrigin = origin;
      document.body.style.transform = transform;
      document.body.style.transition = transition;
    }

    // Resolve the promise after the transition
    setTimeout(resolve, TRANSITION_DURATION);
  })
}
