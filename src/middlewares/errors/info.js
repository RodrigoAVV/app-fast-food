export const generateUserInfo = (user) => {
    return `Una o mas propiedades estan incompletas o no son validas.
    Propiedades requeridas:
    * name: es obligatorio ${user.name}
    * firstname: es obligatorio ${user.firstname}
    * lastname: es obligatorio ${user.lastname}
    * run: es obligatorio ${user.run}
    * email: es obligatorio ${user.email}
    * age: es obligatorio ${user.age}
    * password: es obligatorio ${user.password}`
}

export const generateProductInfo = (product) => {
    return `Una o mas propiedades están incompletas o son invalidas.
    Propiedades requeridas:
    * title: ${product.title}
    * description: ${product.description}
    * price: ${product.price}
    * thumbnail: ${product.thumbnail}
    * code: ${product.code}
    * stock ${product.stock}`
}

//Una funcion para cada tipo de error