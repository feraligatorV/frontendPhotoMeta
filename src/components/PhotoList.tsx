import Reac, { useEffect, useState } from "react";
import { fetchPhotos } from "../services/photoServices";
import { Photo } from '../types';
import PhotoItem from "./PhotoItem";

const PhotoList: React.FC = () =>{
    const [photos, setPhotos] = useState<Photo[]>([]);
    const [limit, setLimit] = useState<number>(25);
    const [offset, setOffset] = useState<number>(0);
    const [title, setTitle] = useState<string>('');
    const [albumTitle, setAlbumTitle] = useState<string>('');
    const [userEmail, setUserEmail] = useState<string>('');

    useEffect(() => {
        const loadPhotos = async () => {
            const filters = {
                title,
                'album.title': (albumTitle),
                'album.usr.email': (userEmail)
            };
            const photos = await fetchPhotos(filters, limit, offset);
            setPhotos(photos);
        };

        loadPhotos();
    }, [limit, offset, title, albumTitle, userEmail]);

    return(
        <div>
            <div>
                <input type="text" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} />
                <input type="text" placeholder="Album Title" value={albumTitle} onChange={(e) => setAlbumTitle(e.target.value)} />
                <input type="text" placeholder="User Email" value={userEmail} onChange={(e) => setUserEmail(e.target.value)} />
                <button onClick={() => setOffset(0)}>Apply Filters</button>
            </div>
            {photos.length > 0 ? (
                photos.map(photo => (
                    <PhotoItem key={photo.id} photo={photo} />
                ))
            ) : (
                <p>No photos found</p>
            )}
            <div>
                <button onClick={() => setOffset(offset - limit)} disabled={offset === 0}>Previous</button>
                <button onClick={() => setOffset(offset + limit)}>Next</button>
                <select value={limit} onChange={(e) => setLimit(Number(e.target.value))}>
                    <option value={10}>10</option>
                    <option value={25}>25</option>
                    <option value={50}>50</option>
                </select>
            </div>
        </div>
    );
};

export default PhotoList;