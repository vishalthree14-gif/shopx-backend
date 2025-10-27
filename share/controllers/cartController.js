const Cart = require('../models/Cart');

exports.addToCart = async (req, res) => {

    try{
        const user_id = req.user.id;

        const { product_id, quantity } = req.body;

        const existingItem = await Cart.findOne({where:{ user_id, product_id }});

        if(existingItem){

                existingItem.quantity += quantity || 1;
                await existingItem.save();

                res.status(201).json({message: 'product added to the cart'});
        }
        else{

            const query = {
                user_id, 
                product_id,
                quantity: quantity || 1,
            };

            await Cart.create(query);

            res.status(200).json({message:"item added to cart"});
        }
    }
    catch(err){

        console.error(err.message);
        res.status(500).json({message: 'some errors occured.'});
    }

}

exports.getCartItems = async (req, res) => {

    try{
        const user_id = req.user.id;

        const items = await Cart.findAll({where: {'user_id': user_id}, include: ['Product'] });

        res.status(200).json({data: items});

    }catch(err){
        res.status(500).json({error: err.message});
    }

}

exports.removeCartItems = async (req, res) => {

    try{
        const {itemId} = req.params;
        await Cart.destroy({where:{'product_id': itemId}});
        res.status(200).json({message:'item removed from product... '});
  } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error removing item', error: err.message });
  }

};

