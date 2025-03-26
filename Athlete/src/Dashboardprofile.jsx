import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'; // For navigation within the dashboard
import './Dashboard.css'; // Create a Dashboard.css for styling

function Dashboard() {
    const [athleteData, setAthleteData] = useState({
        name: 'Loading...',
        sport: 'Loading...',
        dateOfBirth: 'Loading...',
        // Add more profile fields as needed
        // Example:
        // height: 'Loading...',
        // weight: 'Loading...',
        // team: 'Loading...',
    });

    const [performanceSummary, setPerformanceSummary] = useState([]);
    const [injurySummary, setInjurySummary] = useState([]);
    // ... other summary states

    useEffect(() => {
        // --- Fetch Athlete Data ---
        const fetchAthleteData = async () => {
            try {
                // Replace '/api/athletes/123' with your actual API endpoint to get athlete data
                const response = await fetch('/api/athletes/123', {
                    headers: {
                        'Authorization': 'Bearer YOUR_AUTH_TOKEN' // Include auth token
                    }
                });
                if (response.ok) {
                    const data = await response.json();
                    setAthleteData(data);
                } else {
                    console.error('Failed to fetch athlete data');
                }
            } catch (error) {
                console.error('Error:', error);
            }
        };

        // --- Fetch Performance Summary ---
        const fetchPerformanceSummary = async () => {
            try {
                // Replace '/api/performance/summary/123' with your performance summary endpoint
                const response = await fetch('/api/performance/summary/123', {
                    headers: {
                        'Authorization': 'Bearer YOUR_AUTH_TOKEN'
                    }
                });
                if (response.ok) {
                    const data = await response.json();
                    setPerformanceSummary(data);
                } else {
                    console.error('Failed to fetch performance summary');
                }
            } catch (error) {
                console.error('Error:', error);
            }
        };

        // --- Fetch Injury Summary ---
        const fetchInjurySummary = async () => {
            try {
                // Replace '/api/injuries/summary/123' with your injury summary endpoint
                const response = await fetch('/api/injuries/summary/123', {
                    headers: {
                        'Authorization': 'Bearer YOUR_AUTH_TOKEN'
                    }
                });
                if (response.ok) {
                    const data = await response.json();
                    setInjurySummary(data);
                } else {
                    console.error('Failed to fetch injury summary');
                }
            } catch (error) {
                console.error('Error:', error);
            }
        };

        fetchAthleteData();
        fetchPerformanceSummary();
        fetchInjurySummary();
        // ... fetch other summaries as needed

    }, []); // Empty dependency array to run on mount

    return (
        <div className="dashboard-container">
            <h2>Athlete Dashboard</h2>

            <div className="profile-section">
                <h3>Profile</h3>
                <div className="profile-details">
                    <p><strong>Name:</strong> {athleteData.name}</p>
                    <p><strong>Sport:</strong> {athleteData.sport}</p>
                    <p><strong>Date of Birth:</strong> {athleteData.dateOfBirth}</p>
                    {/* Add more profile details */}
                    {/* Example: <p><strong>Height:</strong> {athleteData.height}</p> */}
                </div>
                <Link to="/profile">Edit Profile</Link>
            </div>

            <div className="summary-section">
                <h3>Performance Summary</h3>
                {performanceSummary.length > 0 ? (
                    <ul>
                        {performanceSummary.map((item, index) => (
                            <li key={index}>
                                {item.metric}: {item.value} ({item.date})
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>No performance summary available.</p>
                )}
                <Link to="/performance">View Performance History</Link>
            </div>

            <div className="summary-section">
                <h3>Injury Summary</h3>
                {injurySummary.length > 0 ? (
                    <ul>
                        {injurySummary.map((item, index) => (
                            <li key={index}>
                                {item.type}: {item.description} ({item.date})
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>No injury summary available.</p>
                )}
                <Link to="/injury">View Injury Details</Link>
            </div>

            {/* Add more summary sections for other modules */}
            {/* Example: Training Plan Summary, Financial Summary */}

        </div>
    );
}

export default Dashboard;
