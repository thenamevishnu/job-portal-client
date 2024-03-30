import { api } from "../axios"

export const createNewAccount = async (formData) => {
    try {
        const { data } = await api.post(`/user/register`, formData)
        if (data.result) {
            return data.result
        }
        return { message: data.message }
    } catch (err) {
        return { message: err?.response?.data?.message || err.message}
    }
}

export const userLogin = async (formData) => {
    try {
        const { data } = await api.get(`/user/login`, {
            params: formData
        })
        if (data.result) {
            return data.result
        }
        return { message: data.message }
    } catch (err) {
        return { message: err?.response?.data?.message || err.message}
    }
}

export const getUser = async (id) => {
    try {
        const { data } = await api.get(`/user/info/${id}`)
        if (data.result) {
            return data
        }
        return { message: data.message }
    } catch (err) {
        return { message: err?.response?.data?.message || err.message}
    }
}