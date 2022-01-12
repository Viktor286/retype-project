const topIconIndex = [
  'anchor-solid.svg', 'canadian-maple-leaf-brands.svg', 'cut-solid.svg', 'play-circle-solid.svg', 'snowflake-solid.svg',
  'angellist-brands.svg', 'cannabis-solid.svg', 'dharmachakra-solid.svg', 'power-off-solid.svg', 'space-shuttle-solid.svg',
  'ankh-solid.svg', 'cat-solid.svg', 'fist-raised-solid.svg', 'python-brands.svg', 'spider-solid.svg',
  'arrow-alt-circle-right-regular.svg', 'child-solid.svg', 'globe-africa-solid.svg', 'question-circle-solid.svg', 'utensils-solid.svg',
  'arrow-alt-circle-right-solid.svg', 'cog-solid.svg', 'globe-americas-solid.svg', 'radiation-alt-solid.svg', 'volleyball-ball-solid.svg',
  'atom-solid.svg', 'compact-disc-solid.svg', 'heart-solid.svg', 'reddit-brands.svg', 'wrench-solid.svg',
  'bahai-solid.svg', 'compass-regular.svg', 'moon-solid.svg', 'robot-solid.svg', 'yin-yang-solid.svg',
  'bomb-solid.svg', 'cookie-bite-solid.svg', 'om-solid.svg', 'satellite-solid.svg',
  'bug-solid.svg', 'crown-solid.svg', 'paw-solid.svg', 'skull-solid.svg',
];

function getRandomIcon() {
  const randomIndex = Math.round(Math.random() * (topIconIndex.length - 1));
  return topIconIndex[randomIndex];
}

export async function getTopSvgIcon() {
  const req =` /img/${getRandomIcon()}`;
  const res = await fetch(req);
  return await res.text();
}

export const defaultTopSvgIcon = '<svg aria-hidden="true" focusable="false" data-prefix="far" data-icon="hourglass" class="svg-inline--fa fa-hourglass" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><path fill="currentColor" d="M0 24C0 10.75 10.75 0 24 0H360C373.3 0 384 10.75 384 24C384 37.25 373.3 48 360 48H352V66.98C352 107.3 335.1 145.1 307.5 174.5L225.9 256L307.5 337.5C335.1 366 352 404.7 352 445V464H360C373.3 464 384 474.7 384 488C384 501.3 373.3 512 360 512H24C10.75 512 0 501.3 0 488C0 474.7 10.75 464 24 464H32V445C32 404.7 48.01 366 76.52 337.5L158.1 256L76.52 174.5C48.01 145.1 32 107.3 32 66.98V48H24C10.75 48 0 37.25 0 24V24zM99.78 384H284.2C281 379.6 277.4 375.4 273.5 371.5L192 289.9L110.5 371.5C106.6 375.4 102.1 379.6 99.78 384H99.78zM284.2 128C296.1 110.4 304 89.03 304 66.98V48H80V66.98C80 89.03 87 110.4 99.78 128H284.2z"></path></svg>';

export const svgLogo = '<svg aria-hidden="true" focusable="false" data-prefix="far" data-icon="keyboard" class="svg-inline--fa fa-keyboard" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><path fill="currentColor" d="M512 64H64C28.65 64 0 92.65 0 128v256c0 35.35 28.65 64 64 64h448c35.35 0 64-28.65 64-64V128C576 92.65 547.3 64 512 64zM528 384c0 8.822-7.178 16-16 16H64c-8.822 0-16-7.178-16-16V128c0-8.822 7.178-16 16-16h448c8.822 0 16 7.178 16 16V384zM140 152h-24c-6.656 0-12 5.344-12 12v24c0 6.656 5.344 12 12 12h24c6.656 0 12-5.344 12-12v-24C152 157.3 146.7 152 140 152zM196 200h24c6.656 0 12-5.344 12-12v-24c0-6.656-5.344-12-12-12h-24c-6.656 0-12 5.344-12 12v24C184 194.7 189.3 200 196 200zM276 200h24c6.656 0 12-5.344 12-12v-24c0-6.656-5.344-12-12-12h-24c-6.656 0-12 5.344-12 12v24C264 194.7 269.3 200 276 200zM356 200h24c6.656 0 12-5.344 12-12v-24c0-6.656-5.344-12-12-12h-24c-6.656 0-12 5.344-12 12v24C344 194.7 349.3 200 356 200zM460 152h-24c-6.656 0-12 5.344-12 12v24c0 6.656 5.344 12 12 12h24c6.656 0 12-5.344 12-12v-24C472 157.3 466.7 152 460 152zM140 232h-24c-6.656 0-12 5.344-12 12v24c0 6.656 5.344 12 12 12h24c6.656 0 12-5.344 12-12v-24C152 237.3 146.7 232 140 232zM196 280h24c6.656 0 12-5.344 12-12v-24c0-6.656-5.344-12-12-12h-24c-6.656 0-12 5.344-12 12v24C184 274.7 189.3 280 196 280zM276 280h24c6.656 0 12-5.344 12-12v-24c0-6.656-5.344-12-12-12h-24c-6.656 0-12 5.344-12 12v24C264 274.7 269.3 280 276 280zM356 280h24c6.656 0 12-5.344 12-12v-24c0-6.656-5.344-12-12-12h-24c-6.656 0-12 5.344-12 12v24C344 274.7 349.3 280 356 280zM460 232h-24c-6.656 0-12 5.344-12 12v24c0 6.656 5.344 12 12 12h24c6.656 0 12-5.344 12-12v-24C472 237.3 466.7 232 460 232zM400 320h-224C167.1 320 160 327.1 160 336V352c0 8.875 7.125 16 16 16h224c8.875 0 16-7.125 16-16v-16C416 327.1 408.9 320 400 320z"></path></svg>';
