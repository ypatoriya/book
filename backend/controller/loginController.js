const { verifyToken } = require('../middleware/auth');
const db = require('../config/db')



// const generateToken = (userData) => {
//     return jwt.sign({ id: userData.id, email: userData.email }, 'crud', { expiresIn: '24h' });
// };


const checkLogin = async (req, res) => {
    try {
        const { email, password } = req.body;
        const [existingUser] = await db.query('SELECT * FROM user WHERE email = ?', [email]);

        if (existingUser.length > 0) {
            const user = existingUser[0];
            // Compare password
            const passwordMatch = await bcrypt.compare(password, user.password);

            if (passwordMatch) {
               // const token = generateToken(user);
                return res.status(200).send({ message: 'Login success!', token: token });
            } else {
                return res.status(401).send({ message: 'Incorrect password!' });
            }
        } else {
            return res.status(404).send({ message: 'Email not found! Sign up!' });
        }
    } catch (error) {
        console.log(error);
        res.status(500).send({
            message: 'Error in login check api!',
            error
        });
    }
};

module.exports = {checkLogin}