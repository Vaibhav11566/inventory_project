import express from "express";
import pool from "../../config/db.js";
import auth from "../../middleware/auth.js";

const router = express.Router();


// CREATE
router.post("/", auth, async (req, res) => {
  try {
    const { name, sku, price, stock_quantity } = req.body;

    if (stock_quantity < 0) {
      return res.status(400).json({
        success: false,
        message: "Stock cannot be negative",
      });
    }

    const result = await pool.query(
      `INSERT INTO products (name, sku, price, stock_quantity)
       VALUES ($1,$2,$3,$4)
       RETURNING *`,
      [name, sku, price, stock_quantity]
    );

    return res.status(201).json({
      success: true,
      message: "Product created",
      data: result.rows[0],
    });

  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
});


// GET ALL
router.get("/", async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT * FROM products"
    );

    return res.status(200).json({
      success: true,
      data: result.rows,
    });

  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
});


// GET ONE
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const result = await pool.query(
      "SELECT * FROM products WHERE id=$1",
      [id]
    );

    return res.status(200).json({
      success: true,
      data: result.rows[0],
    });

  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
});


// UPDATE
router.put("/:id", auth, async (req, res) => {
  try {
    const { id } = req.params;
    const { name, price, stock_quantity } = req.body;

    if (stock_quantity < 0) {
      return res.status(400).json({
        success: false,
        message: "Stock cannot be negative",
      });
    }

    const result = await pool.query(
      `UPDATE products
       SET name=$1, price=$2, stock_quantity=$3
       WHERE id=$4
       RETURNING *`,
      [name, price, stock_quantity, id]
    );

    return res.status(200).json({
      success: true,
      message: "Product updated",
      data: result.rows[0],
    });

  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
});


// DELETE
router.delete("/:id", auth, async (req, res) => {
  try {
    const { id } = req.params;

    await pool.query(
      "DELETE FROM products WHERE id=$1",
      [id]
    );

    return res.status(200).json({
      success: true,
      message: "Product deleted",
    });

  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
});


export default router;