import React from 'react';

function Hello(params) {
    const {name} = params;

    return(
        <div>
            <p>Perkenalkan nama saya adalah {name}</p>
        </div>  
    )
}

export default Hello;