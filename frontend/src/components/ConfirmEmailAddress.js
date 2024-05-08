import { resendLink } from "../services/register"
import { useLocation } from "react-router-dom";
export default function ConfirmEmailAdress(){
    const location = useLocation();
    const  data  = location.state;
    const handleResendLink = () => {
        resendLink(data.email)
        .then((response) => {
            console.log(response);
        })
        .catch((error) => {
            console.log(error);
        })
    }
    return (
        <div className='confirm'>
                    <h1>To finish registration, please confirm your email address</h1>
                    <button type="button" onClick={handleResendLink} >Resend link</button>
                </div>
    )
}