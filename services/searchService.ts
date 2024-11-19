const APISearch = `/api/search/users`;
import axios from "axios";

export async function searchUsers(query:String) {
    try {
        
     
        const res = await axios.get(APISearch, {params: {query}});

        return res.data;
    } catch (error) {
       if(axios.isAxiosError(error)){
            console.log("Error in get Project:", error.response?.data || error.message)
        }else{
            console.log("Error inesperado: ", error);
        }
    }
}