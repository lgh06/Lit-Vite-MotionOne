export default function(){
  console.log('dnd')


  function dragstart_handler(ev) {
    // Add the target element's id to the data transfer object
    console.log(ev.target, ev.target.className)
    console.dir(ev.target)
    ev.target.style.opacity = .9;
    ev.dataTransfer.setData("text/plain", ev.target.className);
    // ev.dataTransfer.effectAllowed = "move";

  }

  window.addEventListener('DOMContentLoaded', () => {
    // Get the element by id
    const element = document.querySelector("img");
    // Add the ondragstart event listener
    element.addEventListener("dragstart", dragstart_handler);
    
    const dropZone = document.querySelector(".drop-zone")
    dropZone.addEventListener("drop", drop_handler);
    dropZone.addEventListener("dragover", dragover_handler);
  });

  function dragover_handler(ev) {
    ev.preventDefault();
    ev.dataTransfer.dropEffect = "move";
   }
  function drop_handler(ev) {
    ev.preventDefault();
    // Get the id of the target and add the moved element to the target's DOM
    const data = ev.dataTransfer.getData("text/plain");
    ev.target.appendChild(document.querySelector(data));
  }
}