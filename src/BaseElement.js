export default class BaseElement
{

    constructor(tagName)
    {
        this.tag = tagName;
        this.el = null;
        this.config = {};
        this.children = {};

        this.parse(tagName);
    }

    parse(tagName)
    {
        let tag = null;
        let id = null;
        let classes = null;
        let classList = [];

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

    text(string)
    {
        this.el.innerText = string;
        return this;
    };

    attr(attribute, value)
    {
        if(!value){
            this.el.removeAttribute(attribute);
        }else{
            this.el.setAttribute(attribute, value);
        }
        return this;
    }

    append(element)
    {
        if(element instanceof BaseElement)
        {
            this.setChildren([element]);
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

    on(event, fn)
    {
        this.el.addEventListener(event, fn);
    }

    applyEvents(events)
    {
        for(const eventName of Object.keys(events))
        {
            const eventHandler = events[eventName];
            this.on(eventName, eventHandler);
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