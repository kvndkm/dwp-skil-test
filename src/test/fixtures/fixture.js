import faker from "faker";
export const responseBody = [
  {
    id: faker.random.number(1, 20),
    first_name: faker.name.findName(),
    last_name: faker.name.findName(),
    email: faker.internet.email(),
    ip_address: faker.internet.ip(),
    latitude: faker.address.latitude(),
    longitude: faker.address.longitude(),
    distance: faker.random.number(0.0, 50.0),
  },
];
export const responseObject = {
  statusCode: 200,
  headers: {
    "content-type": "application/json",
  },
};

export const failureObject = {
  statusCode: 422,
  headers: {
    "content-type": "application/json",
  },
};

export const failureBody = {
  value: {
    city: faker.address.city(),
    radius: "abcd",
  },
  error: {
    message: "radius should be numeric and not alphanumeric",
  },
};
