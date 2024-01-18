// React
import { FC } from "react";

// Types
import { APIResponse } from "@/types";

type TProps = {
    data: APIResponse;
}

export const EnvironmentSlider: FC<TProps> = ({
    data
}) => {
    const percentageA = data.forecast[0];
    const percentageB = 100 - percentageA;

    return (
        <div
            style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'center',
                gap: 5
            }}
        >
            <div style={{
                    background: `url(${data.forecast.length == 1 ? "https://www.clipstudio.net/wp-content/uploads/2020/06/0134_004.jpg" : "https://www.clipstudio.net/wp-content/uploads/2020/06/0134_019.jpg)"}`,
                    backgroundRepeat: 'no-repeat',
                    backgroundSize: '500px 250px',
                    backgroundPosition: '-40px -20px',
                    borderRadius: 20,
                    borderTopRightRadius: percentageA == 100 ? 20 : 0,
                    borderBottomRightRadius: percentageA == 100 ? 20 : 0,
                    height: 150,
                    width: (percentageA / 100) * 400
                }}
            />
            <div
                style={{
                    background: `url(${data.forecast.length == 1 ? "https://www.clipstudio.net/wp-content/uploads/2020/06/0134_019.jpg" : "https://www.clipstudio.net/wp-content/uploads/2020/06/0134_004.jpg"})`,
                    backgroundRepeat: 'no-repeat',
                    backgroundSize: '500px 250px',
                    backgroundPosition: '-40px -20px',
                    borderRadius: 20,
                    borderTopLeftRadius: percentageB == 100 ? 20 : 0,
                    borderBottomLeftRadius: percentageB == 100 ? 20 : 0,
                    height: 150,
                    width: (percentageB / 100) * 400
                }}
            />
        </div>
    )
}
