import { ShoppingCartProtocol } from "./interfaces/shopping-cart-protocol";
import { Order } from "./order";

class ShoppingCartMock implements ShoppingCartProtocol {
    get items(): Readonly<any[]> {
        return [];
    }

    addItem(item: any): void {}

    removeItem(index: number): void {}

    total(): number {
        return 1;
    }

    totalWithDiscount(): number {
        return 1;
    }

    isEmpty(): boolean {
        return false;
    }

    clear(): void {}
}

const createSut = () => {
    const discountMock = createDiscountMock();
    const sut = new ShoppingCart(discountMock);
    return { sut, discountMock };
};

const createDiscountMock = () => {
    class DiscountMock extends Discount {}
    return new DiscountMock();
};

const createCartItem = (name: string, price: number) => {
    class CartItemMock implements CartItem {
        constructor(public name: string, public price: number) {}
    }

    return new CartItemMock(name, price);
};

const createSutWithProducts = () => {
    const { sut, discountMock } = createSut();
    const cartItem1 = createCartItem("T-shirt", 40);
    const cartItem2 = createCartItem("Cap", 15);
    sut.addItem(cartItem1);
    sut.addItem(cartItem2);
    return { sut, discountMock };
};

describe("Order", () => {
    it("should not checkout if cart is empty", () => {
        const { sut } = createSut();

        expect(sut.isEmpty()).toBe(true);
    });

    it("should have 2 cart items", () => {
        const { sut } = createSutWithProducts();
        expect(sut.items.length).toBe(2);
    });

    it("should test total and totalWithDiscount", () => {
        const { sut } = createSutWithProducts();
        expect(sut.total()).toBe(55);
        expect(sut.totalWithDiscount()).toBe(55);
    });

    it("should add products and clear cart", () => {
        const { sut } = createSutWithProducts();
        expect(sut.items.length).toBe(2);
        sut.clear();
        expect(sut.items.length).toBe(0);
        expect(sut.isEmpty()).toBe(true);
    });

    it("should remove products", () => {
        const { sut } = createSutWithProducts();
        expect(sut.items.length).toBe(2);
        sut.removeItem(1);
        expect(sut.items.length).toBe(1);
        sut.removeItem(0);
        expect(sut.items.length).toBe(0);
        expect(sut.isEmpty()).toBe(true);
    });

    it("should call discount.calculate once when totalWithDiscount is called", () => {
        const { sut, discountMock } = createSutWithProducts();
        const discountMockSpy = jest.spyOn(discountMock, "calculate");
        sut.totalWithDiscount();
        expect(discountMockSpy).toHaveBeenCalledTimes(1);
    });

    it("should call discount.calculate with total price when totalWithDiscount is called", () => {
        const { sut, discountMock } = createSutWithProducts();
        const discountMockSpy = jest.spyOn(discountMock, "calculate");
        sut.totalWithDiscount();
        expect(discountMockSpy).toHaveBeenCalledWith(sut.total());
    });
});
