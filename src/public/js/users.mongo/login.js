const mje = document.querySelector('#mje')
document.querySelector('form').addEventListener('submit',e=>{
    e.preventDefault()
    const data = Object.fromEntries(
        new FormData(e.target)
    )
	//console.log(data)
    llamandoAPI(data)
})

const llamandoAPI = async (data) => {
	const options = {
		method: 'POST',
		mode: 'cors',
		headers: {
			'Accept':'application/json',
			'Content-Type':'application/json'
		},
        body:JSON.stringify(data),
		cache: 'no-cache'
	}
	const respuesta = await fetch(`/api/users/login`,options)
	const data2 = await respuesta.json()
	data2.success ? window.location.replace('/api/products2') : mje.innerHTML=data2.message
	//data2.success ? console.log(document.cookie) : mje.innerHTML=data2.message
	
}
