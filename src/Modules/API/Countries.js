import API from "./API"
import APIConfig from "../../Config/APIConfig"
export async function fetchCountries() {
    const apiResult = await API.get(APIConfig.allCountries);
    const { status, data } = apiResult;
    //Please note that this implementation could be done by a using middleware but I wasn't able to use it because of the time constrain
    if (status === 200 && Array.isArray(data)) {
        return apiResult;
    }
    return Promise.reject(apiResult);
}
