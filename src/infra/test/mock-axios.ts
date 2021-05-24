import { HttpPostParams } from "@/data/protocols/http";
import faker from "faker";
import axios from "axios";

export const mockPostRequest = (): HttpPostParams<any> => {
  return {
    url: faker.internet.url(),
    body: {
      name: faker.name.firstName(),
      phone: faker.phone.phoneNumber(),
      job: faker.name.jobTitle(),
    },
  };
};

export const mockedAxiosResult = {
  data: faker.random.alphaNumeric(),
  status: faker.datatype.number(),
};

export const mockAxios = (): jest.Mocked<typeof axios> => {
  const mockedAxios = axios as jest.Mocked<typeof axios>;

  mockedAxios.post.mockResolvedValue(mockedAxiosResult);

  return mockedAxios;
};
