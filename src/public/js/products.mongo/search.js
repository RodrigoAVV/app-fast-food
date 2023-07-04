document.querySelector('#idProductSearch').addEventListener('submit',e=>{
    e.preventDefault()
    const data = Object.fromEntries(
        new FormData(e.target)
    )
	res(data)
})

const res = async (data) => {
	const options = {
		method: 'POST',
		headers: {
			'Content-Type':'application/json'
		},
        body:JSON.stringify(data),
		cache: 'no-cache'
	}
	const respuesta = await fetch(`/api/products2/${data.idProduct}`,options)
	const data2 = await respuesta.json()
	console.log(data2)
}
