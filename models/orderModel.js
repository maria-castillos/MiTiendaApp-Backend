import pool from "../db/db.js";


// Función auxiliar para obtener los precios de un listado de productos por su id
export async function getProductPrices(productIds) {
    if (productIds.length === 0) return {};

    const placeholders = productIds.map(() => '?').join(',');
    const [rows] = await pool.query(
        `SELECT id, price FROM products WHERE id IN (${placeholders})`,
        productIds
    );

    const prices = {};
    for (const row of rows) {
        prices[row.id] = row.price;
    }
    return prices;
}

export async function createOrder(userId, items) {
    const conn = await pool.getConnection();
    try {
        await conn.beginTransaction();

        // 1. Obtener los precios reales de los productos de la BD para calcular el total
        const productIds = items.map(item => item.productId);
        const prices = await getProductPrices(productIds); 

        let total = 0;
        const itemsWithPrices = items.map(item => {
            const price = prices[item.productId];
            if (!price) {
                // Si un producto no existe, abortamos la transacción
                throw new Error(`Producto con ID ${item.productId} no encontrado.`);
            }
            const subtotal = price * item.cantidad;
            total += subtotal;

            return { 
                ...item, 
                price, // Precio real del producto
                subtotal 
            };
        });

        // 2. Insertar la orden principal
        const [orderResult] = await conn.query(
            "INSERT INTO orders (user_id, total) VALUES (?, ?)",
            [userId, total]
        );

        const orderId = orderResult.insertId;

        // 3. Insertar los ítems del pedido
        for (const item of itemsWithPrices) {
            await conn.query(
                `
                INSERT INTO order_items (order_id, product_id, quantity)
                VALUES (?, ?, ?)
                `,
                // Pasamos: ID de la orden, ID del producto, cantidad, precio
                [orderId, item.productId, item.cantidad] 
            );
        }

        await conn.commit();
        return orderId;

    } catch (error) {
        await conn.rollback();
        throw error;
    } finally {
        conn.release();
    }
}

// Obtiene todos los pedidos de un usuario
export async function getOrdersByUser(userId) {
    const [rows] = await pool.query(
        "SELECT * FROM orders WHERE user_id = ? ORDER BY created_at DESC",
        [userId]
    );

    return rows;
}


export async function getOrderDetails(orderId) {
    // 1. Obtener los datos principales del pedido (total, estado, fecha)
    const [orders] = await pool.query(
        "SELECT id AS orderId, total, createdAt FROM orders WHERE id = ?",
        [orderId]
    );

    if (orders.length === 0) {
        return null;
    }
    const orderDetails = orders[0];

    // 2. Obtener los ítems haciendo JOIN con la tabla 'products'
    const [items] = await pool.query(
        `
        SELECT 
            oi.product_id, 
            oi.quantity AS cantidad, 
            p.price AS precio,     
            p.name AS nombre       
        FROM order_items oi
        INNER JOIN products p ON oi.product_id = p.id
        WHERE oi.order_id = ?
        `,
        [orderId]
    );

    // 3. Devolver el objeto combinado
    return {
        ...orderDetails,
        items: items
    };
}