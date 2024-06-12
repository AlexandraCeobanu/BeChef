
import { BrowserRouter as Router, Routes,Route} from 'react-router-dom';
import Login from '../components/Login'
import Register from './Register';
import SuccessfullyPage from './SuccessfullyPage';
import Home from './Home';
import ProtectedRoute from '../components/ProtectedRoute';
import ForgotPassword from './ForgotPassword';
import EnterCode from './EnterCode';
import UserProfile from './UserProfile';
import AddRecipe from './AddRecipe';
import UserProfileView from './UserProfileView';
import Chat from './Chat';
import Notifications from './Notifications';
import RecipeViewNotification from './RecipeViewNotification';
import SuccessfullyRegistration from './SuccessfullyRegistration';
import ConfirmEmailAdress from './ConfirmEmailAddress';
import ShoppingListPage from './ShoppingListPage';
import Error from './Error';
export default function App(){
    return(
        <Router>
            <Routes>
                <Route path="/" element= {<Login/>}></Route>
                <Route path="/login" element= {<Login/>}></Route>
                <Route path="/home" element={<ProtectedRoute><Home/></ProtectedRoute>}/>
                <Route path="/logout" element= {<Login/>}></Route>
                <Route path="/register" element={<Register/>}></Route>
                <Route path="/success" element ={<SuccessfullyPage/>}></Route>
                <Route path="/forgotpassword" element ={<ForgotPassword/>}></Route>
                <Route path="/changePassword" element ={<EnterCode/>}></Route>
                <Route path="/confirm" element ={<ConfirmEmailAdress></ConfirmEmailAdress>}></Route>
                <Route path="/confirmEmail" element ={<SuccessfullyRegistration/>}></Route>
                <Route path="/profile" element = {<ProtectedRoute><UserProfile/></ProtectedRoute>}></Route>
                <Route path="/addRecipe" element = {<ProtectedRoute><AddRecipe/></ProtectedRoute>}></Route>
                <Route path="/userProfileView/:name" element = {<ProtectedRoute><UserProfileView/></ProtectedRoute>}></Route>
                <Route path="/notifications" element = {<ProtectedRoute><Notifications/></ProtectedRoute>}></Route>
                <Route path="/chat" element = {<ProtectedRoute><Chat/></ProtectedRoute>}></Route>
                <Route path="/viewRecipe" element = {<ProtectedRoute><RecipeViewNotification/></ProtectedRoute>}></Route>
                <Route path="/shoppingList" element = {<ShoppingListPage/>}></Route>
                <Route path="/error" element = {<Error/>}></Route>
            </Routes>
        </Router>
    )
}
