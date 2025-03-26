import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import AthleteProfile from './AthleteProfile'; // Assuming these components are in the same directory
import PerformanceTracking from './PerformanceTracking';
import TrainingPlans from './TrainingPlans'; // You'll need to create this component
import InjuryManagement from './InjuryManagement'; // You'll need to create this component
import CareerResources from './CareerResources'; // You'll need to create this component
import FinancialTools from './FinancialTools'; // You'll need to create this component
import './App.css'; // You can create an App.css for styling

function Home() {
    return (
        <div>
            <header>
                <h1>Athlete Management System</h1>
            </header>

            <main>
                <nav>
                    <ul>
                        <li>
                            <Link to="/profile">Athlete Profile</Link>
                        </li>
                        <li>
                            <Link to="/performance">Performance Tracking</Link>
                        </li>
                        <li>
                            <Link to="/training">Training Plans</Link>
                        </li>
                        <li>
                            <Link to="/injury">Injury Management</Link>
                        </li>
                        <li>
                            <Link to="/career">Career Resources</Link>
                        </li>
                        <li>
                            <Link to="/financial">Financial Tools</Link>
                        </li>
                    </ul>
                </nav>

                <Routes>
                    <Route path="/profile" element={<AthleteProfile />} />
                    <Route path="/performance" element={<PerformanceTracking />} />
                    <Route path="/training" element={<TrainingPlans />} /> {/* Create this component */}
                    <Route path="/injury" element={<InjuryManagement />} />   {/* Create this component */}
                    <Route path="/career" element={<CareerResources />} />   {/* Create this component */}
                    <Route path="/financial" element={<FinancialTools />} /> {/* Create this component */}
                    <Route path="/" element={
                        <div>
                            <h2>Welcome to the Athlete Management System</h2>
                            <p>Use the navigation to access different features.</p>
                        </div>
                    } />
                </Routes>
            </main>
        </div>
    );
}

function App() {
    return (
        <Router>
            <Home />
        </Router>
    );
}

export default App;
