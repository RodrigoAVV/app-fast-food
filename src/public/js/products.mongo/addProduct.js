const btnsAddProduct = document.querySelectorAll('.addProduct')
const mje = document.querySelector('#mje')
const addProduct = (e) => {
    e.preventDefault()
    const idProduct = e.target.getAttribute('id')
	llamandoAPI(idProduct)
}

btnsAddProduct.forEach((btnAddProduct) => {
    btnAddProduct.addEventListener('click', addProduct)
})

const llamandoAPI = async (idProduct) => {
	const options = {
		method: 'POST',
        mode: 'no-cors',
		headers: {
			'Content-Type':'application/json'
		},
        body:JSON.stringify(idProduct),
		cache: 'no-cache'
	}
	const respuesta = await fetch(`/api/cart2/${idProduct}`,options)
	const data2 = await respuesta.json()
	data2.success ? mje.innerHTML=data2.message : mje.innerHTML='Error'
}
