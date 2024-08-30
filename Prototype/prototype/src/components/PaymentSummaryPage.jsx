import React from 'react';
import Header from './Layout/Header';

const PaymentSummaryPage = ({ payment }) => {
    return (
        <div>
            <Header />
            <div style={{ padding: '20px' }}>
                <h1>Payment Summary</h1>
                <p><strong>Total Amount:</strong> ${payment?.amount || '25.00'}</p>
                <p><strong>Payment Method:</strong> {payment?.method || 'Credit Card'}</p>
                <p><strong>Transaction ID:</strong> {payment?.transactionId || 'XYZ123'}</p>
                <button style={{ marginTop: '20px' }}>Confirm Payment</button>
            </div>
        </div>
    );
};

export default PaymentSummaryPage;
