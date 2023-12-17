import '../styles/login.scss';
export default function Login(){
    return(
        <div className="page">
            <div className="left-side">
            <img src="/images/Chef2.gif" alt="Chef-gif" />
            </div>
            <div className="right-side">
            <div className="title">
            <img src="/images/hat.svg" alt="Hat" id="hat" />
            <h1>Hello chef</h1>
            </div>
            <form className="form-class">
                <label for="email">Email</label><br></br>
                <input type="text" id="email" name="email" required></input><br></br>

                <div id="line1">
                <label for="password">Password</label>
                <p>Forgot password?</p>
                </div>
                <input type="password" id="password" name="password" required></input>

                <div id="line2">
                <p>Don't have an account?</p>
                <p>Register</p>
                </div>
                <input type="submit" id="submit" name="submit" value="Login"></input>
            </form>
            </div>
        </div>
    )
}