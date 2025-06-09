import {Url} from "./urls";

interface IForm {
    urlSearchParams: URLSearchParams;
    readonly fullnameInputElement: HTMLElement;
    readonly emailInputElement: HTMLElement;
    readonly messageInputElement: HTMLElement;
    readonly fullnameErrorParamName: string;
    readonly emailErrorParamName: string;
    readonly messageErrorParamName: string;
    scrollToForm(): void;
    displayErrors(): void;
}

export class Form implements IForm {

    urlSearchParams: URLSearchParams;
    readonly emailInputElement: HTMLElement;
    readonly fullnameInputElement: HTMLElement;
    readonly messageInputElement: HTMLElement;
    readonly emailErrorParamName = "fullnameError";
    readonly fullnameErrorParamName = "emailError";
    readonly messageErrorParamName = "messageError";

    constructor() {
        this.urlSearchParams = this.getUrlSearchParams();
        this.fullnameInputElement = document.getElementById("fullname")
        this.emailInputElement = document.getElementById("email");
        this.messageInputElement = document.getElementById("message");
    }

    public scrollToForm(): void {
        if (this.getFullnameErrorParam() || this.getEmailErrorParam() || this.getMessageErrorParam()) {
            const contactUsSection = document.querySelector(".contact-us-section");
            contactUsSection.scrollIntoView();
        }
    }

    public displayErrors(): void {
        const fullnameError = this.getFullnameErrorParam();
        const emailError = this.getEmailErrorParam();
        const messageError = this.getMessageErrorParam();
        if (fullnameError && this.fullnameInputElement) {
            this.addErrorElement(fullnameError, this.fullnameInputElement);
        }
        if (emailError && this.emailInputElement) {
            this.addErrorElement(emailError, this.emailInputElement);
        }
        if (messageError && this.messageInputElement) {
            this.addErrorElement(messageError, this.messageInputElement);
        }
        if (fullnameError || emailError || messageError) {
            this.cleanParams();
        }
    }

    private cleanParams(): void {
        Url.removeParams();
    }

    private addErrorElement(errorMsg: string, formElement: HTMLElement): void {
        const newErrorElement = document.createElement("div");
        newErrorElement.innerHTML = this.errorTemplate(errorMsg);
        formElement.after(newErrorElement);
    }

    private getUrlSearchParams(): URLSearchParams {
        return new URLSearchParams(window.location.search);
    }

    private getFullnameErrorParam(): string {
        return this.urlSearchParams.get(this.fullnameErrorParamName);
    }

    private getEmailErrorParam(): string {
        return this.urlSearchParams.get(this.emailErrorParamName);
    }

    private getMessageErrorParam(): string {
        return this.urlSearchParams.get(this.messageErrorParamName);
    }

    private errorTemplate(error: string): string {
        return `<div class="alert alert-danger" role="alert">Error: ${error}</div>`.trim();
    }
}