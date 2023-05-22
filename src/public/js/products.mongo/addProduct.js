const btnsAddProduct = document.querySelectorAll('.addProduct')

const addProduct = (e) => {
    e.preventDefault()
    const idProduct = e.target.getAttribute('id')
    llamandoAPI(idProduct)
}

btnsAddProduct.forEach((btnAddProduct) => {
    btnAddProduct.addEventListener('click', addProduct)
})

const llamandoAPI = async (data) => {
	const options = {
		method: 'POST',
        mode: 'no-cors',
		headers: {
			'Content-Type':'application/json'
		},
        body:JSON.stringify(data),
		cache: 'no-cache'
	}
	const respuesta = await fetch(`/api/products2`,options)
	const data2 = await respuesta.json()
	console.log(data2)
}
