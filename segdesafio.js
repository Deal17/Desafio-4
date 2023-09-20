const fs = require('fs');

class ProductManager {
    constructor() {
        this.fileName = 'productos.txt';
        this.Products = [];
        this.loadProducts();
    }

    loadProducts() {
        try {
            const data = fs.readFileSync(this.fileName, 'utf8');
            this.Products = JSON.parse(data);
        } catch (error) {
            this.Products = [];
        }
    }

    saveProducts() {
        const data = JSON.stringify(this.Products, null, 2);
        fs.writeFileSync(this.fileName, data, 'utf8');
    }

    getProducts = () => {
        return this.Products;
    }

    addProduct = (title, description, price, thumbnail, code, stock) => {
        const Producto = {
            title,
            description,
            price,
            thumbnail,
            code,
            stock
        };

        if (this.Products.length === 0) {
            Producto.id = 1;
        } else {
            Producto.id = this.Products[this.Products.length - 1].id + 1;
        }

        this.Products.push(Producto);
        this.saveProducts();
    }

    getProductById = (id) => {
        const product = this.Products.find((Product) => Product.id === id);

        if (product) {
            return product;
        } else {
            throw new Error("Producto no encontrado por el ID especificado");
        }
    }

    updateProduct = (id, updatedFields) => {
        const productIndex = this.Products.findIndex((Product) => Product.id === id);

        if (productIndex !== -1) {
            // Copiar el producto existente y aplicar las actualizaciones
            const updatedProduct = { ...this.Products[productIndex], ...updatedFields };
            this.Products[productIndex] = updatedProduct;
            this.saveProducts();
        } else {
            throw new Error("Producto no encontrado por el ID especificado");
        }
    }

    deleteProduct = (id) => {
        const productIndex = this.Products.findIndex((Product) => Product.id === id);

        if (productIndex !== -1) {
            this.Products.splice(productIndex, 1);
            this.saveProducts();
        } else {
            throw new Error("Producto no encontrado por el ID especificado");
        }
    }
}

const Product = new ProductManager();

console.log("Ejecución Inicial");
console.log(Product.getProducts());

console.log("Adicionando primer objeto...");
Product.addProduct("producto prueba 1", "Este es un producto prueba 1", 200, "Sin imagen", "abc123", 25);

console.log("Adicionando segundo objeto...");
Product.addProduct("producto prueba 2", "Este es un producto prueba 2", 300, "Sin imagen", "def456", 30);

console.log("Consulta objetos");
console.log(Product.getProducts());

console.log("Consulta por ID");
try {
    const product = Product.getProductById(2);
    console.log(product);
} catch (error) {
    console.error(error.message);
}

console.log("Actualizar producto");
try {
    Product.updateProduct(1, { price: 250, stock: 20 });
    console.log("Producto actualizado");
} catch (error) {
    console.error(error.message);
}

console.log("Eliminar producto");
try {
    Product.deleteProduct(2);
    console.log("Producto eliminado");
} catch (error) {
    console.error(error.message);
}

console.log("Consulta objetos después de actualizar y eliminar");
console.log(Product.getProducts());

