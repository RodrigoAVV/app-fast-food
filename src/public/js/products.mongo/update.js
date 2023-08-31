const mjeProductUpdate = document.querySelector('#mjeProductUpdate')

document.querySelector('#formSearchUpdate').addEventListener('submit',e=>{
    e.preventDefault()
    const data = Object.fromEntries(
        new FormData(e.target)
    )
	llamandoAPI(data)
})

const llamandoAPI = async (data) => {
	const id = data.id
	const options = {
		method: 'GET',
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json'
		},
        //body:JSON.stringify(newId),
		cache: 'no-cache'
	}
	const respuesta = await fetch(`/api/products2/${id}`,options)
	const data2 = await respuesta.json()
	if(data2.success){
		title.value = data2.data.title
		description.value = data2.data.description
		price.value = data2.data.price
		code.value = data2.data.code
		stock.value = data2.data.stock
		productId.value = data2.data._id
	}else{
		mje.innerHTML=data2.message
	}
}


document.querySelector('#formUpdate').addEventListener('submit',e=>{
    e.preventDefault()
    const data = Object.fromEntries(
        new FormData(e.target)
    )
	llamandoAPI2(data)
})

const llamandoAPI2 = async (data) => {
	const options = {
		method: 'PUT',
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json'
		},
        body:JSON.stringify(data),
		cache: 'no-cache'
	}
	const id = data.productId
	const respuesta = await fetch(`/api/products2/${id}`,options)
	const data2 = await respuesta.json()
	if(data2.success){
		mjeProductUpdate.innerHTML=data2.message
	}else{
		mjeProductUpdate.innerHTML=data2.message
	}
	
}

