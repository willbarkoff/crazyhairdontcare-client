const baseurl = "http://localhost:8080/"

async function GET(endpoint: string) {
	let response = await fetch(baseurl + endpoint, {
		method: "GET",
		credentials: "include"
	});
	return response.json()
}

async function POST(endpoint: string, data: Record<string, string>) {
	let formData = new URLSearchParams();
	for (let key in data) {
		formData.set(key, data[key])
	}
	console.log(baseurl + endpoint)
	let response = await fetch(baseurl + endpoint, {
		method: "POST",
		credentials: "include",
		headers: {
			'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
		},
		body: formData
	})
	return response.json()
}

const api = {
	GET: GET,
	POST: POST,
	baseURL: baseurl
}

export default api