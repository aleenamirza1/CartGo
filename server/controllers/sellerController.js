import jwt from 'jsonwebtoken';



export const Sellerlogin = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (email === process.env.SELLER_EMAIL && password === process.env.SELLER_PASSWORD) {

            const token = jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: '7d' });

            res.cookie('sellerToken', token, {
                httpOnly: true,
                secure: true,
                sameSite: 'none' ,
                maxAge: 7 * 24 * 60 * 60 * 1000,
                path: '/'
            })

            return res.json({ success: true, message: "Logged In" })
        }

        return res.json({ success: false, message: "Invalid email or password" });
    } catch (error) {
        console.log(error.message);
        return res.json({ success: false, message: error.message })
    }
}


export const isSellerAuth = async (req, res) => {
    try {
        return res.json({ success: true })
    } catch (error) {
        console.log(error.message)
        return res.json({ success: false, message: error.message });
    }
};




export const sellerLogout = (req, res) => {
    try {
        res.clearCookie("sellerToken", {
            httpOnly: true,
            secure:true,
            sameSite: 'none' ,
        });
        res.json({ success: true, message: "Logged out successfully" });
    } catch (error) {
        console.log(error.message)
        return res.json({ success: false, message: error.message });
    }
};


