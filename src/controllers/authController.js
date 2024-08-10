import supabase from '../config/supabase.js';

class AuthController {
    async register(req, res) {
        const { email, password } = req.body;
        try {
            const { data, error } = await supabase.auth.signUp({ email, password });
            if (error) {
                return res.status(400).json({ error: error.message });
            }
            res.status(201).json({ user: data.user });
        } catch (error) {
            console.error('Error registering user:', error);
            res.status(500).json({ error: 'Error registering user' });
        }
    }

    async login(req, res) {
        const { email, password } = req.body;
        try {
            const { data, error } = await supabase.auth.signInWithPassword({ email, password });
            if (error) {
                return res.status(400).json({ error: error.message });
            }
            res.status(200).json({ session: data.session });
        } catch (error) {
            console.error('Error logging in user:', error);
            res.status(500).json({ error: 'Error logging in user' });
        }
    }

    async logout(req, res) {
        const token = req.headers.authorization?.split(' ')[1];
        if (!token) {
            return res.status(401).json({ error: 'No token provided' });
        }

        try {
            const { error } = await supabase.auth.signOut();
            if (error) {
                return res.status(400).json({ error: error.message });
            }
            res.status(200).json({ message: 'Logged out successfully' });
        } catch (error) {
            console.error('Error logging out user:', error);
            res.status(500).json({ error: 'Error logging out user' });
        }
    }

    async verifyToken(req, res, next) {
        const token = req.headers.authorization?.split(' ')[1];
        if (!token) {
            return res.status(401).json({ error: 'No token provided' });
        }

        try {
            const { data, error } = await supabase.auth.getUser(token);
            if (error || !data.user) {
                return res.status(401).json({ error: 'Invalid token' });
            }
            req.user = data.user; // Attach user to request
            next();
        } catch (error) {
            console.error('Error verifying token:', error);
            res.status(401).json({ error: 'Error verifying token' });
        }
    }
}

export default new AuthController();
