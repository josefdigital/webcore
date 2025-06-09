import {Url} from "./urls";

interface IFlash {
    readonly paramName: string;
    readonly expectedParamValue: string;
    readonly selector: string;
}

export class Flash implements IFlash {

    readonly paramName: string;
    readonly expectedParamValue: string;
    readonly selector: string;

    constructor(paramName: string, expectedParamValue: string, selector: string) {
        this.paramName = paramName;
        this.expectedParamValue = expectedParamValue;
        this.selector = selector;
    }

    public watch() {
        const urlParams = new URLSearchParams(window.location.search);
        const param = urlParams.get(this.paramName);
        console.log({
            param,
            "expected": this.expectedParamValue,
        });
        if (param === this.expectedParamValue) {
            Url.removeParams();
            const element: HTMLElement = document.querySelector(`.${this.selector}`);
            if (element) {
                setTimeout(() => {
                    element.classList.add("flash--show");
                }, 500);
              setTimeout(() => {
                    element.classList.add("flash--hide");
                }, 5000);
            }
        }
    }

}