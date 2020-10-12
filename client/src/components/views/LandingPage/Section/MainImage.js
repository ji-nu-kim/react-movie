import React from 'react';

function MainImage(props) {
    return (
        <div style={{
            background:
                `linear-gradient(
                    to bottom, 
                    rgba(0,0,0,0) 39%,
                    rgba(0,0,0,0) 41%,
                    rgba(0,0,0,0.65) 100%),
                url('${props.image}'), 
                #1c1c1c`,
            height: '720px',
            backgroundSize: '100%, cover',
            width: '100%',
            backgroundPosition: 'center, top',
            position: 'relative'
        }}>
            <div>
                <div style={{
                    position: 'absolute',
                    maxWidth: '500px',
                    bottom: '2rem',
                    marginLeft: '2rem'
                }}>
                    <h2 style={{ color: '#fff' }}>{props.title}</h2>
                    <p style={{ color: '#fff', fontSize: '1rem' }}>{props.description}</p>
                </div>
            </div>
        </div >
    );
};

export default MainImage;