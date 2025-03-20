import axios from "axios";


const endpoint = `/api/upload-image`;

export async function updateImage (user:string, imageUrl: string | null){
  

   try {
    const res = await axios.post(endpoint, {user, imageUrl});
    return res;
   } catch (error) {
     if( axios.isAxiosError(error)){
        console.log("Error upload image: ", error);
     }else{
        console.log("Error inesperado: ", error);
     }
    throw error;
   }
}