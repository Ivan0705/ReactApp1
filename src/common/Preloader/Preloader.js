import React from "react";
import preloader from './../../pictures/preload.gif'

let Preloader = (props) => {
    return <div className={{width: '12px'}}>
        <img
            src={preloader}
            alt=''/></div>
};
export default Preloader;