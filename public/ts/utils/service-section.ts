export class ServiceSection {

    public serviceButtons: NodeListOf<Element>
    public contactUsSection: HTMLElement;

    constructor() {
        this.serviceButtons = document.querySelectorAll(".service-button");
        this.contactUsSection = document.querySelector(".contact-us-section");

    }

    public scrollDownDoFormHandler(): void {
        if (this.serviceButtons && this.contactUsSection) {
            this.serviceButtons.forEach(button => {
                button.addEventListener("click", (e) => {
                  e.preventDefault();
                    const top = this.contactUsSection.getBoundingClientRect().top + window.scrollY;
                    window.scrollTo({ top, behavior: "smooth" });
                });
            })
        }
    }
}