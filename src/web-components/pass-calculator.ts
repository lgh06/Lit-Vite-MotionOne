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
  async clicked_bak() {
    // https://github.com/jedisct1/libsodium.js/blob/354ec814b9/README.md#usage-as-a-module
    // https://github.com/jedisct1/libsodium-doc/tree/master/quickstart#one-shot-encryption-where-everything-fits-in-memory
    // https://github.com/paragonie/sodium-plus/tree/master/docs/SodiumPlus
    await _sodium.ready;
    const sodium = _sodium;

    let key = sodium.crypto_secretstream_xchacha20poly1305_keygen();

    let res = sodium.crypto_secretstream_xchacha20poly1305_init_push(key);
    console.log(key, res)
    let [state_out, header] = [res.state, res.header];
    let c1 = sodium.crypto_secretstream_xchacha20poly1305_push(state_out,
      sodium.from_string('message 1'), null,
      sodium.crypto_secretstream_xchacha20poly1305_TAG_MESSAGE);
    let c2 = sodium.crypto_secretstream_xchacha20poly1305_push(state_out,
      sodium.from_string('message 2'), null,
      sodium.crypto_secretstream_xchacha20poly1305_TAG_FINAL);

    let state_in = sodium.crypto_secretstream_xchacha20poly1305_init_pull(header, key);
    let r1 = sodium.crypto_secretstream_xchacha20poly1305_pull(state_in, c1);
    let [m1, tag1] = [sodium.to_string(r1.message), r1.tag];
    let r2 = sodium.crypto_secretstream_xchacha20poly1305_pull(state_in, c2);
    let [m2, tag2] = [sodium.to_string(r2.message), r2.tag];

    console.log(m1);
    console.log(m2);

  }
  async clicked_bak2(event: Event) {
    const btn = event.target as HTMLButtonElement;
    // https://github.com/paragonie/sodium-plus/blob/master/docs/SodiumPlus/AEAD.md
    // https://gist.github.com/lgh06/d8038ab080dae78790dd3af6d8330515
    await _sodium.ready;
    const sodium = _sodium;
    let plaintext = this.password;
    if (this.encryptKey.length < 16) {
      this.encryptKey = this.encryptKey.concat(Array(16 - this.encryptKey.length).fill(0).join(''))
    }

    let key = sodium.to_hex(this.encryptKey)// 
    // let key2 = sodium.crypto_aead_xchacha20poly1305_ietf_keygen();
    // console.log(key2.length)
    let nonce = sodium.randombytes_buf(24);
    if (btn.dataset.btnType === "0") {
      // 加密
      let ciphertext = sodium.crypto_aead_xchacha20poly1305_ietf_encrypt(
        plaintext,
        null,
        null,
        nonce,
        key
      );
      // console.log(ciphertext, ciphertext.toString('hex'));
      console.log(ciphertext, new TextDecoder().decode(ciphertext))
      this.password = ciphertext.toString('hex');
      // console.log(this.password)
    }else if (btn.dataset.btnType === "1") {
      // 解密

  
      let decrypted = sodium.crypto_aead_xchacha20poly1305_ietf_decrypt(
        null,
        new TextEncoder().encode(this.password),
        null,
        nonce,
        key
      );
      console.log(sodium.to_string(decrypted))
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
