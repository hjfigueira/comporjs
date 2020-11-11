import BlockElement from "./BlockElement";
import BaseElement from "./BaseElement";

export function e(tag, ref, ...children)
{
    const el = new BaseElement(tag);

    if(typeof ref == "object"){
        children.unshift(ref);
    }else{
        this.block.setReference(ref, el);
    }

    if(!!children){
        el.setChildren(children);
    }
    return el;
}

export function block(fn)
{
    return new BlockElement(fn);
}