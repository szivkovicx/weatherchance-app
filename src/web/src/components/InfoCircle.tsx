// React
import { FC } from "react"

// Types
import { APIResponse } from "@/types"

type TProps = {
    data: APIResponse;
}

export const InfoCircle:FC<TProps> = ({
    data
}) => {
    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
        }}>
            <h1>
                🏙 {data.meta.name}, {data.meta.country}
            </h1>
            <div style={{
                marginTop: -25,
                marginLeft: 50
            }}>
                <p>
                    🏘️ <b>{data.meta.region}</b>
                </p>
                <p>
                    🧭 Lat: <b>{data.meta.lat}</b> 🧭 Lon: <b>{data.meta.lon}</b>
                </p>
                <p>
                    ⏰ <b>{data.meta.localtime}</b>
                </p>
            </div>
            <p style={{ textAlign: 'center' }}>Weather forecast for tomorrow</p>
            <div style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'center',
                gap: 20,
                marginTop: -20
            }}>
                {data.forecast.length == 1 ? (
                    <>
                        <h1>
                            🌧 100%
                        </h1>
                        <h1>
                            ☀️ {data.forecast[0]}%
                        </h1>
                    </>
                ) : (
                    <>
                        <h1>
                            🌧 {data.forecast[0]}%
                        </h1>
                        <h1>
                            ☀️ {data.forecast[1]}%
                        </h1>
                    </>
                )}
            </div>
        </div>
    )
}
