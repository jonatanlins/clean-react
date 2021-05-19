import { RemoteAuthentication } from "./remote-authentication";
import { HttpPostClientSpy } from "../../test/mock-http-client";
import faker from "faker";
import { mockAuthentication } from "../../../domain/test/mock-authentication";

type SutTypes = {
  sut: RemoteAuthentication;
  httpPostClientSpy: HttpPostClientSpy;
};

const makeSut = (url: string = faker.internet.url()): SutTypes => {
  const httpPostClientSpy = new HttpPostClientSpy();
  const sut = new RemoteAuthentication(url, httpPostClientSpy);
  return { sut, httpPostClientSpy };
};

describe("RemoteAuthentication", () => {
  test("Should call HttpClient with correct URL", () => {
    const url = faker.internet.url();
    const { sut, httpPostClientSpy } = makeSut(url);
    sut.auth(mockAuthentication());
    expect(httpPostClientSpy.url).toBe(url);
  });

  test("Should call HttpClient with correct body", () => {
    const authenticationParams = mockAuthentication();
    const { sut, httpPostClientSpy } = makeSut();
    sut.auth(authenticationParams);
    expect(httpPostClientSpy.body).toEqual(authenticationParams);
  });
});
