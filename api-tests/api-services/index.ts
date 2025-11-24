import { test as base } from "@playwright/test";
import { UserApiService } from "./user.api-service";

export const test = base.extend<{
  userApiService: UserApiService;
}>({
  userApiService: async ({ request }, use) => {
    const userApiService = new UserApiService(request);
    await use(userApiService);
  },
});
