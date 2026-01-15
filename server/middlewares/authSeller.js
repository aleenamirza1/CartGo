import jwt from 'jsonwebtoken';

export const authSeller = (req, res, next) => {
    const { sellerToken } = req.cookies;
    if (!sellerToken) return res.json({ success: false, message: "Unauthorized" });

    try {
        const tokenDecode = jwt.verify(sellerToken, process.env.JWT_SECRET);
        if (tokenDecode.email === process.env.SELLER_EMAIL) {
            return next()
        } else {
            return res.json({ success: false, message: 'Unauthorized' })
        }
    } catch (err) {
        return res.json({ success: false, message: err.message });
    }
};
export default authSeller;