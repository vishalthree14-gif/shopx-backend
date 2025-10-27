const ProductImage = require('../models/ProductImage');
const Product = require('../models/Product');


// see, get, add product, product details

exports.product = async(req, res) => {

  try{
    const { product_name, product_details, product_price, product_stock, images } = req.body;

      if (!images || !Array.isArray(images) || images.length === 0) {
        return res.status(400).json({ message: 'At least one image is required' });
      }

      const product = await Product.create({
        product_name,
        product_details,
        product_price,
        product_stock
      });

      // Prepare image object(s)
      const productImages = {
        productUrl1: images[0] || null,
        productUrl2: images[1] || null,
        productUrl3: images[2] || null,
        productId: product.id
      };

      await ProductImage.create(productImages);

      const productWithImages = await Product.findOne({
        where:{ id : product.id},
        include: ProductImage
      })

      res.status(201).json({ message: 'Product created successfully', product: productWithImages });
  } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Error creating product', error: err.message });
  }

};


// exports.getProducts = async(req, res) => {

//   // print("-------------------------------------------- get all the  getProducts");

//   try{

//     // const getData = await Product.findAll({ attributes: ['id', 'product_name', 'product_price'] });

//     const getData = await Product.findAll({
//       attributes: ['id', 'product_name', 'product_price']
//     });


//     if(!getData) res.status(500).json({message: "no products found"});

//     res.status(200).json({message: 'products data found', data: getData});
//   }catch(err){
//     console.error(err);
//     res.status(400).json({message: 'error in fetching the data'});
//   }
// };

exports.getProducts = async(req, res) => {

  try{

    let page = parseInt(req.query.page) || 10;
    let limit = parseInt(req.query.limit) || 10;

    if(page < 1) page = 1;
    if(limit < 1) limit = 10;

    const offset = (page-1)* limit;

    const total = await Product.count();

    const data = await Product.findAll({

      attributes: ['id', 'product_name', 'product_price'],
      limit: limit,
      offset: offset,

    })

    if(!data || data.length == 0){
      return res.status(404).json({message: 'no products found...'});
    }

    res.status(200).json({
        message: 'Products data found',
        data: data,
        pagination: {
        totalItems: total,
        totalPages: Math.ceil(total / limit),
        currentPage: page,
        pageSize: limit
        }
    });


  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error in fetching the data', error: err.message });
  }
}



exports.getProductId = async(req, res) => {

  const { productId  } = req.params;

 try{

  const getData = await Product.findOne({where : {'id': productId }});

  const getImage = await ProductImage.findAll({where:{"productId": productId }})

  res.status(200).json({message: getData, getImage});

 }catch(err){
  console.error(err);
  res.status(400).json({message: 'product:${id} not found'});
 }
};

