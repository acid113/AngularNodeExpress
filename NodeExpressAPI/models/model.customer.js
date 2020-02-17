class CustomerModel
{
    constructor(guid, firstName, lastName, email)
    {
        this.UID = '0';
        this.GUID = guid;
        this.FirstName = firstName;
        this.LastName = lastName;
        this.Email = email;
    }
}

module.exports = CustomerModel;