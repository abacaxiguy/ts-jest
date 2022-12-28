import { MessengerProtocol } from "../classes/interfaces/messenger-protocol";

export class Messenger implements MessengerProtocol {
    sendMessage(msg: string): void {
        console.log("Message sent: ", msg);
    }
}
