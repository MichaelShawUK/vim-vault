export default function Logo({ size = 60 }) {
    return (
        <svg
            width={size}
            height={size}
            version="1.1"
            xmlns="http://www.w3.org/2000/svg">
            <defs>
                <linearGradient
                    id="Gradient"
                    x1="0"
                    x2="1"
                    y1="0"
                    y2="1">
                    <stop
                        offset="0%"
                        stopColor="#1D56CB"
                    />
                    <stop
                        offset="50%"
                        stopColor="#197A8F"
                        stopOpacity="0.9"
                    />
                    <stop
                        offset="100%"
                        stopColor="#17995B"
                    />
                </linearGradient>
            </defs>

            <rect
                x="0"
                y="0"
                rx={size / 5}
                ry={size / 5}
                width={size}
                height={size}
                fill="url(#Gradient)"
            />
        </svg>
    );
}
