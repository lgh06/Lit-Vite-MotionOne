import {LitElement, html} from 'lit';
import {customElement, property, state} from 'lit/decorators.js';
import {animate, AnimationControls} from "motion";
import JSON from "json5";


@customElement('anime-gen')
export default class NameTag extends LitElement {
  @property({type: Array})
  param: Array<string> = ['first-element', '{x:50}','{duration: 5}' ];
  @property({type: Array})
  paramJSON: Array<any> = [];
  @state()
  animateControl!: AnimationControls;

  render() {
    return html`
      <input @input=${(event: InputEvent) => this.changeValue(event, 0)} placeholder="Enter css selector"><br>
      <input @input=${(event: InputEvent) => this.changeValue(event, 1)} placeholder="Enter property to animate to"><br>
      <input @input=${(event: InputEvent) => this.changeValue(event, 2)} placeholder="Enter config, like {duration: 3}"><br>
      <button @click=${this.clickButton}>动起来</button>
    `;
  }

  changeValue(event: Event, index: number) {
    console.log(event, index)
    const input = event.target as HTMLInputElement;
    this.param[index] = input.value;
    console.log(this.param)
  }
  async clickButton() {
    console.log(this.param)
    this.param.forEach((v, i) => {
      if(this.paramJSON[i] === undefined){
        if(String(v).startsWith("{")){
          this.paramJSON[i] = JSON.parse(v);
        }else{
          this.paramJSON[i] = v;
        }
      }else{
      }
      console.log(this.paramJSON)
    });
    this.animateControl = animate(this.paramJSON[0], this.paramJSON[1], this.paramJSON[2])
    await this.animateControl.finished;
    this.paramJSON[1].x +=50;
  }
}