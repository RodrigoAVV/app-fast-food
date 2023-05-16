const del = document.querySelector('#del')
document.querySelector('form').addEventListener('submit',e=>{
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
		cache: 'no-cache',
		redirect: 'follow'
	}
	const respuesta = await fetch(`/api/products/${id}`,options)
	const data2 = await respuesta.json()
	data2.success ? del.innerHTML='Producto eliminado' : del.innerHTML='Error'
	console.log(data2)

}