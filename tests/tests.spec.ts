import { test, expect, type Page } from '@playwright/test';
import { LoginModel } from './fixtures/login.model';
// import { deleteTaskByHelper, postTask } from './support/helpers';
import { LoginPage } from './support/pages/login';
import data from './fixtures/login.json'

let loginPage: LoginPage

const verificationAlert = 'Human verification failed. Please try again or contact your system administrator for assistance.'
const invalidAlert = "Invalid username/password. Please contact your system administrator for assistance."

test.beforeEach(({ page }) => {
  loginPage = new LoginPage(page)
})

test.describe('Test case list for User Login Feature', () => {
  test('Successful Login - Validate login with correct username and password.', async ({ request }) => {
    const loginData = data.validData as LoginModel
    await loginPage.go()
    await loginPage.fill(loginData)
    expect(loginPage.labelMultifactor.isVisible()).toBeTruthy()
    expect(loginPage.inputTimeBasedCode.isVisible()).toBeTruthy()
  });

  test('Non-Existent User Login Attempt - Ensure proper handling when a non-registered user tries to log in.', async ({ request }) => {
    const loginData = data.invalidData as LoginModel
    await loginPage.go()
    await loginPage.fill(loginData)
    expect(await loginPage.getAlertText()).toBe(verificationAlert)
  });

  test('Case Sensitivity in Username and Password - Verify that passwords are case-sensitive.', async ({ request }) => {
    const loginData = data.capitalizedData as LoginModel
    await loginPage.go()
    await loginPage.fill(loginData)
    expect(await loginPage.getAlertText()).toBe(invalidAlert)
  });

})