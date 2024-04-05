const { verifyToken } = require('../middleware/auth');
const db = require('../config/db');
const jwt = require('jsonwebtoken');

const bcrypt = require('bcrypt');


const generateToken = (user) => {
    const payload = { email: user.email, password: user.password };
    return jwt.sign(payload, 'crud', { expiresIn: '24h' });
};

const checkLogin = async (req, res) => {
    try {
        const { email, password } = req.body;
        const [existingUser] = await db.query('SELECT * FROM user WHERE email = ?', [email]);

        if (existingUser.length > 0) {
            const user = existingUser[0];

            // Compare password
            const passwordMatch = await bcrypt.compare(password, user.password);

            if (passwordMatch) {
                const token = generateToken(user);
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
    }};

const addUser = async(req, res) => {
    try{
        const { email, password ,mobile ,image} = req.body;
        if (!email || !password ) {
            return res.status(500).send({
                message: 'add all fields'
            })
        }

        const [existingEmail] = await db.query('SELECT * FROM user WHERE email = ?', [email]);

        if (existingEmail.length > 0) {
            return res.status(409).send({ message: 'Email already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 10)

        const data = await db.query("INSERT INTO user (email, password,mobile,image) VALUES (?, ?,?,?)", [email, hashedPassword,mobile,image]);

        if (!data) {
            return res.status(404).send({
                message: 'error in INSERT query'
            })
        }

        res.status(201).send({
            message: 'record created!'
        })
        
    }catch(error){
        console.log(error)
        res.send({
            message: 'error in addUser api!'
        })
    }
}

const getImage = async (req, res) => {
    try {
        console.log(req.files)
        let id = req.params.id  
        let image = req.files.image //key and auth


        // if(image.length>1){
        //     throw new error('multiple file not allowed!')
        // }

       
        const dirExists = fs.existsSync(`public/assets/`);
        
        if (!dirExists) {
            fs.mkdirSync(`public/assets/`, { recursive: true });
        }

        if (image == undefined || image == null) throw new Error("file not found!");

       // let savePath = `/public/assets/${Date.now()}.${image.name.split(".").pop()}`
       
       let savePath = `/public/assets/${Date.now()}.${image.name.split(".").pop()}`
        image.mv(path.join(__dirname, ".." + savePath), async (err) => {
            if (err) throw new Error("error in uploading")

            else {
                const updateQuery = 'UPDATE book SET image = ? WHERE book_id = ?'
                await db.query(updateQuery, [savePath, id]);
                res.status(201).send({
                    message: 'file uploaded!'
                })
            }
        });
        
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'error in file upload api!' });
    }
}

module.exports = { checkLogin, addUser };