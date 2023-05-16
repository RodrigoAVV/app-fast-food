const socket = io()
//const section = document.querySelector('#section')

socket.on('data', (data) =>{
    console.log(data)
    /*
        NO SE PORQUE NO FUNCIONA SI LA DATA LLEGA
    */
   
   
    /*
    data.forEach(product => {
        section.innerHTML += `
        <article>
            <img src=${product.thumbnail}>
            <p>${product.title}</p>
            <p>${product.price}</p>
        </article>
    `
    });
    */
    
})
