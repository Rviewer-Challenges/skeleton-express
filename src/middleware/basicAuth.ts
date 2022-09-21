import { UserService } from '../services/user'
import { passwordStrength } from 'check-password-strength'


export async function basicAuth(req, res, next) {

    if (!req.headers.authorization || req.headers.authorization.indexOf('Basic ') === -1) {
        return res.status(401).json({ message: 'Missing Authorization Header' });
    }

    const base64Credentials =  req.headers.authorization.split(' ')[1];
    const credentials = Buffer.from(base64Credentials, 'base64').toString('ascii');
    const [username, password] = credentials.split(':');
    const strength = passwordStrength(password).value;

    if (strength !== "Strong") {
        return res.status(403).json({message: 'Please use a stronger password'})
    }
    const user = await UserService.authenticate({ username, password });
    if (!user) {
        return res.status(401).json({ code: 401, message: 'Invalid Authentication Credentials' });
    }

    req.currentUser = user.id;

    next();
}
