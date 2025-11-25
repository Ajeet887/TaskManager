import { useState } from 'react';
import { BASE_URL } from '../utils/apiPaths';

const DebugConnection = () => {
    const [result, setResult] = useState('');

    const testConnection = async () => {
        try {
            const response = await fetch(`${BASE_URL}/api/test`);
            const data = await response.json();
            setResult(`✅ Success: ${JSON.stringify(data)}`);
        } catch (error) {
            setResult(`❌ Error: ${error.message}`);
        }
    };

    return (
        <div style={{ padding: '20px', border: '1px solid #ccc', margin: '20px' }}>
            <h3>Debug Connection</h3>
            <p>Backend URL: {BASE_URL}</p>
            <button onClick={testConnection}>Test Connection</button>
            <div style={{ marginTop: '10px', padding: '10px', backgroundColor: '#f5f5f5' }}>
                {result || 'Click test to check connection'}
            </div>
        </div>
    );
};

export default DebugConnection;