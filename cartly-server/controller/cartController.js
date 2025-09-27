import cartModel from '../model/cartModel.js';

export const List_Cart_Items = async ( req, res )=> {
    try {
        const { _id } = req.userId;
        if(!_id)
            return res.status(401).json({message:"Access denied!"});
        const cartItems = await cartModel.find({ user: { _id }});
        return res.status(200).json({message:"Cart items fetched", cartItems});
    } catch (error) {
        return res.status(500).json({message:error.message});
    }
}

export const Save_Cart_Item = async( req, res ) =>{
    try {
        const { user, item, checked } = req.body;
        if(!user._id)
            return res.status(400).json({message:"Missing data!"});
        const newItem = await cartModel.create({ user, item, checked });
        return res.status(201).json({message:"Item added to cart", data:newItem});
    } catch (error) {
        return res.status(500).json({message:error.message});
    }   
}

export const Update_Cart_Item = async( req, res ) =>{
    try {
        const { items } = req.body;
        const bulkObjects = items.map( v => ({
            updateOne:{
                filter:{ _id:v._id },
                update:{
                    $set:{
                        item:v.item,
                        checked:v.checked,
                    }
                }
            }
        }));
        await cartModel.bulkWrite(bulkObjects);
        return res.status(201).json({message:"Items saved successfully!"});
    } catch (error) {
        return res.status(500).json({message:"error.message"});
    }
}

export const Delete_Cart_Item = async ( req, res ) =>{
    try {
        const { _id } = req.query;
        if(!_id)
            return res.status(400).json({message:"Missing data"});
        await cartModel.deleteOne({ _id });
        return res.status(200).json({message:"Item removed from cart"});
    } catch (error) {
        return res.status(500).json({message:error.message});
    }
}