import React from 'react';
import { Carousel, Button } from 'antd';
import moment from 'moment';

const WeekCarousel = ({ weatherData }) => {
    const carouselRef = React.useRef(null);

    const goNext = () => {
        carouselRef.current.next();
    };

    const goPrev = () => {
        carouselRef.current.prev();
    };

    // Извлекаем уникальные даты из данных погоды
    const dates = weatherData.list.map(entry =>
        moment(entry.dt_txt).format('YYYY-MM-DD')
    );
    const uniqueDates = [...new Set(dates)];

    return (
        <div>
            <Button onClick={goPrev}>&lt;</Button>
            <Carousel ref={carouselRef} dots={false}>
                {uniqueDates.map(date => (
                    <div key={date}>
                        <h3>{moment(date).format('dddd, MMMM Do')}</h3>
                    </div>
                ))}
            </Carousel>
            <Button onClick={goNext}>&gt;</Button>
        </div>
    );
};

export default WeekCarousel;
