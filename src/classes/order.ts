import { OrderStatus } from "./interfaces/order-status";
import { CustomerOrder } from "./interfaces/customer-protocol";
import { ShoppingCartProtocol } from "./interfaces/shopping-cart-protocol";
import { MessengerProtocol } from "./interfaces/messenger-protocol";
import { PersistenceProtocol } from "./interfaces/persistence-protocol";

export class Order {
    private _orderStatus: OrderStatus = "open";

    constructor(
        private readonly cart: ShoppingCartProtocol,
        private readonly messenger: MessengerProtocol,
        private readonly persistence: PersistenceProtocol,
        private readonly customer: CustomerOrder,
    ) {}

    get orderStatus(): OrderStatus {
        return this._orderStatus;
    }

    checkout(): void {
        if (this.cart.isEmpty()) {
            console.log("your cart is empty.");
            return;
        }

        this._orderStatus = "closed";
        this.messenger.sendMessage(
            `your order with a total of ${this.cart.totalWithDiscount()} was received.`,
        );
        this.persistence.saveOrder();
        this.cart.clear();

        console.log(
            "The client is:",
            this.customer.getName(),
            this.customer.getIDN(),
        );
    }
}
