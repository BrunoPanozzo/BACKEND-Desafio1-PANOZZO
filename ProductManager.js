class ProductManager {

    //variables internas
    #products
    static #lastID_Product = 0

    //constructor
    constructor() {
        this.#products = []
    }

    //métodos internos
    //retornar un ID único para cada producto nuevo
    #getNuevoID = () => {
        ProductManager.#lastID_Product += 1
        return ProductManager.#lastID_Product
    }

    //validar un string permitiendo solo números y letras
    #soloLetrasYNumeros = (cadena) => {
        return (/^[a-zA-Z0-9]+$/.test(cadena))
    }

    //validar permitiendo solo números
    #soloNumeros = (cadena) => {
        return (/^[0-9]+$/.test(cadena))
    }

    //métodos públicos
    //devolver todo el arreglo de productos
    getProducts = () => {
        return this.#products
    }    

    //dado un ID buscar en el arreglo de productos un producto con dicho ID, caso contrario devolver msje de error
    getProductById = (code) => {
        const producto = this.#products.find(item => item.id === code)
        if (producto)
            return producto
        else {
            console.error(`El producto con código \"${code}\" no existe`)
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
        if ((!this.#soloNumeros(price)) || (typeof price != "number")) {
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
        if ((!this.#soloNumeros(stock)) || (typeof stock != "number")) {
            console.error("El campo \"stock\" no es un número")
            return
        }        

        //antes de agregar el producto, verificar que el campo "code" no se repita
        const producto = this.#products.find(item => item.code === code)
        if (producto) {
            console.error(`No se permite agregar el producto con código \"${code}\" porque ya existe`)
            return
        }

        //si llego a este punto, ya están validados los datos, puedo construir el objeto "producto"
        const product = {
            id : this.#getNuevoID(),
            title,
            description,
            price: Number(price),
            thumbnail,
            code,
            stock: Number(stock)
        }

        this.#products.push(product)
    }

}

//testing de la clase "ProductManager"
const productManager = new ProductManager()

let products = productManager.getProducts()
console.log(products)

productManager.addProduct("producto prueba",
                          "Este es un producto prueba",
                          200,
                          "sin imagen",
                          "abc123",
                          25)

products = productManager.getProducts()
console.log(products)

productManager.addProduct("producto prueba",
                          "Este es un producto prueba",
                          200,
                          "sin imagen",
                          "abc123",
                          25)

products = productManager.getProducts()
console.log(products)

let product = productManager.getProductById(1)
if (product) console.log(product)

product = productManager.getProductById(2)
if (product) console.log(product)
