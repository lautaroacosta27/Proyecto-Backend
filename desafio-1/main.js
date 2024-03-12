class ProductManager {
    static id = 0;

    constructor(){
        this.products = [];
    }

    addProduct(title, description, price, thumbnail, code, stock) {
        ProductManager.id++;
        const codeValidation = productCode => productCode.code === code;
        if (this.products.some(codeValidation)) {
            return console.log('El codigo debe ser unico. ');
        } else if (!title || title.trim() === '' || !description || description.trim() === '' || price === null || price === undefined || price === '' || !code || code.trim() === '' || stock === null || stock === undefined || stock === '') {
            return console.log('Por favor, complete todos los campos.');
        } else {
            this.products.push({id: ProductManager.id, title, description, price, thumbnail, code, stock});
            return ProductManager.id;
        }
    }
    getProduct(){
        console.log(this.products);
        return this.products;
    }
    getProductById(id){
        if (this.products.find(findId => findId === this.products[id - 1])){
            console.log(this.products[id - 1])
            return this.products[id - 1];
        } else {
            console.log("Not found");
            return 'Not found';
        }
    }
}

const producto = new ProductManager();


producto.addProduct("Computadora",'Marca Gateway',350, "url", "G123", 50);
producto.addProduct("Remera",'Color negra',250, "url", "G124", 50);
producto.addProduct("Mesa",'De madera',7500, "url", "G125", 75);

producto.getProduct();
producto.getProductById(3);
