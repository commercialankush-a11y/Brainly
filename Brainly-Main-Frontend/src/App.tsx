import { Dashboard } from "./pages/dashboard"
import { SignIn } from "./pages/Sigin"
import { SignUp } from "./pages/Signup"
import { BrowserRouter,Routes, Route } from "react-router-dom"

function App() {
  
  return <BrowserRouter>
   <Routes>
    <Route path="/signup" element={<SignUp/>}/>
    <Route path="/signIn" element={<SignIn></SignIn>}/>
    <Route path="/dashboard" element={<Dashboard></Dashboard>}/>
   </Routes>
    
</BrowserRouter>
}
export default App
