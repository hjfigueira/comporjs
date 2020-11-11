
class DOMOperation {

    constructor(params, modifier)
    {
        this.modifier = modifier
        this.params = params;
    }

    execute(element)
    {
        this.modifier.call(null, element, this.params);
    }

}



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