import React from 'react';
import { SmileOutlined } from '@ant-design/icons';


function Footer() {
    return (
        <div>
            <div style={{
                height: '80px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '1rem'
            }}>
                <p> Happy Coding  <SmileOutlined /></p>
            </div>
        </div>
    )
}

export default Footer;
