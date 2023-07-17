const mje = document.querySelector('#mjeProductUpdate')

const title = document.querySelector('#title')
const description = document.querySelector('#description')
const price = document.querySelector('#price')
const code = document.querySelector('#code')
const stock = document.querySelector('#stock')
const productUpdateId = document.querySelector('#productUpdateId')

document.querySelector('#idProductUpdate').addEventListener('submit',e=>{
    e.preventDefault()
    const data = Object.fromEntries(
        new FormData(e.target)
    )
    llamandoAPI(data)
})

const llamandoAPI = async (data) => {
	const options = {
		method: 'GET',
		headers: {
			'Content-Type':'application/json'
		},
		cache: 'no-cache'
	}
    const {idProduct} = data
	const respuesta = await fetch(`/api/products/${idProduct}`,options)
	const data2 = await respuesta.json()
	data2.success ? mje.innerHTML=data2.data.id : mje.innerHTML=data2.message
    setDataProductsUpdate(data2)
}

const setDataProductsUpdate = (product) => {
    const {data} = product
    title.value = data.title
    description.value = data.description
    price.value = data.price
    code.value = data.code
    stock.value = data.stock
    productUpdateId.value = data.id
}

document.querySelector('#dataProductsUpdate').addEventListener('submit',e=>{
    e.preventDefault()
    const data = Object.fromEntries(
        new FormData(e.target)
    )
    editProduct(data)
})

const editProduct = async (data) => {
	const options = {
		method: 'PUT',
        mode: 'cors',
		headers: {
			'Content-Type':'application/json'
		},
        body:JSON.stringify(data),
		cache: 'no-cache'
	}
    const {productUpdateId} = data
	const respuesta = await fetch(`/api/products/${productUpdateId}`,options)
	const data2 = await respuesta.json()
    console.log(data2)
	data2.success ? mje.innerHTML=data2.message : 'error'
}