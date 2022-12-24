import { PersistenceProtocol } from "../classes/interfaces/persistence-protocol";

export class Persistence implements PersistenceProtocol {
    saveOrder(): void {
        console.log("Order saved successfully...");
    }
}
