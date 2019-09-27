# zoom-animation-on-video

This is a simple demonstration of an idea I had, which consists of making a zoom effect on the page to the region where a video is located when the user clicks on it to watch in full screen.

[![Online Demo](https://img.shields.io/badge/Online-Demo-brightgreen.svg)](https://iagobruno.github.io/zoom-animation-on-video/)

## Compatibility

I tested this effect on Chrome and Firefox (other browsers should be tested in case of future use) and I had a small problem with Firefox for doing the animation correctly, [because Firefox does not allow delaying the fullscreen request](https://developer.mozilla.org/pt-BR/docs/Web/API/Fullscreen_API#When_a_fullscreen_request_fails) when the user clicks a button, then the effect can not be correctly checked on it 😕.

## Commands

- **yarn run start**: Starting [Parcel](https://github.com/parcel-bundler/parcel) in development mode with live-reload.
- **yarn run build**: Create a production version of the site ready to be hosted.
- **yarn run deploy**: Deploy demonstration on Github Pages.

## Inspiration

This demo was inspired by another project, called [zoom.js](https://github.com/hakimel/zoom.js).

## License

MIT