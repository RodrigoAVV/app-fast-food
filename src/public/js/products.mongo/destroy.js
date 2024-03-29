const mje = document.querySelector('#mje')
document.querySelector('#destroyProduct').addEventListener('submit',e=>{
    e.preventDefault()
    const data = Object.fromEntries(
        new FormData(e.target)
    )
    //console.log(data)
    llamandoAPI(data)
})

const llamandoAPI = async (data) => {
	const options = {
		method: 'DELETE',
		headers: {
			'Content-Type':'application/json'
		},
        //body:JSON.stringify(data),
		cache: 'no-cache'
	}
	const id = data.id
	const respuesta = await fetch(`/api/products2/${id}`,options)
	const data2 = await respuesta.json()
	data2.success ? mje.innerHTML=data2.message : mje.innerHTML='Error'
	console.log(data2)
}
