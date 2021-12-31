/**
 * @param {HTMLElement} element The Element waiting to be animated
 */
 export function testAnimate(element) {
  element.animate([
    { background: '#ff004d', offset: 0 },
    { background: '#ff77ab', offset: 0.20 },
    { background: '#00e756', offset: 0.5 },
    { background: '#29adff', offset: 0.80 },
    { background: '#ff77ab', offset: 1 }
  ], {
    duration: 2000,
    direction: 'alternate',
    iterations: Infinity
  });
}
import {animate} from "motion";
export default function(){
  // testAnimate(document.querySelector('first-element'))
  // animate('first-element', {x: 200},{duration: 5})
  console.log('Index Page')
}