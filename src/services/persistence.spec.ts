import { Persistence } from "./persistence";

describe("Persistence", () => {
    afterEach(() => jest.clearAllMocks());

    it("should return undefined", () => {
        // System under test
        const sut = new Persistence();
        expect(sut.saveOrder()).toBeUndefined();
    });

    it("should call console.log once", () => {
        const sut = new Persistence();
        const consoleSpy = jest.spyOn(console, "log");
        sut.saveOrder();
        expect(consoleSpy).toHaveBeenCalledTimes(1);
    });

    it("should call console.log with 'Order saved successfully...'", () => {
        const sut = new Persistence();
        const consoleSpy = jest.spyOn(console, "log");
        sut.saveOrder();
        expect(consoleSpy).toHaveBeenCalledWith("Order saved successfully...");
    });
});
