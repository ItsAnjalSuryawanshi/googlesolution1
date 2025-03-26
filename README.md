# googlesolution1
#athelete management system

import React, { useState, useEffect } from 'react';

function AthleteProfile() {
    const [profileData, setProfileData] = useState({
        name: '',
        dob: '',
        sport: '',
    });

    const handleChange = (e) => {
        setProfileData({ ...profileData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            // Send data to the backend API (e.g., /api/athletes/{athleteId} with PUT)
            const response = await fetch('/api/athletes/123', {  // Replace 123 with actual athlete ID
                method: 'PUT', // Or POST if creating a new profile
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer YOUR_AUTH_TOKEN' // Include auth token
                },
                body: JSON.stringify(profileData),
            });

            if (response.ok) {
                console.log('Profile updated successfully');
                // Optionally: Show a success message to the user
            } else {
                console.error('Failed to update profile');
                // Optionally: Show an error message to the user
            }
        } catch (error) {
            console.error('Error:', error);
            // Optionally: Show an error message to the user
        }
    };

    useEffect(() => {
        // Fetch athlete profile data on component mount (if needed)
        // Example:
        const fetchProfile = async () => {
            try {
                const response = await fetch('/api/athletes/123', { // Replace 123 with actual athlete ID
                    headers: {
                        'Authorization': 'Bearer YOUR_AUTH_TOKEN'
                    }
                });
                if (response.ok) {
                    const data = await response.json();
                    setProfileData(data);
                } else {
                    console.error('Failed to fetch profile');
                }
            } catch (error) {
                console.error('Error:', error);
            }
        };

        fetchProfile();
    }, []); // Empty dependency array to run only on mount

    return (
        <div>
            <h2>Athlete Profile</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="name">Name:</label>
                    <input type="text" id="name" name="name" value={profileData.name} onChange={handleChange} />
                </div>
                <div className="form-group">
                    <label htmlFor="dob">Date of Birth:</label>
                    <input type="date" id="dob" name="dob" value={profileData.dob} onChange={handleChange} />
                </div>
                <div className="form-group">
                    <label htmlFor="sport">Sport:</label>
                    <select id="sport" name="sport" value={profileData.sport} onChange={handleChange}>
                        <option value="basketball">Basketball</option>
                        <option value="soccer">Soccer</option>
                        <option value="tennis">Tennis</option>
                        {/* Add more sports as needed */}
                    </select>
                </div>
                <button type="submit">Save Profile</button>
            </form>
        </div>
    );
}

export default AthleteProfile;
