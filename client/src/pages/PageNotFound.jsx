import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFaceTired } from '@fortawesome/free-regular-svg-icons'
import './PageNotFound.css'

export default function PageNotFound(){
    return (
        <div className='error'>
            <h1><FontAwesomeIcon icon={faFaceTired} style={{color: "#8a0022",fontSize:8+'rem'}} /></h1>
            <h2>Oops... 404</h2>
            <h4>This Page you are looking for is Not Found</h4>
            <button className='btn btn-dark' onClick={()=>window.location.href='/'}>Go Back</button>
        </div>
    );
}