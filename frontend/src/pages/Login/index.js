import React, { useState } from 'react';
import api from '../../services/api';

export default function Login({ history }) {
    const [email, setEmail] = useState('');

    async function handleSubmit(event) {
        event.preventDefault();

        const response = await api.post('/sessions', { email })
    
        const { _id } = response.data;

        localStorage.setItem('user', _id);

        history.push('/dashboard');
  }
    
    return (
        <>
            <p>
                Offer developer <strong>spots</strong> and find <strong>talent</strong> for your business
            </p>

            <form onSubmit={handleSubmit}>
                <label htmlFor="email">EMAIL *</label>
                <input 
                    type="email"
                    id="email"
                    placeholder="Your best email"
                    value={email}
                    onChange={event => setEmail(event.target.value)}
                />

                <button className="btn" type="submit">Log in</button>
            </form>
        </>
    )
}