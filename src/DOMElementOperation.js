
export class DOMElementOperation {

    constructor(params, modifier)
    {
        this.modifier = modifier
        this.params = params;
    }

    execute(element)
    {
        this.modifier.call(null, element, ...this.params);
    }

}