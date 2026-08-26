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

        const data = await response.json()

        if (!response.ok) {
            throw new Error(data.message || "Something went wrong")
        }

        return data

    } catch (error) {
        console.log(`Api Endpoint Error : ${endpoint} `, error);
        throw error
    }

}

export default api