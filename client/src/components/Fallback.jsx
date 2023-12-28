

import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFaceTired } from '@fortawesome/free-regular-svg-icons'
import '../pages/PageNotFound.css'

export default function Fallback({ error, resetErrorBoundary }) {
    console.log(error)
    return (
        <div className='error'>
            <h1><FontAwesomeIcon icon={faFaceTired} style={{color: "#8a0022",fontSize:8+'rem'}} /></h1>
            <h2>{error.code}</h2>
            <h4><pre style={{ color: "red" }}>{error.message}</pre></h4>
            <button className='btn btn-dark' onClick={()=>window.location.href='/'}>Go Back To Home</button>
        </div>
    );
}