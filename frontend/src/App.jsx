import { useEffect, useState, useRef } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import SideBarComponent from './components/SideBar.jsx';
import Data from "./components/Data/Data.jsx";
import Chat from "./components/Chat/Chat.jsx";
import NewsSection from "./components/News/NewsSection.jsx";
import Home from "./components/Home/Home.jsx";
import GeneralInfo from "./components/GenInfo/GeneralInfo.jsx";
import Navbar from "./components/Home/Navbar.jsx";
import PlayGround from './components/Playground/PlayGround.jsx';
import Submit, {MainSubmitContent} from "./SubmitComponents/Submit.jsx";
import Contribute from "./components/Contribute/Contribute.jsx";
import SIR from './components/Playground/SIR.jsx';
import SignUp from './SubmitComponents/SignUp.jsx';
import LogIn from './SubmitComponents/LogIn.jsx';
import { useCsrfToken } from './CrsfTokenContext.jsx';
import MosquitoSightings from './SubmitComponents/MosquitoSightings.jsx';
function MainContent({ isVisible, handleTabChange, handleWebsiteChange }) {
    const location = useLocation();

    useEffect(() => {
        if (location.pathname.startsWith('/submit')) {
            handleWebsiteChange('Submit');
        } else {
            handleWebsiteChange('Main');
        }
    }, [location, handleWebsiteChange]);

    const isSubmitRoute = location.pathname.startsWith('/submit');

    return (
        <div
            className={`content flex-1 overflow-y-auto ${
                isSubmitRoute ? '' : 'bg-gradient-to-r from-blue-100 to-blue-300'
            } ${isVisible && !isSubmitRoute ? 'mt-20' : 'mt-0'}`}
            id="main"
        >
            <Routes>
                <Route path="/" element={<Home handleTabChange={handleTabChange} />} />
                <Route path="/data" element={<Data handleTabChange={handleTabChange} />} />
                <Route path="/chat" element={<Chat handleTabChange={handleTabChange} />} />
                <Route path="/news" element={<NewsSection handleTabChange={handleTabChange} />} />
                <Route path="/general-information" element={<GeneralInfo handleTabChange={handleTabChange} />} />
                <Route path="/contribute" element={<Contribute handleTabChange={handleTabChange} />} />
                <Route path="/playground" element={<PlayGround handleTabChange={handleTabChange} />} />
                <Route path="/submit/*" element={<Submit />} />
                <Route path="/playground/sir" element={<SIR />} />
                <Route path="/submit/signup" element={<SignUp />} />
                <Route path="/submit/login" element={<LogIn />} />
                <Route path="/submit/mosquito-sightings" element={<MosquitoSightings />} />
            </Routes>
        </div>
    );
}

export default function App() {
    const [isLargerScreen, setIsLargerScreen] = useState(window.innerWidth >= 768);
    const [isVisible, setIsVisible] = useState(true);
    const lastScrollY = useRef(0);
    const [tabChosen, setTabChosen] = useState('Home');
    const [website, setWebsite] = useState('Main');
    const {setCsrfToken} = useCsrfToken();
    const handleWebsiteChange = (newWebsite) => setWebsite(newWebsite);
    const handleResize = () => setIsLargerScreen(window.innerWidth >= 768);

    const handleScroll = () => {
        const mainBody = document.getElementById("main");
        if (mainBody) {
            const currentScrollY = mainBody.scrollTop;
            setIsVisible(currentScrollY <= lastScrollY.current);
            lastScrollY.current = currentScrollY;
        }
    };
      // Fetch CSRF token when component mounts
  useEffect(() => {
    const fetchCsrfToken = async () => {
      try {
        const response = await fetch('https://dengue-watch-backend-f59b9593b035.herokuapp.com/users/get-csrf-token/', {
          credentials: 'include', // Ensures cookies are included in requests
        });
        const data = await response.json();
        setCsrfToken(data.csrfToken);
        console.log('CSRF token fetched:', data.csrfToken);
      } catch (error) {
        console.error('Failed to fetch CSRF token:', error);
      }
    };
    fetchCsrfToken();
  }, [setCsrfToken]);

    useEffect(() => {
        window.addEventListener('resize', handleResize);
        const mainBody = document.getElementById("main");
        mainBody?.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener('resize', handleResize);
            mainBody?.removeEventListener("scroll", handleScroll);
        };
    }, []);

    const handleTabChange = (tab) => setTabChosen(tab);

    return (
        <Router>
            <div className={`${website === 'Main' ? 'flex flex-col md:flex-row h-screen relative md:m-10 md:rounded-2xl shadow-lg' : ''}`}>
                {isLargerScreen && website === 'Main' ? (
                    <SideBarComponent tabChosen={tabChosen} />
                ) : (
                    website === 'Main' && <Navbar isVisible={isVisible}/>
                )}
                <MainContent isVisible={isVisible && !isLargerScreen} handleTabChange={handleTabChange} handleWebsiteChange={handleWebsiteChange} />
            </div>
        </Router>
    );
}

export function getCookie(name) {
  let cookieValue = null;
  if (document.cookie && document.cookie !== '') {
    const cookies = document.cookie.split(';');
    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i].trim();
      if (cookie.substring(0, name.length + 1) === (name + '=')) {
        cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
        break;
      }
    }
  }
  return cookieValue;
}