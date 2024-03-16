import '../styles/userDescription.scss'
export default function UserDescription(){
    return(
        <div className="userDescription">
            <div className="profile-picture">
            </div>
            <h3>@alexandra17</h3>
            <div className="description">
                <p>Iasi, Romania</p>
                <p>Student passionate about food</p>
            </div>
            <hr id="line"></hr>
            <div className="statistics">
                <div className="statistic">
                <h3>Recipes</h3>
                <h2>100</h2>
                </div>
                <div className="statistic">
                <h3>Likes</h3>
                <h2>100</h2>
                </div>
            </div>
        </div>
    )
}