import bcrypt from 'bcryptjs';

export class User {
    constructor(firstname, lastname, email, password, role, active, avatar) {
        this.id = User.incrementId();
        this.firstname = firstname;
        this.lastname = lastname;
        this.email = email;
        this.password = password;
        this.role = role;
        this.active = active;
        this.avatar = avatar;
    };

    static incrementId() {
        if (!this.latestId) {
            const maxId = usersDb.reduce((max, user) => (user.id > max ? user.id : max),0);
            this.latestId = maxId + 1;
        } else {
            this.latestId++;
        }
        return this.latestId;
    };

    static createUser(firstname, lastname, email, password, role, active, avatar) {
        const salt = bcrypt.genSaltSync(10);
        const hashPassword = bcrypt.hashSync(password, salt);
        return new User(firstname, lastname, email, hashPassword, role, active = true, avatar);
    }
};

    const initialPassword = "123456";
    const salt = bcrypt.genSaltSync(10);
    const hashedInitialPassword = bcrypt.hashSync(initialPassword, salt);

export const usersDb = [
{
    id: 1,
    firstname: "Augusto",
    lastname: "Villegas",
    email: "villevip10@gmail.com",
    password: hashedInitialPassword,
    role: "user",
    active: true,
    avatar: ""
},
{
    id: 2,
    firstname: "Javier",
    lastname: "Milei",
    email: "mileij@gmail.com",
    password: hashedInitialPassword,
    role: "user",
    active: false,
    avatar: ""
}
];