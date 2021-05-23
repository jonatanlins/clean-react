import { InvalidCredentialsError } from "@/domain/error/invalid-credentials-error";
import { mockAuthentication } from "@/domain/test/mock-authentication";
import { HttpPostClientSpy } from "@/data/test/mock-http-client";
import { RemoteAuthentication } from "@/data/usecases/authentication/remote-authentication";
import faker from "faker";
import { HttpStatusCode } from "@/data/protocols/http/http-response";

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
  test("Should call HttpClient with correct URL", async () => {
    const url = faker.internet.url();
    const { sut, httpPostClientSpy } = makeSut(url);
    await sut.auth(mockAuthentication());
    expect(httpPostClientSpy.url).toBe(url);
  });

  test("Should call HttpClient with correct body", async () => {
    const { sut, httpPostClientSpy } = makeSut();
    const authenticationParams = mockAuthentication();
    await sut.auth(authenticationParams);
    expect(httpPostClientSpy.body).toEqual(authenticationParams);
  });

  test("Should throw InvalidCredentialsError if HttpClient returns 401", async () => {
    const { sut, httpPostClientSpy } = makeSut();
    httpPostClientSpy.response = { statusCode: HttpStatusCode.unauthorized };
    const promise = sut.auth(mockAuthentication());
    expect(promise).rejects.toThrow(new InvalidCredentialsError());
  });
});
