import React from "react";
import PhotoList from "../components/PhotoList";

const Home: React.FC = () => {
    return(
        <div>
            <h1>Photo Gallery</h1>
            <PhotoList />
        </div>
    );
};

export default Home;