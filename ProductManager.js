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

    //metodos públicos
    getProducts = () => {
        return this.#products
    }    

    //función para validar un string permitiendo solo números y letras
    soloLetrasYNumeros = (cadena) => {
        return (/^[a-z A-Z 0-9]+$/.test(cadena))
    }

    addProduct = (title, description, price, thumbnail, code, stock) => {
                
        if (title.trim().length > 0) {
            console.error("El campo \"title\" es inválido")
            return
        }
        if (description.trim().length > 0) {
            console.error("El campo \"description\" es inválido")
            return
        }
        if (isNaN(price)) {
            console.error("El campo \"price\" no es un número")
            return
        }
        if (thumbnail.trim().length > 0) {
            console.error("El campo \"thumbnail\" es inválido")
            return
        }
        const codeAValidar = code.trim()
        if (codeAValidar.length > 0 && soloLetrasYNumeros(codeAValidar)) {
            console.error("El campo \"code\" es inválido")
            return
        }
        if (isNaN(stock)) {
            console.error("El campo \"stock\" no es un número")
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