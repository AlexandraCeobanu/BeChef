
import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFaceFrown} from '@fortawesome/free-solid-svg-icons';
import '../styles/successfullyPage.scss'
export default function Error()
{

    return(
        
        <div className='success'>
            <FontAwesomeIcon id="circle-check" icon={faFaceFrown} size="5x" />
            <h1>Something went wrong</h1>
           
        </div>
    )
}