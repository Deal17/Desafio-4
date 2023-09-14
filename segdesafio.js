class ProductManager {
    constructor(){
        this.products = [];
    }

    getProducts = () => {
        return this.products;
    }

    addProduct = (title, description, price, thumbnail, code, stock) => {
        const product = {
            title,
            description,
            price,
            thumbnail,
            code,
            stock
        };
        if (this.products.length === 0) {
            product.id = 1;
        } else {
            product.id = this.products[this.products.length - 1].id + 1;
        }
        this.products.push(product);
    }

    getProductById = (id) => {
        const product = this.products.find(product => product.id === id);
        if (product) {
            return product;
        } else {
            throw new Error("Error: Producto no encontrado por el ID especificado.");
        }
    }

    updateProduct = (id, updatedFields) => {
        const productIndex = this.products.findIndex(product => product.id === id);
        if (productIndex !== -1) {
            const updatedProduct = Object.assign({}, this.products[productIndex], updatedFields);
            this.products[productIndex] = updatedProduct;
        } else {
            throw new Error("Error: Producto no encontrado por el ID especificado.");
        }
    }

    deleteProduct = (id) => {
        const productIndex = this.products.findIndex(product => product.id === id);
        if (productIndex !== -1) {
            this.products.splice(productIndex, 1);
        } else {
            throw new Error("Error: Producto no encontrado por el ID especificado.");
        }
    }
}

const productManager = new ProductManager();

console.log("Ejecución Inicial");
console.log(productManager.getProducts());

console.log("Adicionando primer producto...");
productManager.addProduct("Producto 1", "Descripción del producto 1", 100, "imagen1.jpg", "ABC123", 10);

console.log("Adicionando segundo producto...");
productManager.addProduct("Producto 2", "Descripción del producto 2", 150, "imagen2.jpg", "DEF456", 20);

console.log("Consulta productos\n");
console.log(productManager.getProducts());

console.log("Consulta por ID (Producto con ID 1)\n");
try {
    console.log(productManager.getProductById(1));
} catch (error) {
    console.error(error.message);
}

console.log("Intentando actualizar producto con ID 2\n");
try {
    productManager.updateProduct(2, { price: 200, stock: 15 });
    console.log("Producto actualizado con éxito.");
} catch (error) {
    console.error(error.message);
}

console.log("Consulta productos después de la actualización\n");
console.log(productManager.getProducts());

console.log("Intentando eliminar producto con ID 3\n");
try {
    productManager.deleteProduct(3);
    console.log("Producto eliminado con éxito.");
} catch (error) {
    console.error(error.message);
}

console.log("Consulta productos después de la eliminación\n");
console.log(productManager.getProducts());
