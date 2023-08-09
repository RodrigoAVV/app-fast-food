const mje = document.querySelector('#mje')
document.querySelector('#formReset').addEventListener('submit',e=>{
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
            'Accept': 'application/json',
            'Content-Type': 'application/json'
		},
        body:JSON.stringify(data),
		cache: 'no-cache'
	}
	const respuesta = await fetch(`/api/users/resetpass`,options)
	const data2 = await respuesta.json()
	console.log(data2)
    /*if(data2.success){
		window.location.replace('/')
	}else{
		mje.innerHTML = `<div class="alert alert-warning alert-dismissible fade show" role="alert">
		<strong>${mje.innerHTML=data2.message}</strong>
		<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
  		</div>`
	}*/
}
