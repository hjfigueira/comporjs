import {DOMElementOperation} from "./DataActions";

export function text(...params) {

    return new DOMElementOperation( params,(element, text) => {
        element.innerText = text;
    });

}

export function attr(...params) {

    return new DOMElementOperation( params,(element, paramName, paramValue) => {

        element.setAttribute(paramName, paramValue);

    });

}

export function bind(...params) {

    return new DOMElementOperation( params,(element, eventName, closure ) => {

        element.addEventListener(eventName, closure);

    });

}

export function repeat(collection, loopClosure, emptyClosure = null ) {

    if(collection.length < 0 && emptyClosure != null){
        return emptyClosure();
    }

    const element = closure(item, ...elements);
    const items = [];
    for(const item of collection)
    {
        items.push(element.el.cloneNode(true));
    }

    return items;
}

export function show (value, closure)
{
    if(value){
        return closure;
    }
}