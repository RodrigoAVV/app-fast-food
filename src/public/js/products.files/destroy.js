const mje = document.querySelector('#mjeDelete')
document.querySelector('#deleteProductFile').addEventListener('submit',e=>{
    e.preventDefault()
    const data = Object.fromEntries(
        new FormData(e.target)
    )
    llamandoAPI(data)
})

const llamandoAPI = async (data) => {
	const {id} = data
	const options = {
		method: 'DELETE',
		headers: {
			'Content-Type':'application/json'
		},
		cache: 'no-cache'
	}
	const respuesta = await fetch(`/api/products/${id}`,options)
	const data2 = await respuesta.json()
	data2.success ? mje.innerHTML=data2.message : mje.innerHTML=data2.message
}