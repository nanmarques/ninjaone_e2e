
import { Locator, Page, expect } from "@playwright/test"
import { LoginModel } from "../../fixtures/login.model";

export class LoginPage {
    readonly page: Page
    readonly inputEmail: Locator
    readonly inputPassword: Locator
    readonly btnSignIn: Locator
    readonly alertText: Locator
    readonly labelMultifactor: Locator
    readonly inputTimeBasedCode: Locator
    readonly btnSubmit: Locator

    constructor(page: Page) {
        this.page = page
        this.inputEmail = page.locator("[name='email']")
        this.inputPassword = page.locator("[name='password']")
        this.btnSignIn = page.getByText('Sign In')
        this.alertText = page.locator('.alert-danger')
        this.labelMultifactor = page.getByText('Multi-Factor Authentication')
        this.inputTimeBasedCode = page.locator("[name='mfaCode']")
        this.btnSubmit = page.getByText('Submit')
    }

    async go() {
        await this.page.goto('/auth/#/login');
    }

    async fill(login: LoginModel) {
        await this.inputEmail.fill(login.email)
        await this.inputPassword.fill(login.password)
        await this.btnSignIn.click()
    }

    async fillTimeBasedCode(timeBasedCode: string) {
        await this.inputTimeBasedCode.fill(timeBasedCode)
        await this.btnSubmit.click()
    }

    async getAlertText(){
        return await this.alertText.textContent()
    }

    async toggle(taskName: string) {
        const target = this.page.locator(`xpath=//p[text()="${taskName}"]/..//button[contains(@class, "Toggle")]`)
        await target.click()
    }

    async remove(taskName: string) {
        const target = this.page.locator(`xpath=//p[text()="${taskName}"]/..//button[contains(@class, "Delete")]`)
        await target.click()
    }

    async shouldHaveText(taskName: string) {
        const target = this.page.locator(`css=.task-item p >> text=${taskName}`)
        await expect(target).toBeVisible()
    }

    async shouldNotExist(taskName: string) {
        const target = this.page.locator(`css=.task-item p >> text=${taskName}`)
        await expect(target).not.toBeVisible()
    }

    async alertHaveText(text: string) {
        const target = this.page.locator('.swal2-html-container')
        await expect(target).toHaveText(text)
    }

    async shouldBeDone(taskName: string) {
        const target = this.page.getByText(taskName)
        await expect(target).toHaveCSS('text-decoration-line', 'line-through')
    }


}