// React
import { FC, useState, useEffect } from 'react';

// Types
import { APIResponse } from '@/types';

// Constants
import { DEFAULT_LOCATION } from '@/constants';

type TProps = {
    onSearch?: (data: APIResponse) => void;
}

export const LocationInput:FC<TProps> = ({
    onSearch = () => {}
}) => {
    const [value, setValue] = useState(DEFAULT_LOCATION);

    const fetchForecast = async (): Promise<void> => {
        const data = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/forecast?query=${value}`);
        const json = await data.json();
        onSearch(json.data as unknown as APIResponse)
    }

    useEffect(() => {
        fetchForecast();
    }, [])

    return (
        <div>
            <input
                value={value}
                onChange={(e) => setValue(e.currentTarget.value)}
                style={{
                    padding: 5,
                    borderTopLeftRadius: 10,
                    borderBottomLeftRadius: 10,
                    borderStyle: 'solid',
                    outline: 'none'
                }}
            />
            <button
                type="button"
                onClick={fetchForecast}
                style={{
                    padding: 5,
                    borderRadius: 0,
                    borderStyle: "solid",
                    borderTopRightRadius: 10,
                    borderBottomRightRadius: 10
                }}
            >🔍</button>
        </div>
    )
}
