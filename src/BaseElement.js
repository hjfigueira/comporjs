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

    _mergeReferences(item)
    {
        for(let index in item.children)
        {
            this.children[index] = item.children[index];
        }
    }
}