import {
    Discount,
    FiftyPercentDiscount,
    NoDiscount,
    TenPercentDiscount,
} from "./discount";

const createSut = (className: new () => Discount): Discount => {
    return new className();
};

describe("Discount", () => {
    afterEach(() => jest.clearAllMocks());

    it("should have no discount", () => {
        // System under test
        const sut = createSut(NoDiscount);
        expect(sut.calculate(10.99)).toBeCloseTo(10.99);
    });

    it("should apply 10% discount on price", () => {
        const sut = createSut(TenPercentDiscount);
        expect(sut.calculate(150.5)).toBeCloseTo(135.45);
    });

    it("should apply 50% discount on price", () => {
        const sut = createSut(FiftyPercentDiscount);
        expect(sut.calculate(150.5)).toBeCloseTo(75.25);
    });
});
