import faker from "faker";
import { AxiosHttpClient } from "@/infra/http/axios-http-client/axios-http-client";
import axios from "axios";

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
  test("Should call axios with correct URL", async () => {
    const { sut } = makeSut();
    const url = faker.internet.url();
    await sut.post({ url });
    expect(mockedAxios).toHaveBeenCalledWith(url);
  });
});
