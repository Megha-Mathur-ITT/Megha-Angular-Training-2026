export default class InvalidQuantityError extends Error
{
    constructor(message)
    {
        super(message);
        this.name = "InvalidQuantityError";
    }
}
