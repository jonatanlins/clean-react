import { HttpPostParams } from "@/data/protocols/http";
import faker from "faker";

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
