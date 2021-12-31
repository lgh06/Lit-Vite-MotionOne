// Index page logics for executing kinds of JS in modules
import {animate as testAnimate} from "./Animate.js";
import {animate} from "motion";
export default function(){
  // animate(document.querySelector('first-element'))
  animate('first-element', {x: 200},{duration: 5})
  console.log('Index Page')
}