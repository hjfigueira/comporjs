import {DOMOperation} from "./DataActions";

export function text(...params) {

    return new DOMOperation( params,(element, text) => {
        element.innerText = text;
    });

}

export function attr(...params) {

    return new DOMOperation( params,(element, paramName, paramValue) => {

        element.setAttribute(paramName, paramValue);

    });

}

export function bind(...params) {

    return new DOMOperation( params,(element, eventName, closure ) => {

        element.addEventListener(eventName, closure);

    });

}