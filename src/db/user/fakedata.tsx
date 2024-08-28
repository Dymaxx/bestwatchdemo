import { faker } from "@faker-js/faker";

// Function to generate fake users data
export const fakeUsers = async () => {
  const users = [];

  for (let index = 0; index < 6; index++) {
    users.push({
      fullName: faker.person.fullName(),
      email: faker.internet.email(),
      role: "user",
      profilepic: faker.image.avatar(),
    });
  }
  return users;
};
