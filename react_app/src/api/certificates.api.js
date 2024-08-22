import axios from "axios";

export const certificates = async () => {
    try {
        return await axios.get("http://localhost:8000/certificates");
    } catch (error) {
        console.log(error);
        return;
    }
}