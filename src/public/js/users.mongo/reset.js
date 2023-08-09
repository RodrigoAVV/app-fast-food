const mje = document.querySelector('#resetMje')
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
	const respuesta = await fetch(`/api/users/reset`,options)
	const data2 = await respuesta.json()
	const { access_token } = data2;
	if (access_token) {
		localStorage.setItem("access_token", access_token);
	}
	if(data2.success){
		//window.location.replace('/')
		mje.innerHTML = `<div class="alert alert-success alert-dismissible fade show" role="alert">
		<strong>${mje.innerHTML='Revise su correo'}</strong>
		<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
  		</div>`
	}
}
