import { resetAllUsers } from "@/app/api/utils";
import { test, expect } from "@playwright/test";

test.describe("Apron users", async () => {
  test.beforeEach(async ({ page }) => {
    resetAllUsers();
    await page.goto("http://localhost:3000");
  });

  test("Viewing user list", async ({ page }) => {
    const rows = page.locator("tbody tr");

    await expect(rows).toHaveCount(5);
  });

  test("Adding a user", async ({ page }) => {
    await page.getByRole("button", { name: "Add user", exact: true }).click();
    await page.getByLabel("Gender").selectOption({ value: "Male" });
    await page.getByLabel("First name").pressSequentially("Peter");
    await page.getByLabel("Last name").pressSequentially("Naish");
    await page.getByLabel("Age").pressSequentially("37");
    await page.getByRole("button", { name: "Add", exact: true }).click();

    const newRow = page.getByRole("row", {
      name: "Male Peter Naish 37 Edit",
    });

    await expect(newRow).toBeVisible();

    const rows = page.locator("tbody tr");

    await expect(rows).toHaveCount(6);
  });

  test("Editing a user", async ({ page }) => {
    await page
      .getByRole("row", { name: "Male Eric Smith 35 Edit" })
      .getByRole("button")
      .first()
      .click();

    const firstName = await page.getByLabel("First name").inputValue();

    expect(firstName).toBe("Eric");

    await page.getByLabel("First name").clear();
    await page.getByLabel("First name").pressSequentially("Alexandra");
    await page.getByRole("button", { name: "Save", exact: true }).click();

    const oldUser = page.getByRole("row", { name: "Male Eric Smith 35 Edit" });

    await expect(oldUser).toHaveCount(0);

    const newUser = page.getByRole("row", {
      name: "Male Alexandra Smith 35 Edit",
    });

    await expect(newUser).toHaveCount(1);
  });

  test("Deleting a user", async ({ page }) => {
    await page
      .getByRole("row", { name: "Male Eric Smith 35 Edit" })
      .getByRole("button")
      .last()
      .click();

    await page.getByRole("button", { name: "Delete", exact: true }).click();

    const rows = page.locator("tbody tr");

    await expect(rows).toHaveCount(4);
  });
});
