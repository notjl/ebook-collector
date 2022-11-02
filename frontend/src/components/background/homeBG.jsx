import React from "react";
import homeBG from './lib.mp4';

const Main = () => {
    return(
        <div className="homeBG">
            <video src={homeBG} autoPlay loop muted />
        </div>
    )
}

export default Main