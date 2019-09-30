import BaseElement from "./BaseElement";

export default class BlockElement extends BaseElement
{
    constructor(tag)
    {
        super(tag);
        this.references = {};
    }

    ref(identifier)
    {
        if(this.children.hasOwnProperty(identifier))
        {
            return this.children[identifier];
        }
        else{
            return false
        }
    };
}