const pool = require("../config/sqlConfig");
const queries = require("../utils/queries"); // Queries SQL

const getAllProducts = async () => {
    let client, result;
    try {
        client = await pool.connect(); // Espera a abrir conexion
        const data = await client.query(queries.getAllProducts);
        result = data.rows
    } catch (err) {
        console.log(err);
        throw err;
    } finally {
        client.release();
    }
    return result
}

const createProduct = async (product) => {
    let client, result;
    try {
        client = await pool.connect(); // Espera a abrir conexion
        const { product_name, href, id_brand, links } = product;
        result = await client.query(queries.createProduct, [product_name, href, id_brand, links]);
    } catch (err) {
        console.log(err);
        throw err;
    } finally {
        client.release();
    }
    return result.rows[0];
}

module.exports = {
    getAllProducts,
    createProduct
};