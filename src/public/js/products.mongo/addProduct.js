const btnsAddProduct = document.querySelectorAll('.addProduct')
const mje = document.querySelector('#mjeAddProductCart')
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
        mode: 'cors',
		headers: {
			'Content-Type':'application/json'
		},
		cache: 'no-cache'
	}
	const respuesta = await fetch(`/api/carts2/${idProduct}`,options)
	const data2 = await respuesta.json()
	data2.success ? mje.innerHTML=data2.message : mje.innerHTML=data2.message
}
