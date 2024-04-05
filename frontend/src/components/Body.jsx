
import { BrowserRouter, Route,  Routes,  } from "react-router-dom";
import Statistics from "./pages/Statistics";
import Chart from "./Chart";
import Home from "./pages/Home";
import NavBar from "./NavBar"


const Body = () => {
    return (
        <div>
            <BrowserRouter>
                <NavBar />
                <Routes >

                    <Route path="/" element={<Home />} />
                    <Route path="/stats" element={<Statistics />} />
                    <Route path="/charts" element={<Chart />} />
                    
                </Routes>

            </BrowserRouter>
        </div>
    )
}

export default Body