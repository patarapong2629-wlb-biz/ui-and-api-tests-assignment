import { test, type APIRequestContext, expect } from "@playwright/test";

export interface CreateUserInput {
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phone: string;
  userStatus: number;
}

interface CreateUserResponse {
  userId: number;
}

interface GetUserResponse extends CreateUserInput {
  id: number;
}

interface VerifyUserDataInput {
  received?: GetUserResponse;
  expected: GetUserResponse;
}

export class UserApiService {
  readonly request: APIRequestContext;

  constructor(request: APIRequestContext) {
    this.request = request;
  }

  async createUser(input: CreateUserInput): Promise<CreateUserResponse> {
    return await test.step(`Create a new user with username ${input.username}`, async () => {
      const response = await this.request.post("/v2/user", {
        data: input,
      });

      const responseData = await response.json();

      const userId = Number(responseData?.message);

      expect(response.status()).toBe(200);
      expect(userId).not.toBe(0); // This API always return 200 status, therefore verify the message to confirm success

      return { userId };
    });
  }

  async getUserByUsername(
    username: string
  ): Promise<GetUserResponse | undefined> {
    return await test.step(`Get a user with username ${username}`, async () => {
      let user;

      await expect
        .poll(
          async () => {
            const response = await this.request.get(`/v2/user/${username}`);
            user = await response.json();
            return response.status();
          },
          {
            intervals: [2000, 5000],
            timeout: 10000,
          }
        )
        .toBe(200);

      return user;
    });
  }

  async verifyUserData(input: VerifyUserDataInput): Promise<void> {
    const { received, expected } = input;

    await test.step(`Verify user data`, async () => {
      expect([received]).toMatchObject([expected]);
    });
  }
}
