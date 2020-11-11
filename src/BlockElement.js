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
                let values = config[itemIndex];

                if(!Array.isArray(values))
                {
                    values = [values];
                }

                for( const value of values ) {

                    if(typeof value === "string"){
                        element.text(value); continue;
                    }

                    if(typeof value === "object" && typeof value.length === "undefined"){
                        element.applyEvents(value); continue;
                    }

                }
            }
        }

        return this.mainElement.el;
    }

    setReference(identifier, instance)
    {
        this.references[identifier] = instance;
    }

}