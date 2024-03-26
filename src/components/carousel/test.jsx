import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import WeekDays from './WeekDays';
import {weatherStoreWeek} from "../../store/weather-week";

jest.mock('../../store/weather-week', () => ({
    weatherStoreWeek: {
        uniqueDates: ['2023-04-01', '2023-04-02'],
        selectedDate: '2023-04-01',
        setSelectedDate: jest.fn(),
    },
}));

jest.mock('moment', () => () => ({ format: (formatString) => "01 APR" }));

describe('<WeekDays />', () => {
    it('renders the correct number of date items', () => {
        const { getAllByClassName } = render(<WeekDays weatherData={{}} />);
        expect(getAllByClassName('date-item')).toHaveLength(2);
    });

    it('sets active class on selected date', () => {
        const { getByText } = render(<WeekDays weatherData={{}} />);
        const firstDateItem = getByText('01 APR').closest('.date-item');
        expect(firstDateItem).toHaveClass('active');
    });

    it('calls setSelectedDate on date item click', () => {
        const { getByText } = render(<WeekDays weatherData={{}} />);
        fireEvent.click(getByText('01 APR'));
        expect(weatherStoreWeek.setSelectedDate).toHaveBeenCalledWith('2023-04-01');
    });
});
