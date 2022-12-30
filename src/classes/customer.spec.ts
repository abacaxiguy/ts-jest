import { EnterpriseCustomer, IndividualCustomer } from "./customer";

const createIndividualCustomer = (
    firstName: string,
    lastName: string,
    cpf: string,
) => {
    return new IndividualCustomer(firstName, lastName, cpf);
};

const createEnterpriseCustomer = (name: string, cnpj: string) => {
    return new EnterpriseCustomer(name, cnpj);
};

afterEach(() => jest.clearAllMocks());

describe("IndividualCustomer", () => {
    const sut = createIndividualCustomer("Joao", "Lucas", "123.456.789-00");

    it("should have firstName, lastName and CPF", () => {
        expect(sut).toHaveProperty("firstName", "Joao");
        expect(sut).toHaveProperty("lastName", "Lucas");
        expect(sut).toHaveProperty("cpf", "123.456.789-00");
    });

    it("should have methods for name and IDN (individual customer)", () => {
        expect(sut.getName()).toBe("Joao Lucas");
        expect(sut.getIDN()).toBe("123.456.789-00");
    });
});

describe("EnterpriseCustomer", () => {
    const sut = createEnterpriseCustomer("Google", "11.111.111/0001-11");

    it("should have name and cnpj", () => {
        expect(sut).toHaveProperty("name", "Google");
        expect(sut).toHaveProperty("cnpj", "11.111.111/0001-11");
    });

    it("should have methods for name and IDN (enterprise customer)", () => {
        expect(sut.getName()).toBe("Google");
        expect(sut.getIDN()).toBe("11.111.111/0001-11");
    });
});
