import BlockElement from "./BlockElement";
import BaseElement from "./BaseElement";

export function e(tag, ...children)
{
    return new BaseElement(tag, children);
}

export function block(fn)
{
    return new BlockElement(fn);
}