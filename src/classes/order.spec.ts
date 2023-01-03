/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-empty-function */
import { CartItem } from "./interfaces/cart-item";
import { CustomerOrder } from "./interfaces/customer-protocol";
import { MessengerProtocol } from "./interfaces/messenger-protocol";
import { PersistenceProtocol } from "./interfaces/persistence-protocol";
import { ShoppingCartProtocol } from "./interfaces/shopping-cart-protocol";
import { Order } from "./order";

class ShoppingCartMock implements ShoppingCartProtocol {
    get items(): Readonly<CartItem[]> {
        return [];
    }

    addItem(item: CartItem): void {}

    removeItem(index: number): void {}

    total(): number {
        return 1;
    }

    totalWithDiscount(): number {
        return 2;
    }

    isEmpty(): boolean {
        return false;
    }

    clear(): void {}
}

class MessengerMock implements MessengerProtocol {
    sendMessage(): void {}
}

class PersistenceMock implements PersistenceProtocol {
    saveOrder(): void {}
}

class CustomerMock implements CustomerOrder {
    getName(): string {
        return "";
    }
    getIDN(): string {
        return "";
    }
}

const createSut = () => {
    const shoppingCartMock = new ShoppingCartMock();
    const messengerMock = new MessengerMock();
    const customerMock = new CustomerMock();
    const persistenceMock = new PersistenceMock();
    const order = new Order(
        shoppingCartMock,
        messengerMock,
        persistenceMock,
        customerMock,
    );

    return {
        sut: order,
        shoppingCartMock,
        messengerMock,
        persistenceMock,
    };
};

describe("Order", () => {
    it("should not checkout if cart is empty", () => {
        const { sut, shoppingCartMock } = createSut();
        const shoppingCartMockSpy = jest
            .spyOn(shoppingCartMock, "isEmpty")
            .mockReturnValueOnce(true);

        sut.checkout();
        expect(shoppingCartMockSpy).toHaveBeenCalledTimes(1);
        expect(sut.orderStatus).toBe("open");
    });

    it("should not checkout if cart is not empty", () => {
        const { sut, shoppingCartMock } = createSut();
        const shoppingCartMockSpy = jest
            .spyOn(shoppingCartMock, "isEmpty")
            .mockReturnValueOnce(false);

        sut.checkout();
        expect(shoppingCartMockSpy).toHaveBeenCalledTimes(1);
        expect(sut.orderStatus).toBe("closed");
    });

    it("should send an email to customer", () => {
        const { sut, messengerMock } = createSut();
        const messengerMockSpy = jest.spyOn(messengerMock, "sendMessage");
        sut.checkout();
        expect(messengerMockSpy).toHaveBeenCalledTimes(1);
    });

    it("should save order", () => {
        const { sut, persistenceMock } = createSut();
        const persistenceMockSpy = jest.spyOn(persistenceMock, "saveOrder");
        sut.checkout();
        expect(persistenceMockSpy).toHaveBeenCalledTimes(1);
    });

    it("should clear cart", () => {
        const { sut, shoppingCartMock } = createSut();
        const shoppingCartMockSpy = jest.spyOn(shoppingCartMock, "clear");
        sut.checkout();
        expect(shoppingCartMockSpy).toHaveBeenCalledTimes(1);
    });
});
