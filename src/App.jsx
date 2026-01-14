import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Home from './pages/Home';
import HotelHome from './pages/HotelHome';
import Results from './pages/Results';
import Details from './pages/Details';
import Trips from './pages/Trips';
import VoiceAI from './pages/VoiceAI';
import BookingSuccess from './pages/BookingSuccess';
import HostDashboard from './pages/HostDashboard';
import AddProperty from './pages/AddProperty';
import OrganizerDashboard from './pages/OrganizerDashboard';
import CreateEvent from './pages/CreateEvent';
import MapDiscovery from './pages/MapDiscovery';
import StoriesVibes from './pages/StoriesVibes';
import Community from './pages/Community';
import SearchDemo from './pages/SearchDemo';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/search-demo" element={<SearchDemo />} />
        <Route path="/login" element={<Login />} />

        {/* Traveler Routes */}
        <Route path="/home" element={<Home />} />
        <Route path="/hotel-home" element={<HotelHome />} />
        <Route path="/results" element={<Results />} />
        <Route path="/details/:id" element={<Details />} />
        <Route path="/trips" element={<Trips />} />
        <Route path="/map" element={<MapDiscovery />} />
        <Route path="/community" element={<Community />} />
        <Route path="/traveler/events" element={<Home />} />

        {/* Host Routes */}
        <Route path="/host/dashboard" element={<HostDashboard />} />
        <Route path="/host/add-property" element={<AddProperty />} />

        {/* Organizer Routes */}
        <Route path="/organizer/dashboard" element={<OrganizerDashboard />} />
        <Route path="/organizer/create-event" element={<CreateEvent />} />

        {/* Shared */}
        <Route path="/voice" element={<VoiceAI />} />
        <Route path="/booking-success" element={<BookingSuccess />} />
      </Routes>
    </Router>
  );
}

export default App;
