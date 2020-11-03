import bcrypt from 'bcryptjs';

const users = [
    {
        name: "Admin User",
        email: 'admin@gmail.com',
        password: bcrypt.hashSync('123456', 10),
        isAdmin: true
    },
    {
        name: "Sumit Dey",
        email: 'sumit@gmail.com',
        password: bcrypt.hashSync('123456', 10),
    },
    {
        name: "Sumana",
        email: 'sumana@gmail.com',
        password: bcrypt.hashSync('123456', 10),
    },
]

export default users