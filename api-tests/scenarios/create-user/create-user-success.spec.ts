import { test } from "../../api-services";
import fs from "fs";
import path from "path";
import { parse } from "csv-parse/sync";
import { CreateUserInput } from "../../api-services/user.api-service";

const csvFilePath = path.resolve(
  __dirname,
  "./test-data/create-user-success.test-data.csv"
);
const csvData = fs.readFileSync(csvFilePath, "utf-8");
const createUserTestData = parse(csvData, {
  columns: true, // Convert rows into objects using the header row
  skip_empty_lines: true,
}) as CreateUserInput[];

test.describe("Create user success", () => {
  for (const testUser of createUserTestData) {
    const { username, firstName, lastName } = testUser;

    test(`Create a new user for ${firstName} ${lastName}`, async ({
      userApiService,
    }) => {
      await test.info().attach("Create user payload", {
        body: JSON.stringify(testUser, null, 2),
        contentType: "application/json",
      });

      const { userId } = (await userApiService.createUser(testUser)) ?? {};

      const user = await userApiService.getUserByUsername(username);

      await userApiService.verifyUserData({
        received: user,
        expected: {
          id: userId,
          ...testUser,
          userStatus: Number(testUser.userStatus),
        },
      });
    });
  }
});
