
export default function Login(){
    return(
        <div className="page">
            <div className="right-side">
            <img src="/images/Chef.gif" alt="Chef-gif" />
            </div>
            <div className="left-side">
            <div className="title">
            <img src="/images/hat.svg" alt="Hat" />
            <h1>Hello chef</h1>
            </div>
            <form className="form-class">
                <label for="email">Email</label><br></br>
                <input type="text" id="email" name="email" required></input><br></br>

                <label for="password">Password</label>
                <p>Forgot password?</p>
               
                <input type="password" id="password" name="password" required></input>
                <p>Don't have an account?                  Register</p>
                <input type="submit" id="submit" name="submit" value="Login"></input>
            </form>
            </div>
        </div>
    )
}