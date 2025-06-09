import {Url} from "./urls";

interface ISubscribe {
    urlSearchParams: URLSearchParams;
    readonly emailInputElement: HTMLElement;
    readonly emailErrorParamName: string;
    scrollToForm(): void;
    displayErrors(): void;
}

export class Subscribe implements ISubscribe {

    urlSearchParams: URLSearchParams;
    readonly emailInputElement: HTMLElement;
    readonly emailErrorParamName = "subscriptionError";

    constructor() {
        this.urlSearchParams = this.getUrlSearchParams();
        this.emailInputElement = document.getElementById("subscribe");
    }

    public scrollToForm(): void {
        if (this.getEmailErrorParam()) {
            const contactUsSection = document.querySelector(".connect-section__subscribe__form");
            contactUsSection.scrollIntoView();
        }
    }

    public displayErrors(): void {
        const emailError = this.getEmailErrorParam();

        if (emailError && this.emailInputElement) {
            this.addErrorElement(emailError, this.emailInputElement);
        }

        if (emailError) {
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

    private getEmailErrorParam(): string {
        return this.urlSearchParams.get(this.emailErrorParamName);
    }

    private errorTemplate(error: string): string {
        return `<div class="alert alert-danger" role="alert">Error: ${error}. Please try again.</div>`.trim();
    }
}