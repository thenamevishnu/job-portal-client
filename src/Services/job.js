import axios from "axios"
import { api } from "../axios"

export const createNewJob = async (formData) => {
    try {
        const { data } = await api.post(`/job/create`, formData)
        if (data.status == "OK") {
            return data
        }
        return { message: data.message }
    } catch (err) {
        return { message: err?.response?.data?.message || err.message }
    }
}

export const getFullJob = async (filter, page) => {
    try {
        const { data } = await api.get(`/job/get-jobs`, {
            params: {
                page: page,
                filter: filter
            }
        })
        if (data.result) {
            return data
        }
        return { message: data.message }
    } catch (err) {
        return { message: err?.response?.data?.message || err.message }
    }
}

export const getJobWithId = async (id) => {
    try {
        const { data } = await api.get(`/job/single/${id}`)
        if (data.result) {
            return data
        }
        return { message: data.message }
    } catch (err) {
        return { message: err?.response?.data?.message || err.message }
    }
}

export const applyJob = async (user_id, job_id, userForm) => {
    try {
        const { data } = await api.post(`/job/apply`, { user_id, job_id, userForm })
        if (data.status == "OK") {
            return data
        }
        return { message: data.message }
    } catch (err) {
        return { message: err?.response?.data?.message || err.message }
    }
}

export const uploadResume = async (resume) => {
    try {
        const formData = new FormData();
        formData.append('file', resume);
        formData.append('upload_preset', import.meta.env.VITE_AP);
        const { data } = await axios.post(import.meta.env.VITE_CLOUD, formData)
        const url = data?.secure_url
        return url
    } catch (err) {
        return false
    }
}