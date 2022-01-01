import Moveable from "moveable";

export default function () {
  console.log('dnd')


  /**
   * 
   * drag和Drop，要搞清拖拽(drag)的是哪个元素，把这个元素扔(drop)在哪个元素内
   * 同时，还有很多事件，如dragstart：拖拽刚开始
   * dragover: 拖拽的元素经过了目标drop zone
   * drop： 鼠标松开了，此拖拽过程结束。
   * 这其中都可以用JS动态改变拖拽元素以及目标区域(dropzone)的DOM和CSS，
   * 实现一些交互上的提示效果。
   * 但也仅仅是这样了。
   * 要实现类似Moveable的效果，还是得用mousemove之类的事件。
   */

  function dragstart_handler(ev) {
    // Add the target element's id to the data transfer object
    console.log(ev.target, ev.target.className)
    console.dir(ev.target)
    ev.target.style.opacity = .9;
    ev.dataTransfer.setData("text/plain", ev.target.className);
    // ev.dataTransfer.effectAllowed = "move";

  }

  window.addEventListener('DOMContentLoaded', () => {

    return;
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

  /**
   * 以上是原生drag and drop逻辑
   * 以下是moveable库的测试
   */

  //  https://github.com/daybrush/moveable/blob/master/handbook/handbook.md#vanilla-example
  const moveable = new Moveable(document.querySelector('.moveable-area-wrap'), {
    // If you want to use a group, set multiple targets(type: Array<HTMLElement | SVGElement>).
    target: document.querySelector('.ele'),
    draggable: true,
    throttleDrag: 0,
    throttleDragRotate: 0,
  });

  const frame = {
    translate: [0, 0],
  };
  moveable.on("dragStart", e => {
    e.set(frame.translate);
  }).on("drag", e => {
    frame.translate = e.beforeTranslate;
    e.target.style.transform
      = `translate(${e.beforeTranslate[0]}px, ${e.beforeTranslate[1]}px)`;
  }).on("dragEnd", e => {
    console.log("onDragEnd", e.target, e.isDrag);
  });
}