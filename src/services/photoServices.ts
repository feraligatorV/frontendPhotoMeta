import axios from "axios";
import { Photo } from "../types";

const API_URL = process.env.REACT_APP_API_URL||'http://localhost:3000';

interface Filters {
    title?:  string;
    'album.title'?: string;
    'album.usr.email'?: string;
}

export const fetchPhotos = async (filters: Filters, limit:number = 25, offset: number = 0): Promise<Photo[]> =>{
    try{
        const response = await axios.get<Photo[]>(`${API_URL}/externalapi/photos`,{
            params:{
                ...filters,
                limit,
                offset
            },
        });
        return response.data
    }
    catch(error){
        if (axios.isAxiosError(error) && error.response?.status === 404) {
            return []; 
        } else {
            throw error; 
        }
    }
};