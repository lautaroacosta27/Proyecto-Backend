const fs = require("fs");
const fileProducts = "./productos.json";
const productos = [
    {title: "Producto 1",description: "Descripción del producto 1",price: 100,img: "sin img",code: "COD1",stock: 20},
    {title: "Producto 2",description: "Descripción del producto 2",price: 200,img: "sin img",code: "COD2", stock: 30},
    {title: "Producto 3",description: "Descripción del producto 3",price: 300,img: "sin img",code: "COD3",stock: 35},
    {title: "Producto 4",description: "Descripción del producto 4",price: 400,img: "sin img",code: "COD4",stock: 40},
    {title: "Producto 5",description: "Descripción del producto 5",price: 500,img: "sin img",code: "COD5",stock: 45},
    {title: "Producto 6",description: "Descripción del producto 6",price: 600,img: "sin img",code: "COD6",stock: 50},
    {title: "Producto 7",description: "Descripción del producto 7",price: 700,img: "sin img",code: "COD7",stock: 55},
    {title: "Producto 8",description: "Descripción del producto 8",price: 800,img: "sin img",code: "COD8",stock: 60},
    {title: "Producto 9",description: "Descripción del producto 9",price: 900,img: "sin img",code: "COD9",stock: 65},
    {title: "Producto 10",description: "Descripción del producto 10",price: 1000,img: "sin img",code: "COD10",stock: 70}
];

class ProductManager {

    static ultId = 0
    constructor() {
        this.products = [];
        this.path = fileProducts;
    }

    getProducts(){
        return this.products; 
    }

    addProduct(title, description, price, img, code, stock){

        if(!title || !description || !price || !img || !code || !stock) {
            console.log("Por favor, complete todos los campos.");
            return;
        }


        if(this.products.some(item => item.code === code)) {
            console.log("El codigo debe ser unico.");
            return; 
        }
        
        const newProduct = {
            id: ++ProductManager.ultId,
            title,
            description,
            price, 
            img,
            code,
            stock
        }

        this.products.push(newProduct);
        this.guardarProductos();
    }

    getProductById(id){
        const product = this.products.find(item => item.id === id);

        if(!product) {
            console.log("Producto no encontrado.");
        } else {
            console.log("Producto encontrado.", product);
        }
    }

    guardarProductos() {
        fs.writeFile(this.path, JSON.stringify(this.products, null, 2), err => {
            if (err) {
                console.error('Error, no se han guardado los productos:', err);
            }
        });
    }

    updateProduct(id, updatedFields) {
        const i = this.products.findIndex(product => product.id === id);
        if (i !== -1) {
            this.products[i] = { ...this.products[i], ...updatedFields };
            this.guardarProductos(); 
        } else {
            console.log("Producto no encontrado.");
        }
    }

    deleteProduct(id) {
        this.products = this.products.filter(product => product.id !== id);
        this.guardarProductos(); 
    }
}



const manager = new ProductManager(); 

//TESTING
//Primer llamada = arreglo vacio
console.log(manager.getProducts());

// Agrego 10 productos y los muestro
for (const producto of productos) {
    manager.addProduct(producto.title, producto.description, producto.price, producto.img, producto.code, producto.stock);
}
console.log(manager.getProducts());

//Validamos codigo repetido
manager.addProduct("Producto 1","Descripción del producto 1",520,"sin img","COD1",45);

//Validamos campos faltantes
manager.addProduct("Descripción del producto 1",520,"sin img","COD11",45);

//Buscamos productos por id
manager.getProductById(2);

//Producto no encontrado
manager.getProductById(11);

//Eliminamos un producto y comprobamos si se elimino
manager.deleteProduct(2)
console.log(manager.getProducts());

//Eliminamos un producto que no existe
manager.deleteProduct(20)

// Editamos el producto 1 y comprobamos
manager.updateProduct(1, {
    title: "Producto 11",
    description: "Descripción del producto 11",
    price: 54,
    img: "con img",
    code: "COD10",
    stock: 50
});
console.log(manager.getProducts());

//Editamos un producto que no existe
manager.updateProduct(20, {
    title: "Producto 11",
    description: "Descripción del producto 11",
    price: 54,
    img: "con img",
    code: "COD10",
    stock: 50
});