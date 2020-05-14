import { Controller } from "stimulus";
import consumer from "../channels/consumer";

export default class extends Controller {
  static targets = ["input", "messages"];

  connect() {
    this.channel = consumer.subscriptions.create("MessageChannel", {
      connected: this._cableConnected.bind(this),
      disconnected: this._cableDisconnected.bind(this),
      received: this._cableReceived.bind(this),
    });
  }
  clearInput() {
    this.inputTarget.value = "";
  }

  _cableConnected() {}

  _cableDisconnected() {}

  _cableReceived(data) {
    this.messagesTarget.innerHTML += data.message;
  }
}
