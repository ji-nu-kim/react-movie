import React from 'react';
import { Col } from 'antd';

function GridCard(props) {
    return (
        <div>
            <Col lg={6} md={8} xs={12}>
                <div style={{ position: 'relative' }}>
                    <a href={`/movie/${props.movieId}`}>
                        <img src={props.image} alt={props.movieName} />
                    </a>

                </div>
            </Col>
        </div>
    )
}

export default GridCard;
