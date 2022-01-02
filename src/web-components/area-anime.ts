import { LitElement, html, css, } from 'lit';
import { customElement, property } from 'lit/decorators.js';

@customElement('area-anime')
export class AreaAnime extends LitElement {
  @property()
  name: string = 'Your name here';

  @property()
  containerWidth: string = '1600';

  @property()
  containerHeight: string = '900';

  static styles = css`
    .area-anime-container{
      background-color: #eee;
    }
  `;

  render() {
    const containerStyles = html`
    <style>
    .area-anime-container{
      width: ${this.containerWidth}px;
      height: ${this.containerHeight}px;
    }
    </style>
    `;
    return html`
      ${containerStyles}
      <div class="area-anime-container">
        <div class="area-anime-outer">
          <div class="area-anime-inner">
            <p>Hello, ${this.name}</p>
            <input @input=${this.changeName} placeholder="Enter your name">
          </div>
        </div>
      </div>
    `;
  }

  changeName(event: Event) {
    const input = event.target as HTMLInputElement;
    this.name = input.value;
  }
}
