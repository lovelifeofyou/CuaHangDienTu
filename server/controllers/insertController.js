const Product = require('../models/product');
const asyncHandler = require('express-async-handler');
const data = require('../../Data/data2.json');
const slugify = require('slugify');
const categoryData = require('../../Data/cate_brand.json');
const ProductCategory = require('../models/productCategory');

const fn = async(product)=>{
    await Product.create({
        title : product?.name,
        slug : slugify(product?.name) + Math.round(Math.random()*100) + '',
        description : product?.description,
        brand : product?.brand,
        thumb : product?.thumb,
        price : Math.round(Number(product?.price?.match(/\d/g).join(''))/100),
        category : product?.category[1],
        quantity : Math.round(Math.random()*1000),
        sold :  Math.round(Math.random()*100),
        images : product?.images,
        color : product?.variants?.find(el => el.label === 'Color')?.variants[0],
        totalRatings : Math.round(Math.random()*5) + 1,
    })
}

const InsertProduct = asyncHandler(async(req,res)=>{
    const promises = [];
    for(let product of data) promises.push(fn(product));
    await Promise.all(promises)
    return res.status(200).json('ok em')
})


const fn2 = async(cate)=>{
    await ProductCategory.create({
        title : cate?.cate,
        brand : cate?.brand,
        image : cate?.image
    })
}

const insertCategory = asyncHandler(async(req,res)=>{
    const promises = [];
    for(let cate of categoryData) promises.push(fn2(cate));
    await Promise.all(promises)
    return res.json('ok em')
})

module.exports = {
    InsertProduct,
    insertCategory
}