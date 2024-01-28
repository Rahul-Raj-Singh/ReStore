import axios, { AxiosError, AxiosResponse } from 'axios';
import { toast } from 'react-toastify';
import { router } from '../router/Routes';

const sleep = (seconds: number) => new Promise(resolve => setTimeout(resolve, seconds*1000))

axios.defaults.baseURL = "http://localhost:5000/api/";
axios.defaults.withCredentials = true;

axios.interceptors.response.use(
    async (response: AxiosResponse) => {
        await sleep(0.5);
        return response;
    }, 
    (error: AxiosError) => {
        console.log("axios intercepted api error");
        const {status, data} = error.response!;

        switch(status) {
            case 400:
            case 401:
            case 404:
                toast.error((data as {title?: string}).title);
                break;
            case 500:
                router.navigate("/server-error", {state: {error: (data as {title?: string, detail?: string}).detail }});
                break;
            default:
                console.log("Unknow status code received: ", status);
                break;
    }
    return Promise.reject(error.response);
})

const requests = {
    get: async function(url: string) {
        const response = await axios.get(url);
        const data = response.data;
        return data;
    },

    post: async function(url: string, payload: unknown) {
        const response = await axios.post(url, payload);
        const data = response.data;
        return data;
    },

    delete: async function(url: string) {
        const response = await axios.delete(url);
        const data = response.data;
        return data;
    }
}

const agent = {
    requests
}

export default agent;