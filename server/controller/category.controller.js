const catetoryModel= require('../models/cotegory.models');



const productModel = require('../models/product.models.js')

exports.AddCategoryController = async (req, res) =>{
    try {

        const {name, image} = req.body;
        const userId = req.userId

        if(!name || !image){
            return res.json({
                message : "fill all details",
                success: false
            })
        }

        const addCategory = new catetoryModel({
            userId,
            name,
            image
        })

        const saveCategory = await addCategory.save()

        if(!saveCategory) {
            return res.json({
                message: 'Not Created',
                success: false
            })
        }

        return res.status(201).json({
            message: 'Add Category',
            success: true
        })
        
    } catch (error) {

        return res.status(501).json({
            message: error.message || error,
            success: false
        })
        
    }
}


exports.getAdminsCategoryController= async (req, res) =>{

    try {

        const userId = req.userId

        const AdminsCategory = await catetoryModel.find({userId: userId}).sort({createdAt: -1})

        return res.status(201).json({
            message : "successfully get admin Category",
            data: AdminsCategory,
            success: true
        })
        
    } catch (error) {

        return res.status(501).json({
            message : error.message || error,
            success: false
        })
        
    }
}

exports.deleteCategoryController = async (req , res)=>{
    try {

        const { _id } = req.params

        const checkProduct = await productModel.find({
            category : {
                "$in" :[ _id ]
            }
        }).countDocuments()

        
        

       
        
        if(checkProduct > 0 ){
            return res.json({
                message: "Category is already use can't delete",
                success : false
            })
        }

        const deleteCategory = await catetoryModel.deleteOne({_id:_id})

        return res.status(201).json({
            message: "Delete Category Successfully",
            data: deleteCategory,
            success: true
        })
        
    } catch (error) {

        return res.status(501).json({
            message : error.message || error,
            success: false
        })
        
    }
}

exports.getAllCategory = async(req, res)=>{
    try {

        const data = await catetoryModel.find().sort({createdAt: -1})

        return res.status(201).json({
            success:true,
            message: 'successfully fatch All Categorys',
            data: data
        })
        
    } catch (error) {

        return res.status(501).json({
            message: error.message || error,
            success: false
        })
        
    }
}

