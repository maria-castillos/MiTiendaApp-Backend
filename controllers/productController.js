import ProductModel from "../models/productModel.js";

export const createProduct = async (req, res) => {
  try {
    const { name, price, stock, imagen } = req.body;

    if (!name || !price) {
      return res.status(400).json({ message: "Nombre y precio son obligatorios" });
    }

    const newProduct = await ProductModel.createProduct(name, price, stock || 0, imagen || null);

    res.status(201).json({
      message: "Producto creado correctamente",
      product: newProduct
    });

  } catch (error) {
    console.error("Error en createProduct:", error);
    res.status(500).json({ message: "Error al crear producto" });
  }
};

export const getProducts = async (req, res) => {
  try {
    const products = await ProductModel.findAll();
    res.json(products);
  } catch (error) {
    console.error("Error en getProducts:", error);
    res.status(500).json({ message: "Error al obtener productos" });
  }
};

export const getProductById = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await ProductModel.findById(id);

    if (!product) {
      return res.status(404).json({ message: "Producto no encontrado" });
    }

    res.json(product);

  } catch (error) {
    console.error("Error en getProductById:", error);
    res.status(500).json({ message: "Error al obtener producto" });
  }
};

export const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
  
    const { name, price, stock, imagen } = req.body;
    
    const updated = await ProductModel.updateProduct(id, name, price, stock, imagen); 

    if (!updated) {
      return res.status(404).json({ message: "Producto no encontrado" });
    }

    res.json({
      message: "Producto actualizado correctamente",
      product: updated 
    });

  } catch (error) {
    console.error("Error en updateProduct:", error);
    res.status(500).json({ message: "Error al actualizar producto" });
  }
};

export const updateStock = async (req, res) => {
  try {
    const { id } = req.params;
    const { stock } = req.body;

    if (stock == null) {
      return res.status(400).json({ message: "Stock es obligatorio" });
    }

    await ProductModel.updateStock(id, stock);
    const updated = await ProductModel.findById(id);

    res.json({
      message: "Stock actualizado correctamente",
      product: updated
    });

  } catch (error) {
    console.error("Error en updateStock:", error);
    res.status(500).json({ message: "Error al actualizar stock" });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await ProductModel.deleteById(id);

    if (!deleted) {
      return res.status(404).json({ message: "Producto no encontrado" });
    }

    res.json({ message: "Producto eliminado correctamente" });

  } catch (error) {
    console.error("Error en deleteProduct:", error);
    res.status(500).json({ message: "Error al eliminar producto" });
  }
};

