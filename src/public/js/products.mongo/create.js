const mje = document.querySelector('#mje')
document.querySelector('#createProduct').addEventListener('submit',e=>{
    e.preventDefault()
    const data = Object.fromEntries(
        new FormData(e.target)
    )
    llamandoAPI(data)
})

const llamandoAPI = async (data) => {
	const options = {
		method: 'POST',
		headers: {
			'Content-Type':'application/json'
		},
        body:JSON.stringify(data),
		cache: 'no-cache'
	}
	const respuesta = await fetch(`/api/products2/store`,options)
	const data2 = await respuesta.json()
	data2.success ? mje.innerHTML=data2.message : mje.innerHTML=data2.description
	console.log(data2)
}
