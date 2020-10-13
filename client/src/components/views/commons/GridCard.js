import React from 'react';
import { Col } from 'antd';

function GridCard(props) {

    if (props.landingPage) {
        return (
            <div>
                <Col lg={6} md={8} xs={24}>
                    <div style={{ position: 'relative' }}>
                        <a href={`/movie/${props.movieId}`}>
                            <img src={props.image} alt={props.movieName} />
                        </a>

                    </div>
                </Col>
            </div>
        )
    } else {
        return (
            <div>
                <Col lg={6} md={8} xs={24}>
                    <div style={{ position: 'relative' }}>
                        <img src={props.image} alt={props.characterName} style={{ display: 'block', width: '400px' }} />
                    </div>
                </Col>
            </div>
        )
    }

}

export default GridCard;
