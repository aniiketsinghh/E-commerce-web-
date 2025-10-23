import Address from '../models/addressModel.js';

export const addAddress = async (req, res) => {
    try {
        const { fullName, phoneNumber, address, city, state, postalCode, country } = req.body;
        const userId = req.user.id;

        const newAddress = new Address({
            userId,
            fullName,
            phoneNumber,
            address,
            city,
            state,
            postalCode,
            country,
        });

        const savedAddress = await newAddress.save();
        res.status(201).json({message:"address added",success:true,address: savedAddress});
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
}

export const getAddresses = async (req, res) => {
    try {
        const userId = req.user.id;
        const addresses = await Address.find({userId}).sort({ createdAt: -1 });
        res.status(200).json({message:"addresses fetched successfully",success:true,addresses});
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
}