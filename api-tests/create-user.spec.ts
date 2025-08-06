import { test, expect } from '@playwright/test';
import { faker } from '@faker-js/faker';

test.describe('Create user', () => {
  test('Create a new user with valid data', async ({ request }) => {
    interface User {
      id: number;
      username: string;
      firstName: string;
      lastName: string;
      email: string;
      password: string;
      phone: string;
      userStatus: number;
    }

    const payload: Omit<User, 'id'> = {
      username: faker.internet.username(),
      firstName: faker.person.firstName(),
      lastName: faker.person.lastName(),
      email: faker.internet.email(),
      password: faker.internet.password(),
      phone: faker.phone.number(),
      userStatus: 1,
    };
    let createUserResponseStatusCode: number,
      createUserResponseMessage: string = '0',
      getUserByUsernameResponseStatusCode: number,
      user: User;

    await test.info().attach('Create user payload', {
      body: JSON.stringify(payload, null, 2),
      contentType: 'application/json',
    });

    await test.step(`Create a new user with username ${payload.username}`, async () => {
      const response = await request.post('/v2/user', {
        data: payload,
      });

      createUserResponseStatusCode = response.status();

      const responseData = await response.json();
      createUserResponseMessage = responseData.message;
    });

    await test.step('Check create user response status code must be 200', async () => {
      expect(createUserResponseStatusCode).toBe(200);
    });

    await test.step(`Check create user response message (new user id) must not be "0"`, async () => {
      expect(createUserResponseMessage).not.toBe('0');
    });

    await test.step(`Get a user with username ${payload.username}`, async () => {
      // Sometimes the API return 404 even the user data is existed
      await expect
        .poll(
          async () => {
            const response = await request.get(`/v2/user/${payload.username}`);

            getUserByUsernameResponseStatusCode = response.status();

            user = await response.json();

            return getUserByUsernameResponseStatusCode;
          },
          {
            intervals: [1000, 2000],
            timeout: 10000,
          }
        )
        .toBe(200);
    });

    await test.step(`Check get a user with username ${payload.username} response status code must be 200`, async () => {
      expect(getUserByUsernameResponseStatusCode).toBe(200);
    });

    await test.step('Check user data', async () => {
      await test.step(`Check user id must be same as create user response message (${createUserResponseMessage})`, async () => {
        expect(user.id).toBe(Number(createUserResponseMessage));
      });

      await test.step(`Check username must be ${payload.username}`, async () => {
        expect(user.username).toBe(payload.username);
      });

      await test.step(`Check first name must be ${payload.firstName}`, async () => {
        expect(user.firstName).toBe(payload.firstName);
      });

      await test.step(`Check last name must be ${payload.lastName}`, async () => {
        expect(user.lastName).toBe(payload.lastName);
      });

      await test.step(`Check email must be ${payload.email}`, async () => {
        expect(user.email).toBe(payload.email);
      });

      await test.step(`Check password must be ${payload.password}`, async () => {
        expect(user.password).toBe(payload.password);
      });

      await test.step(`Check phone must be ${payload.phone}`, async () => {
        expect(user.phone).toBe(payload.phone);
      });

      await test.step(`Check user status must be ${payload.userStatus}`, async () => {
        expect(user.userStatus).toBe(payload.userStatus);
      });
    });
  });
});
