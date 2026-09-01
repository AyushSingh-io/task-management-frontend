const API_BASE_URL = import.meta.env.VITE_API_BASE_URL

const api = async (endpoint, options = {}) => {
    const isFormData = options.body instanceof FormData;

    try {
        const response = await fetch(`${API_BASE_URL}${endpoint}`, {
            ...options,
            credentials: "include",
            headers: {
                ...(isFormData ? {} : { "Content-Type": "application/json" }),
                ...options.headers
            }
        })

       const contentType = response.headers.get("content-type")

       const data = contentType?.includes("application/json") ? await response.json() : null;

       if(!response.ok){
        console.log("response is :" , response, data)
        throw new Error(data?.message || `Request failed with status ${response.status}`)
       }

       return data

    } catch (error) {
        console.log(`Api Endpoint Error : ${endpoint} `, error);
        throw error
    }

}

export default api