export class User {
    constructor(firstname, lastname, email, password, role, active, avatar) {
        this.id = User.incrementId(); /* Para generar un ID único */
        this.firstname = firstname;
        this.lastname = lastname;
        this.email = email;
        this.password = password;
        this.role = role;
        this.active = active;
        this.avatar = avatar;
    };

    static incrementId() {
        if (!this.latestId) this.latestId = 1;
        else this.latestId++;
        return this.latestId;
    };
};

export const users = [];