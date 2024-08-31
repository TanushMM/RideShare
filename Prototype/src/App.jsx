import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import LandingPage from './components/LandingPage';

import HomePage from './components/HomePage';
import SearchRidePage from './components/SearchRidePage';
import RideResultsPage from './components/RideResultsPage';
import RideDetailsPage from './components/RideDetailsPage';
import TripDetailsPage from './components/TripDetailsPage';
import PaymentSummaryPage from './components/PaymentSummaryPage';
import FeedbackPage from './components/FeedbackPage';

import Home from './components/LoginAndRegister/Home';
import Admin from './components/LoginAndRegister/Admin';
import User from './components/LoginAndRegister/User';
import Register from './components/LoginAndRegister/Register';
import Logout from './components/LoginAndRegister/Logout';

import Dashboard from './components/Admin/Dashboard';
import IssueManagement from './components/Admin/IssueManagement';
import PolicyManagement from './components/Admin/PolicyManagement';
import Reports from './components/Admin/Reports';
import RideMonitoring from './components/Admin/RideMonitoring';
import UserManagement from './components/Admin/UserManagement';

import Profile from './components/UserContext/Profile';

import Layout from './components/Layout/Layout';

// import Map from './components/Map/Map';

const App = () => {
    return (
            <Router>
                <Layout>
                    <Routes>
                        <Route path="/" element={<LandingPage />} />

                        // Login and Register Routes
                        <Route path="/login" element={<Home />} />
                        <Route path="/login/register" element={<Register />} />
                        <Route path="/login/user" element={<User />} />
                        <Route path="/login/admin" element={<Admin />} />
                        <Route path="/logout" element={<Logout />} />

                        <Route path="/home" element={<HomePage />} />
                        <Route path="/search-ride" element={<SearchRidePage />} />
                        <Route path="/ride-results" element={<RideResultsPage />} />
                        // -------------
                        <Route path="/ride-details" element={<RideDetailsPage />} />
                        <Route path="/trip-details" element={<TripDetailsPage />} />
                        <Route path="/payment-summary" element={<PaymentSummaryPage />} />
                        <Route path="/feedback" element={<FeedbackPage />} />

                        <Route path="/profile" element={<Profile />} />


                        // Admin Routes
                        <Route path="/admin" element={<Dashboard />} />
                        <Route path="/admin/issue-management" element={<IssueManagement />} />
                        <Route path="/admin/policy-management" element={<PolicyManagement />} />
                        <Route path="/admin/reports" element={<Reports />} />
                        <Route path="/admin/ride-monitoring" element={<RideMonitoring />} />
                        <Route path="/admin/user-management" element={<UserManagement />} />


                        {/* <Route path="/map" element={<Map />} /> */}

                    </Routes>
                </Layout>
            </Router>
    );
}

export default App;
