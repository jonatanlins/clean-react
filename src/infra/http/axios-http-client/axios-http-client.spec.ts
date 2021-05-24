import { AxiosHttpClient } from "@/infra/http/axios-http-client/axios-http-client";
import axios from "axios";
import { mockPostRequest } from "@/infra/test";

jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;

type SutTypes = {
  sut: AxiosHttpClient;
};

const makeSut = (): SutTypes => {
  const sut = new AxiosHttpClient();
  return { sut };
};

describe("AxiosHttpClient", () => {
  test("Should call axios with correct verb, URL and body", async () => {
    const request = mockPostRequest();
    const { sut } = makeSut();
    await sut.post(request);
    expect(mockedAxios.post).toHaveBeenCalledWith(request.url, request.body);
  });
});
