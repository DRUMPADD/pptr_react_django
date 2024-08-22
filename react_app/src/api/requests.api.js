import axios from 'axios'
function getCookie(name) {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            // Does this cookie string begin with the name we want?
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}
const csrftoken = getCookie('csrftoken');
export const register = async (value) => await fetch("http://localhost:8000/create_permission",{
    credentials: 'same-origin',
    method: 'POST',
    headers: {
        'Accept': 'application/json',
        'Content-Type': "application/json",
        'X-CSRFToken': csrftoken
    },
    body: JSON.stringify(value)
})

// export const getStates = async () => await axios.get("http://localhost:8000/states")

export const getRegions = async () => await axios.get("http://localhost:8000/regions", { credentials: "include",})
export const getRegion = async (region) => await axios.get(`http://localhost:8000/region/${region}`, { credentials: "include",})

export const searchPermission = async (permission) => await axios.get(`http://localhost:8000/permissions/${permission}`, { credentials: "include",})
export const getPermission = async (permission) => await axios.get(`http://localhost:8000/permission/${permission}`, { credentials: "include",})
export const getPermissions = async () => await axios.get(`http://localhost:8000/permissions`, { credentials: "include",})

// export const getState = async (name) => await axios.get(`http://localhost:8000/state/${name}`)

export const getSedes = async (sede) => await axios.get(`http://localhost:8000/sedes/${sede}`, { credentials: "include",})

export const getWorkers = async (wker) => await axios.get(`http://localhost:8000/workers/${wker}`, { credentials: "include",})

export const getCategories = async (cl) => await axios.get(`http://localhost:8000/getCategories/${cl}`, { credentials: "include",})
export const countCategoriesPId = async (cl) => await axios.get(`http://localhost:8000/categories_per_id`, { credentials: "include",})
export const countClassesPerType = async () => await axios.get(`http://localhost:8000/classes_p_type`);

export const getCompanies = async (comp) => await axios.get(`http://localhost:8000/companies/${comp}`, { credentials: "include",})
export const getCompany_p_region = async () => await axios.get(`http://localhost:8000/company/c_company_region`)
export const getCompany_p_perm = async () => await axios.get(`http://localhost:8000/company/companies_w_perms`)