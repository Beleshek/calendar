import { useState, useEffect } from 'react';

export function Calendar() {
    const [date, setDate] = useState(new Date());
    const [daysInMonth, setDaysInMonth] = useState([]);

    useEffect(() => {
        generateCalendar(date);
    }, [date]);

    const generateCalendar = (date) => {
        const year = date.getFullYear();
        const month = date.getMonth();
        const firstDay = new Date(year, month, 1);
        const lastDay = new Date(year, month + 1, 0);
        const days = [];

        days.push('Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс');

        // Корректируем количество пустых ячеек
        const emptyDaysCount = (firstDay.getDay() + 6) % 7; 
        for (let i = 0; i < emptyDaysCount; i++) {
            days.push(null);
        }

        for (let i = 1; i <= lastDay.getDate(); i++) {
            days.push(i);
        }

        setDaysInMonth(days);
    };

    const handleChange = (event) => {
        const [year, month] = event.target.value.split('-');
        setDate(new Date(year, month - 1));
    };

    return (
        <>
            <h1 className='header'>Календарик</h1>
            <div className="calend">
                <input className='input' type="month" onChange={handleChange} />
                <table>
                    <thead>
                        <tr>
                            {daysInMonth.slice(0, 7).map((day, index) => (
                                <th key={index}>{day}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {Array.from({ length: Math.ceil((daysInMonth.length - 7) / 7) }, (_, rowIndex) => (
                            <tr key={rowIndex}>
                                {daysInMonth.slice(rowIndex * 7 + 7, rowIndex * 7 + 14).map((day, index) => (
                                    <td key={index}>{typeof day === 'number' ? day : ''}</td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    );
}