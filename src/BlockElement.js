import {e} from "./main"

export default class BlockElement
{
    constructor(buildFunction)
    {
        this.build          = buildFunction;
        this.references     = {};

        const customBuilder = e.bind({ block : this });
        this.mainElement    = this.build(customBuilder);
    }

    ref(identifier)
    {
        if(this.references.hasOwnProperty(identifier))
        {
            return this.references[identifier];
        }
        else{
            return false
        }
    };

    clone()
    {
        return new BlockElement(this.build);
    }

    parse(config)
    {
        if(typeof config != "undefined"){

            for(const itemIndex of Object.keys(config))
            {
                const element = this.ref(itemIndex);
                let operations = config[itemIndex];

                element.set(operations);
            }
        }

        return this.mainElement.el;
    }

    setReference(identifier, instance)
    {
        this.references[identifier] = instance;
    }

}