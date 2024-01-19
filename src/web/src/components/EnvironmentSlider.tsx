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
    const percentageA = data.forecast.length == 1 ? 0 : data.forecast[0];
    const percentageB = data.forecast.length == 1 ? 100 : 100 - percentageA;

    console.log(percentageA, percentageB)

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
                    background: "url(https://www.clipstudio.net/wp-content/uploads/2020/06/0134_019.jpg)",
                    backgroundRepeat: 'no-repeat',
                    backgroundSize: 'auto',
                    backgroundPosition: 'center',
                    borderRadius: 20,
                    borderTopRightRadius: percentageA == 100 ? 20 : 0,
                    borderBottomRightRadius: percentageA == 100 ? 20 : 0,
                    height: 150,
                    width: (percentageA / 100) * 400
                }}
            />
            <div
                style={{
                    background: "url(https://www.clipstudio.net/wp-content/uploads/2020/06/0134_004.jpg)",
                    backgroundRepeat: 'no-repeat',
                    backgroundSize: 'auto',
                    backgroundPosition: 'center',
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
