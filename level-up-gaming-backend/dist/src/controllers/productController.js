// level-up-gaming-backend/src/controllers/productController.ts
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: Object.getOwnPropertyDescriptor(all, name).get
    });
}
_export(exports, {
    get createProduct () {
        return createProduct;
    },
    get deleteProduct () {
        return deleteProduct;
    },
    get getProductById () {
        return getProductById;
    },
    get getProducts () {
        return getProducts;
    },
    get getTopProducts () {
        return getTopProducts;
    },
    get updateProduct () {
        return updateProduct;
    }
});
const _productData = require("../data/productData");
const _uuid = require("uuid");
// ----------------------------------------------------
// LECTURA Y UTILIDADES
// ----------------------------------------------------
const getProducts = (req, res)=>{
    const { category } = req.query; // 🚨 Capturar el query parameter
    let filteredProducts = _productData.products;
    if (category) {
        // Filtrar por la categoría enviada por el Frontend
        filteredProducts = _productData.products.filter((p)=>p.category.toLowerCase() === category.toLowerCase());
    }
    res.json(filteredProducts);
};
const getTopProducts = (req, res)=>{
    const topProducts = _productData.products.filter((p)=>p.isTopSelling).slice(0, 4);
    res.json(topProducts);
};
const getProductById = (req, res)=>{
    const product = _productData.products.find((p)=>p.id === req.params.id);
    if (product) {
        res.json(product);
    } else {
        res.status(404).json({
            message: 'Producto no encontrado'
        });
    }
};
// ----------------------------------------------------
// ADMINISTRACIÓN (CRUD MOCKING)
// ----------------------------------------------------
// @route   POST /api/products (Crear)
const createProduct = (req, res)=>{
    const { name, description, price, countInStock, isTopSelling, imageUrl, specifications, category } = req.body;
    const newProduct = {
        id: (0, _uuid.v4)(),
        name: name || 'Producto Nuevo',
        description: description || 'Descripción por defecto',
        price: price || 0,
        countInStock: countInStock || 0,
        isTopSelling: isTopSelling || false,
        rating: 0,
        numReviews: 0,
        specifications: specifications || '',
        category: category || 'Accesorios',
        imageUrl: imageUrl || 'https://via.placeholder.com/300x200/000000/FFFFFF?text=FOTO+DEL+PRODUCTO',
        reviews: [],
        isActive: false
    };
    _productData.products.push(newProduct);
    res.status(201).json(newProduct);
};
// @route   PUT /api/products/:id (Actualizar)
const updateProduct = (req, res)=>{
    const { id } = req.params;
    const updateData = req.body;
    const index = _productData.products.findIndex((p)=>p.id === id);
    if (index !== -1) {
        const currentProduct = _productData.products[index];
        _productData.products[index] = {
            ...currentProduct,
            ...updateData,
            imageUrl: updateData.imageUrl || currentProduct.imageUrl,
            countInStock: Number(updateData.countInStock) || currentProduct.countInStock,
            price: Number(updateData.price) || currentProduct.price,
            specifications: updateData.specifications || currentProduct.specifications,
            category: updateData.category || currentProduct.category
        };
        res.json(_productData.products[index]);
        return;
    }
    res.status(404).json({
        message: 'Producto no encontrado.'
    });
};
// @route   DELETE /api/products/:id (Eliminar)
const deleteProduct = (req, res)=>{
    const { id } = req.params;
    const initialLength = _productData.products.length;
    _productData.products.splice(0, _productData.products.length, ..._productData.products.filter((p)=>p.id !== id));
    if (_productData.products.length < initialLength) {
        res.status(200).json({
            message: 'Producto eliminado.'
        });
    } else {
        res.status(404).json({
            message: 'Producto no encontrado para eliminar.'
        });
    }
};
