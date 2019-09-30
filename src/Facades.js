import BlockElement from "./BlockElement";
import BaseElement from "./BaseElement";

export function e(tag, ref, ...children)
{
    let el = new BaseElement(tag);

    if(typeof ref == "object"){
        children.unshift(ref);
    }else{
        el.var(ref);
    }

    if(!!children){
        el.setChildren(children);
    }
    return el;
}

export function block(tag, ...children)
{
    let el = new BlockElement(tag);
    if(!!children){
        el.setChildren(children);
    }
    return el;
}