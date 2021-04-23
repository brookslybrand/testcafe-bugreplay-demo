import { Selector } from "testcafe";
import bugReplay from "testcafe-bugreplay";

bugReplay(fixture`TestCafe — BugReplay demo`.page`http://localhost:3000`, {
  apiKey: process.env.BUG_REPLAY_API_KEY,
});

test("Successfully authenticate user", async (t) => {
  const email = "user@example.com";
  const password = "password12345";

  const emailInput = await getInputByLabel(/email/i);
  await t.expect(emailInput.exists).ok().typeText(emailInput, email);

  const passwordInput = await getInputByLabel(/password/i);
  await t.expect(passwordInput.exists).ok().typeText(passwordInput, password);

  const submitButton = Selector("button")
    .withText(/log in/i)
    .withAttribute("type", "submit");

  await t.expect(submitButton.exists).ok().click(submitButton);

  // await t.wait(2100);

  const message = Selector("*").withText(/you are logged in/i);

  await t.expect(message.exists).ok();
});

async function getInputByLabel(labelText) {
  const label = Selector("label").withText(labelText);
  const inputId = await label.getAttribute("for");
  return Selector(`#${inputId}`);
}
