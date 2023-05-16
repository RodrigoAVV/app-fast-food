const socket = io()
let user
let email = document.querySelector('#email')
Swal.fire({
    title:'Identificate',
    input:'text',
    text:'Ingrese su correo para ingresar al chat',
    inputValidator:(value) => {
        return !value && 'Es necesario escribir su nombre de usuario'
    },
    allowOutsideClick:false,
    allowEscapeKey:false
}).then(result => {
    user = result.value
})


email.addEventListener('keyup',evt => {
    if(evt.key === "Enter"){
        if(email.value.trim().length > 0){
            socket.emit('message',{user:user,message:email.value})
            email.value=''
        }
    }
})

socket.on('logs',data => {
    let logs = document.querySelector('#logs')
    let messages = ''
    data.forEach(message => {
        messages += `${message.user} dice ${message.message}</br>`
    })
    logs.innerHTML = messages
})
