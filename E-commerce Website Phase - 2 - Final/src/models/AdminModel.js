import UserModel from "/src/models/UserModel.js";

export default class AdminModel extends UserModel
{
    constructor(name, email, role)
    {
        super(name, email, role);
    }
}
