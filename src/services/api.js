import axiosClient from './axiosClient'


export const fetchProfessorData = () => axiosClient.get('professor/')
export const fetchLabData = () => axiosClient.get('home/')
export const fetchAboutData = () => axiosClient.get('labinfo/')
export const fetchPublicationData = () => axiosClient.get('publications/')
export const fetchStudentsData = () => axiosClient.get('students/')
export const fetchNewsEventsData = () => axiosClient.get('news/')
export const fetchUniversityData = () => axiosClient.get('university/')
export const fetchbanners = () => axiosClient.get('banners/')
// Professor
export const createProfessor = data => axiosClient.post('professor/', data)
export const updateProfessor = (id, data) => axiosClient.put(`professor/${id}/`, data)
export const patchProfessor = (id, data) => axiosClient.patch(`professor/${id}/`, data)
export const deleteProfessor = id => axiosClient.delete(`professor/${id}/`)
// Publication
export const createPublication = data => axiosClient.post('publications/', data)
export const updatePublication = (id, data) => axiosClient.put(`publications/${id}/`, data)
export const patchPublication = (id, data) => axiosClient.patch(`publications/${id}/`, data)
export const deletePublication = id => axiosClient.delete(`publications/${id}/`)
// Students
export const createStudent = data => axiosClient.post('students/', data)
export const updateStudent = (id, data) => axiosClient.put(`students/${id}/`, data)
export const patchStudent = (id, data) => axiosClient.patch(`students/${id}/`, data)
export const deleteStudent = id => axiosClient.delete(`students/${id}/`)
// News and Events
export const createNewsEvents = data => axiosClient.post('news/', data)
export const updateNewsEvents = (id, data) => axiosClient.put(`news/${id}/`, data)
export const patchNewsEvents = (id, data) => axiosClient.patch(`news/${id}/`, data)
export const deleteNewsEvents = id => axiosClient.delete(`news/${id}/`)
// About
export const patchAbout = (id, data) => axiosClient.patch(`labinfo/${id}/`, data)

export const patchUniversity = (id, data) => axiosClient.patch(`university/${id}/`, data)