import "popper.js"
import "bootstrap";

import "../sass/index.scss";
import {resetServiceWorkers} from "./utils/resets";
import {Flash} from "./utils/flash-messages";
import {Hero} from "./utils/hero";
import {Form} from "./utils/form";
import {Subscribe} from "./utils/subscribe";
import {ServiceSection} from "./utils/service-section";

// Resets
resetServiceWorkers();

console.log("Loading Josef.digital styles...");

const formSuccessFlash = new Flash("submission", "success", "contactUsFlash");
formSuccessFlash.watch();

const subscribeSuccessFlash = new Flash("subscription", "success", "subscribeFlash");
subscribeSuccessFlash.watch();

const hero = new Hero();
hero.scrollDownToFormHandler()

const serviceSection = new ServiceSection();
serviceSection.scrollDownDoFormHandler();

const form = new Form();
form.displayErrors();
form.scrollToForm();

const subscribe = new Subscribe();
subscribe.displayErrors();
subscribe.scrollToForm();
