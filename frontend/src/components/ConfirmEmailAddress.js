import { resendLink } from "../services/register"
import { useLocation,useNavigate } from "react-router-dom";
export default function ConfirmEmailAdress(){
    const location = useLocation();
    const  data  = location.state;
    const navigate = useNavigate();
    const handleResendLink = () => {
        resendLink(data.email)
        .then((response) => {
            console.log(response);
        })
        .catch((error) => {
            console.log(error);
            navigate('/error')
        })
    }
    return (
        <div className='confirm'>
                    <h1>To finish registration, please confirm your email address</h1>
                    <button type="button" onClick={handleResendLink} >Resend link</button>
                </div>
    )
}