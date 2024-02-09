class ProductManager {

    //variables internas
    #products
    static #lastID_Product = 0

    //constructor
    constructor() {
        this.#products = []
    }

    //método interno
    #getNuevoID = () => {
        ProductManager.#lastID_Product += 1
        return ProductManager.#lastID_Product
    }

    //validar un string permitiendo solo números y letras
    #soloLetrasYNumeros = (cadena) => {
        return (/^[a-z A-Z 0-9]+$/.test(cadena))
    }

    //métodos públicos

    //devuelve todo el arreglo de productos
    getProducts = () => {
        return this.#products
    }    

    //dado un ID busca en el arreglo de productos un producto con dicho ID, caso contrario devuelve msje de error
    getProductById = (code) => {
        const producto = this.#products.find(item => item.id === code)
        if (producto)
            return producto
        else {
            console.error(`El producto con código ${code} no existe`)
            return
        }
    }

    

    //permite agregar un producto al arreglo de productos inicial si cumple con ciertas validaciones
    addProduct = (title, description, price, thumbnail, code, stock) => {
        //validar que el campo "title" no esté vacío        
        if (title.trim().length <= 0) {
            console.error("El campo \"title\" es inválido")
            return
        }
        //validar que el campo "description" no esté vacío
        if (description.trim().length <= 0) {
            console.error("El campo \"description\" es inválido")
            return
        }
        //validar que el campo "price" contenga sólo números
        if (isNaN(price)) {
            console.error("El campo \"price\" no es un número")
            return
        }
        //validar que el campo "thumbnail" no esté vacío
        if (thumbnail.trim().length <= 0) {
            console.error("El campo \"thumbnail\" es inválido")
            return
        }
        //validar que el campo "code" contenga sólo números y letras
        const codeAValidar = code.trim()
        if ((codeAValidar.length <= 0) || (!this.#soloLetrasYNumeros(codeAValidar))) {
            console.error("El campo \"code\" es inválido")
            return
        }
        //validar que el campo "stock" contenga sólo números
        if (isNaN(stock)) {
            console.error("El campo \"stock\" no es un número")
            return
        }        

        //antes de agregar el producto, verificar que el campo "code" no se repita
        const producto = this.#products.find(item => item.code === code)
        if (producto) {
            console.error(`El producto con código ${code} ya existe`)
            return
        }

        //si llego a este punto, ya están validados los datos, puedo construir el objeto "producto"
        const product = {
            id : this.#getNuevoID(),
            title,
            description,
            price,
            thumbnail,
            code,
            stock
        }

        this.#products.push(product)
    }

}

//testing de la clase
const productManager = new ProductManager()
console.log(productManager.getProducts())
productManager.addProduct("producto prueba",
                          "Este es un producto prueba",
                          200,
                          "sin imagen",
                          "abc123",
                          25)
console.log(productManager.getProducts())
productManager.addProduct("producto prueba",
                          "Este es un producto prueba",
                          200,
                          "sin imagen",
                          "abc123",
                          25)
console.log(productManager.getProductById(1))
console.log(productManager.getProductById(2))
