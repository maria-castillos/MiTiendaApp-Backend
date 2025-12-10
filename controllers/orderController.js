import { createOrder, getOrdersByUser, getOrderDetails, getProductPrices } from "../models/orderModel.js";

export async function createOrderController(req, res) {

    try {
        const userId = req.user.id;
        const { items } = req.body; 
        if (!items || items.length === 0) {
            return res.status(400).json({ message: "El carrito está vacío" });
        }
        // Obtener precios actuales de los productos
        const productIds = items.map(it => it.productId);
        const prices = await getProductPrices(productIds);

        // Calcular subtotales y validar productos
        const itemsWithSubtotal = [];
        for (const item of items) {
            const price = prices[item.productId];
        
            if (price === undefined) {
                return res.status(400).json({ message: `Producto con ID ${item.productId} no encontrado` });
            }
        
            const subtotal = price * item.cantidad;
            itemsWithSubtotal.push({
                productId: item.productId,
                cantidad: item.cantidad,
                subtotal
            });
        }

        // Crear el pedido
        const orderId = await createOrder(userId, itemsWithSubtotal);
        res.json({
            message: "Pedido creado correctamente",
            orderId
        });

    } catch (error) {
        console.error("Error creando pedido:", error);
        res.status(500).json({ message: "Error interno del servidor" , error: error.message});
    }
}

export async function getMyOrdersController(req, res) {
    try {
        const orders = await getOrdersByUser(req.user.id);
        res.json(orders);

    } catch (error) {
        res.status(500).json({ message: "Error interno del servidor" });
    }
}

export async function getOrderDetailsController(req, res) {
    try {
        const orderId = req.params.id;

        const details = await getOrderDetails(orderId);
        console.log("Order Details:", details);
        res.json(details);

    } catch (error) {
        console.error("Error obteniendo detalles del pedido:", error);
        res.status(500).json({ message: "Error interno del servidor" });
    }
}
