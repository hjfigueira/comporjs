import {DOMOperation} from "./DataActions";

export default class BaseElement
{

    constructor(tagName, children)
    {
        this.el = null;
        this.children = {};

        this.parse(tagName);

        const ref = children[0];

        if(Array.isArray(ref) && ref[0] instanceof DOMOperation){
            this.set(ref);
        }else if(typeof ref === 'string'){
            this.block.setReference(ref, this);
        }

        if(!!children){
            this.setChildren(children);
        }
    }

    parse(tagName)
    {
        let tag = null;
        let id = null;
        let classes = null;

        if(!tagName)
        {
            throw { error : 'A tag must be specified' };
        }

        let result = /(.*?)?(#.*?)?(\..*)|(.*?)?(#.*)|.*/.exec(tagName);

        if(!!result[1]){
            tag = result[1];
            id = result[2];
            classes = result[3];
        }else if(!!result[5]){
            tag = result[4];
            id = result[5];
        }else{
            tag = result[0];
        }

        this.el = document.createElement(tag);

        if(!!id){
            this.el.id = id.substr(1);
        }

        if(!!classes)
        {
            classes = classes.split('.');
            classes.shift();
            this.el.classList.add(...classes);
        }
    };

    append(element)
    {
        if(element instanceof BaseElement)
        {
            this.setChildren([element]);
        }

    }

    set(...operations)
    {
        for( const operation of operations ) {

            operation.execute(this.mainElement);

        }
    }

    setChildren(childrenArray)
    {
        for(let index in childrenArray)
        {
            let item = childrenArray[index];
            this.el.append(item.el);
            this._mergeReferences(item);
        }
    }

    _mergeReferences(item)
    {
        for(let index in item.children)
        {
            this.children[index] = item.children[index];
        }
    }
}