import api from "@/services/api.js";
import axios from "axios"

export default {
    register (credentials) {
        return api().post("users", credentials)
    },

    login (credentials) {
        return api().post("users/login", credentials)
    }
}