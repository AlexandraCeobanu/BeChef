import '../styles/login.scss';
import '../styles/register.scss';
export default function Register(){
    return(
        <div className="page">
            <div className="left-side">
            <img src="/images/Pizza maker2.gif" alt="Chef-gif" />
            </div>
            <div className="right-side">
            <div className="title">
            <img src="/images/hat.svg" alt="Hat" id="hat2" />
            <h1>Be chef</h1>
            </div>
            <form className="form-class">
                <label for="email">Email</label><br></br>
                <input type="text" id="email" name="email" required></input><br></br>

                
                <label for="password">Password</label><br></br>
                <input type="password" id="password" name="password" required></input><br></br>

                <label for="password">Repeat Password</label><br></br>
                <input type="password" id="repeat-password" name="repeat-password" required></input><br></br>

                <div id="line2">
                <p>Already have an account?</p>
                <p>Login</p>
                </div>

                <input type="submit" id="submit" name="submit" value="Register"></input>
            </form>
            </div>
        </div>
    )
}