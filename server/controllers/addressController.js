import Address from '../models/Address.js'

export const addAddress = async (req, res) => {
    try {
        const { address } = req.body;

        if (!address) {
            return res.json({ success: false, message: "Address data is required" });
        }

        await Address.create({ ...address, userId: req.userId });
        return res.json({ success: true, message: "Address added successfully" });
    } catch (error) {
        console.log(error.message)
        return res.json({ success: false, message: error.message })
    }
}

export const getAddress = async (req, res) => {
    try {
        const addresses = await Address.find({ userId: req.userId });
        return res.json({ success: true, addresses })
    } catch (error) {
        console.log(error.message)
        return res.json({ success: false, message: error.message })
    }
}