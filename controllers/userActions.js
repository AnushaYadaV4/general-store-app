const GeneralStore = require("../models/GeneralStore");

exports.getStoreItems= async (req, res, next) => {
    try {

        return res.json(await GeneralStore.findAll());
    }
    catch (err) {
        console.log("getting Store Items failed", JSON.stringify(err))
        res.status(500).json({ err: err })
    }
}


exports.postAddStoreItems = async (request, response, next) => {
    try {
        if (!request.body.itemName || !request.body.description || !request.body.price || !request.body.quantity) {
            throw new Error("Phone number is required");
        }
        const itemName = request.body.itemName;
        const description = request.body.description;
        const price = request.body.price;
        const quantity=request.body.quantity;
        const data = await GeneralStore.create({
            itemName:itemName,
            description:description,
            price:price,
            quantity:quantity
           
        });
        console.log(data)

        response.status(201).json({ newUserDetails: data })
    } catch (err) {
        console.log(err)
        response.status(500).json({ error: err })
    }

}
