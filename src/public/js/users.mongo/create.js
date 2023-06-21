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
		headers: {
			'Content-Type':'application/json'
		},
        body:JSON.stringify(data),
		cache: 'no-cache'
	}
	const respuesta = await fetch(`/api/users/store`,options)
	const data2 = await respuesta.json()
	if(data2.success){
		window.location.replace('/api/products2')
	}else{
		mje.innerHTML = `<div class="alert alert-warning alert-dismissible fade show" role="alert">
		<strong>${mje.innerHTML=data2.message}</strong>
		<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
  		</div>`
	}
	
	
}
