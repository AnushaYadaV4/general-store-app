const GeneralStore = require("../models/GeneralStore");

exports.postUpdateStoreQuantity=(req,res,next)=>{
    const storeId=req.params.id;
    console.log("STOREID",storeId);
    console.log("QUANTITY",req.body.quantity)
    const updatedQuantity=req.body.quantity;
    GeneralStore.findByPk(storeId).then(storeQuantity=>{
        storeQuantity.quantity=updatedQuantity;
        return storeQuantity.save();
    }).then(result=>{
        res.status(201).json(result)
    }).catch(err=>console.log(err))
}

exports.postEditStoreItems = (req, res, next) => {
    const stroreItemId = req.params.id;
    console.log("storeItemId",stroreItemId)
    const updatedItemName = req.body.itemName;
    console.log("UPDATED NAME",updatedItemName)

    const updatedDesc = req.body.description;
    console.log("UPDATED DES",updatedDesc)


    const updatedPrice = req.body.price;
    console.log("UPDATED PRICE",updatedPrice)

    const updatedQuantity = req.body.quantity;
    console.log("UPDATED QAN",updatedQuantity)

    GeneralStore.findByPk(stroreItemId)
      .then(storeItems => {
        console.log("STOREITEM",storeItems.itemName)

        storeItems.itemName = updatedItemName;
        storeItems.description = updatedDesc;
        storeItems.price = updatedPrice;

        storeItems.quantity = updatedQuantity;
        return storeItems.save();
      })
      .then(result => {
        console.log('UPDATED STOREITEMS!');
        return res.sendStatus(200)
      })
      .catch(err => console.log(err));
  };


exports.deleteUser = async (req, res, next) => {
    try {

        if (!req.params.id) {
            console.log("ID Mising")
            res.sendStatus(404).json({ err: 'ID MISSING' });
        }
        const uId = req.params.id;
        await GeneralStore.destroy({ where: { id: uId } })
        return res.sendStatus(200)

    } catch (err) {
        console.log(err)
        res.sendStatus(500).json(err)
    }
};

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
