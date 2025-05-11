import axiosClient from './axiosClient'


export const fetchProfessorData = () => axiosClient.get('professor/')
export const fetchLabData = () => axiosClient.get('home/')
export const fetchAboutData = () => axiosClient.get('labinfo/')
export const fetchPublicationData = () => axiosClient.get('publications/')
export const createProfessor = data => axiosClient.post('professors/', data)
export const updateProfessor = (id, data) => axiosClient.put(`professors/${id}/`, data)
export const patchProfessor = (id, data) => axiosClient.patch(`professors/${id}/`, data)
export const deleteProfessor = id => axiosClient.delete(`professors/${id}/`)