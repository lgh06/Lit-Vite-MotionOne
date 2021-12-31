import { html, css, LitElement } from 'lit'


export class AnimeGen extends LitElement {
  static properties = {
    name: {},
  };

  constructor() {
    super();
    this.name = 'Your name here';
  }

  render() {
    return html`
      <input @input=${(event) => this.changeValue(event, 0)} placeholder="Enter css selector"><br>
      <input @input=${(event) => this.changeValue(event, 1)} placeholder="Enter property to animate to"><br>
      <input @input=${(event) => this.changeValue(event, 2)} placeholder="Enter config, like {duration: 3}"><br>
    `;
  }

  changeValue(event, extra) {
    console.log(event, extra)
    const input = event.target;
    this.name = input.value;
  }
}

window.customElements.define('anime-gen', AnimeGen)
