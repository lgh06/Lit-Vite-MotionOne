import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import AES from "crypto-js/aes";
import CFB from "crypto-js/mode-cfb";
import utf8 from "crypto-js/enc-utf8";


@customElement('pass-calculator')
export default class PassCalculator extends LitElement {
  @property()
  userName: string = '';
  @property()
  password: string = '';
  @property()
  encryptKey: string = '';

  render() {
    return html`
      <p>Encrypt / Decrypt Calculator</p>
      <input data-input-index="0" @input=${this.changed} placeholder="Enter your username">
      <br>
      <input data-input-index="1" .value=${this.password} @input=${this.changed} placeholder="Enter your (encrypted) password">
      <br>
      <input data-input-index="2" @input=${this.changed} placeholder="Enter your encrypt key">
      <br>
      <button data-btn-type="0" @click=${this.clicked}>encrypt</button>
      <button data-btn-type="1" @click=${this.clicked}>decrypt</button>
    `;
  }

  changed(event: Event) {
    const input = event.target as HTMLInputElement;
    console.log(input.dataset.inputIndex)
    switch (input.dataset.inputIndex) {
      case "0":
        this.userName = input.value;
        break;
      case "1":
        this.password = input.value;
        break;
      case "2":
        this.encryptKey = input.value;
        break;
      default:
        break;
    }
  }
  async clicked(event: Event){
    const btn = event.target as HTMLButtonElement;
    if (btn.dataset.btnType === "0") {
      console.log(AES)
      var encrypted = AES.encrypt(this.password, this.userName + this.encryptKey, {
        mode: CFB,
      });
      this.password = encrypted.toString();
      console.log(this.password)

    }else if (btn.dataset.btnType === "1"){
      var dec = AES.decrypt(this.password, this.userName + this.encryptKey, {mode: CFB}).toString(utf8);
      console.log(dec)
      this.password = dec;
    }

  }
}
