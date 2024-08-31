import React, { useState } from 'react';
import Header from './Layout/Header';

const FeedbackPage = () => {
    const [rating, setRating] = useState(0);
    const [comments, setComments] = useState('');

    const handleSubmit = () => {
        // Handle feedback submission logic here
        console.log('Feedback submitted:', { rating, comments });
    };

    return (
        <div>
            <Header />
            <div style={{ padding: '20px' }}>
                <h1>Feedback</h1>
                <div>
                    <h3>Rate your ride:</h3>
                    <input 
                        type="number" 
                        value={rating} 
                        onChange={(e) => setRating(e.target.value)} 
                        min="1" 
                        max="5" 
                    />
                </div>
                <div style={{ marginTop: '20px' }}>
                    <h3>Comments:</h3>
                    <textarea 
                        value={comments} 
                        onChange={(e) => setComments(e.target.value)} 
                        rows="4" 
                        cols="50" 
                    />
                </div>
                <button style={{ marginTop: '20px' }} onClick={handleSubmit}>Submit Feedback</button>
            </div>
        </div>
    );
};

export default FeedbackPage;
