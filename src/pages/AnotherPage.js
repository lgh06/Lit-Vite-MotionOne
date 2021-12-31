import { testAnimate } from "../lib"
// Another page logics for executing kinds of JS in modules
export default function(){
  testAnimate(document.querySelector('first-element'))
  console.log('Anther page')
}