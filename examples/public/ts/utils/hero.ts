export class Hero {

    public heroButton: HTMLElement;
    public contactUsSection: HTMLElement;

    constructor() {
        this.heroButton = document.getElementById("heroBtn") as HTMLButtonElement;
        this.contactUsSection = document.querySelector(".contact-us-section");
    }

    public scrollDownToFormHandler(): void {
        if (this.heroButton) {
            this.heroButton.addEventListener("click", () => {
                const top = this.contactUsSection.getBoundingClientRect().top + window.scrollY;
                window.scrollTo({top, behavior: "smooth"});
            });

        }
    }
}