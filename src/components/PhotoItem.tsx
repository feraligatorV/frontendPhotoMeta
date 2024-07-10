import React from 'react';
import { Photo } from '../types';

interface PhotoItemProps{
    photo:Photo;
}

const PhotoItem: React.FC<PhotoItemProps> = ({ photo}) => {
 return(
    <div>
        <img src={photo.thumbnailUrl} alt={photo.title}/>
        <h3>{photo.title}</h3>
    </div>
 );
};

export default PhotoItem