import { Messenger } from "./messenger";

const createSut = () => {
    return new Messenger();
};

describe("Messenger", () => {
    afterEach(() => jest.clearAllMocks());

    it("should return undefined", () => {
        // System under test
        const sut = createSut();
        expect(sut.sendMessage("teste")).toBeUndefined();
    });

    it("should call console.log once", () => {
        const sut = createSut();
        const consoleSpy = jest.spyOn(console, "log");
        sut.sendMessage("teste");
        expect(consoleSpy).toHaveBeenCalledTimes(1);
    });

    it("should call console.log with 'Message sent: ', msg", () => {
        const sut = createSut();
        const consoleSpy = jest.spyOn(console, "log");
        const msg = "teste";
        sut.sendMessage(msg);
        expect(consoleSpy).toHaveBeenCalledWith("Message sent: ", msg);
    });
});
