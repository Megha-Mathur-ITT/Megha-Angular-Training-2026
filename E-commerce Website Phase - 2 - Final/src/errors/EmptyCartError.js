export default class EmptyCartError extends Error 
{
    constructor(message) 
    {
        super(message);
        this.name = "EmptyCartError";
    }
}
