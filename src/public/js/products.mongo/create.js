const mje = document.querySelector('#mje')
const fileInput = document.querySelector('#thumbnail');
document.querySelector('#createProduct').addEventListener('submit',e=>{
    e.preventDefault()
    const data = Object.fromEntries(
      	new FormData(e.target)
    )
	const files = fileInput.files
	const formData = new FormData()
	formData.append('files',files)
	formData.append('data',data)
	llamandoAPI(formData)
})

const llamandoAPI = async (formData) => {
	const options = {
		method: 'POST',
		headers: {
			'Content-Type':'application/json',
			'Content-Type':'multipart/form-data; boundary=something'
		},
        body:formData,
		cache: 'no-cache'
	}
	const respuesta = await fetch(`/api/products2/store`,options)
	const data2 = await respuesta.json()
	data2.success ? mje.innerHTML=data2.message : mje.innerHTML=data2.description
	console.log(data2)
}
