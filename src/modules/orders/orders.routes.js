import express from "express";
import pool from "../../config/db.js";
import auth from "../../middleware/auth.js";

const router = express.Router();


// CREATE ORDER
router.post("/", auth, async (req, res) => {
  const client = await pool.connect();

  try {
    const { items } = req.body;

    await client.query("BEGIN");

    let total = 0;

    for (let item of items) {

      const product = await client.query(
        "SELECT * FROM products WHERE id=$1",
        [item.product_id]
      );

      if (!product.rows.length) {
        throw new Error("Product not found");
      }

      if (
        product.rows[0].stock_quantity <
        item.quantity
      ) {
        throw new Error("Not enough stock");
      }

      total +=
        product.rows[0].price * item.quantity;
    }


    const order = await client.query(
      `INSERT INTO orders (total_amount)
       VALUES ($1)
       RETURNING *`,
      [total]
    );

    const orderId = order.rows[0].id;


    for (let item of items) {

      const product = await client.query(
        "SELECT * FROM products WHERE id=$1",
        [item.product_id]
      );

      await client.query(
        `INSERT INTO order_items
         (order_id, product_id, quantity, price)
         VALUES ($1,$2,$3,$4)`,
        [
          orderId,
          item.product_id,
          item.quantity,
          product.rows[0].price,
        ]
      );

      await client.query(
        `UPDATE products
         SET stock_quantity =
         stock_quantity - $1
         WHERE id=$2`,
        [item.quantity, item.product_id]
      );
    }

    await client.query("COMMIT");

    return res.status(201).json({
      success: true,
      message: "Order created",
      data: order.rows[0],
    });

  } catch (err) {

    await client.query("ROLLBACK");

    return res.status(400).json({
      success: false,
      message: err.message,
    });

  } finally {
    client.release();
  }
});


// GET ALL
router.get("/", async (req, res) => {

  const result = await pool.query(
    "SELECT * FROM orders"
  );

  return res.json({
    success: true,
    data: result.rows,
  });
});


// GET ONE
router.get("/:id", async (req, res) => {

  const { id } = req.params;

  const order = await pool.query(
    "SELECT * FROM orders WHERE id=$1",
    [id]
  );

  const items = await pool.query(
    "SELECT * FROM order_items WHERE order_id=$1",
    [id]
  );

  return res.json({
    success: true,
    data: {
      order: order.rows[0],
      items: items.rows,
    },
  });
});


export default router;