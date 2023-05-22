const id = document.querySelector('#id')
const mje = document.querySelector('#mje')
const btnSearchProduct = document.querySelector('#btnSearchProduct')
const btnUpdateProduct = document.querySelector('#btnUpdateProduct')
const titleForm = document.querySelector('#title')
const descriptionForm = document.querySelector('#description')
const priceForm = document.querySelector('#price')
const thumbnailForm = document.querySelector('#thumbnail')
const codeForm = document.querySelector('#code')
const stockForm = document.querySelector('#stock')
const productId = document.querySelector('#productId')


const searchProductId = (e) => {
    e.preventDefault()
    const idProduct = id.value
	//console.log(idProduct)
	llamandoAPI(idProduct)
}

btnSearchProduct.addEventListener('click', searchProductId)

const updateProductId = (e) =>{
	e.preventDefault()
	const title= titleForm.value
	const description = descriptionForm.value
	const price = priceForm.value
	const thumbnail = thumbnailForm.value
	const code = codeForm.value
	const stock = stockForm.value
	const id = productId.value
	const newProduct = {id,title,description,price,thumbnail,code,stock}
	updateProductById(newProduct)
}

btnUpdateProduct.addEventListener('click', updateProductId)

const updateProductById = async (data) => {
	const options = {
		method: 'PUT',
		mode: 'cors',
		headers: {
			'Content-Type':'application/json'
		},
        body:JSON.stringify(data),
		cache: 'no-cache'
	}
	const respuesta = await fetch(`/api/products2/edit`,options)
	const data2 = await respuesta.json()
	mje.innerHTML = data2.message
}

const llamandoAPI = async (data) => {
	const newId = {id:data}
	
	const options = {
		method: 'POST',
		mode: 'cors',
		headers: {
			'Content-Type':'application/json'
		},
        body:JSON.stringify(newId),
		cache: 'no-cache'
	}
	const respuesta = await fetch(`/api/products2/id`,options)
	const data2 = await respuesta.json()
	if(data2.success){
		title.value = data2.data.title
		description.value = data2.data.description
		price.value = data2.data.price
		//thumbnail.value = data2.data.thumbnail
		code.value = data2.data.code
		stock.value = data2.data.stock
		productId.value = data2.data._id
	}else{
		mje.innerHTML=data2.message
	}
}
