// Index page logics for executing kinds of JS in modules
import {animate} from "./Animate.js";
export default function(){
  animate(document.querySelector('first-element'))
  console.log('Index Page')
}