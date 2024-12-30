import * as React from "react"

const BeneficiarySVG = ({ className }) => {
    const [isHovered, setIsHovered] = React.useState(false);

    return (
        <svg
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className={className}
            xmlns="http://www.w3.org/2000/svg"
            xmlSpace="preserve"
            viewBox="0 0 32 32"
        >
            <defs>
                <clipPath id="a" clipPathUnits="userSpaceOnUse">
                    <path d="M0 24h24V0H0Z" />
                </clipPath>
            </defs>
            <g clipPath="url(#a)" transform="matrix(1.33333 0 0 -1.33333 0 32)">
                <path
                    d="M0 0h-4.537c-1.654 0-3-1.346-3-3v-3h2v3a1 1 0 0 0 1 1h3.349c.264.746.67 1.423 1.188 2"
                    style={{
                        fill: isHovered ? "#FFFFFF" : "#0382c8",
                        fillOpacity: 1,
                        fillRule: "nonzero",
                        stroke: "none",
                    }}
                    transform="translate(7.537 15)"
                />
                <path
                    d="M0 0h-4.537a5.994 5.994 0 0 0 1.188-2H0a1 1 0 0 0 1-1v-3h2v3c0 1.654-1.346 3-3 3"
                    style={{
                        fill: isHovered ? "#FFFFFF" : "#0382c8",
                        fillOpacity: 1,
                        fillRule: "nonzero",
                        stroke: "none",
                    }}
                    transform="translate(21 15)"
                />
                <path
                    d="M0 0a3 3 0 1 0 6 0 3 3 0 0 0-6 0Z"
                    style={{
                        fill: "none",
                        stroke: isHovered ? "#FFFFFF" : "#0382c8",
                        strokeWidth: 2,
                        strokeLinecap: "butt",
                        strokeLinejoin: "miter",
                        strokeMiterlimit: 10,
                        strokeDasharray: "none",
                        strokeOpacity: 1,
                    }}
                    transform="translate(9 11)"
                />
                <path
                    d="M0 0v3a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V0"
                    style={{
                        fill: "none",
                        stroke: isHovered ? "#FFFFFF" : "#0382c8",
                        strokeWidth: 2,
                        strokeLinecap: "butt",
                        strokeLinejoin: "miter",
                        strokeMiterlimit: 10,
                        strokeDasharray: "none",
                        strokeOpacity: 1,
                    }}
                    transform="translate(7)"
                />
                <path
                    d="M0 0a3 3 0 1 0 6 0 3 3 0 0 0-6 0Z"
                    style={{
                        fill: "none",
                        stroke: isHovered ? "#FFFFFF" : "#0382c8",
                        strokeWidth: 2,
                        strokeLinecap: "butt",
                        strokeLinejoin: "miter",
                        strokeMiterlimit: 10,
                        strokeDasharray: "none",
                        strokeOpacity: 1,
                    }}
                    transform="translate(15 20)"
                />
                <path
                    d="M0 0a3 3 0 1 0 6 0 3 3 0 0 0-6 0Z"
                    style={{
                        fill: "none",
                        stroke: isHovered ? "#FFFFFF" : "#0382c8",
                        strokeWidth: 2,
                        strokeLinecap: "butt",
                        strokeLinejoin: "miter",
                        strokeMiterlimit: 10,
                        strokeDasharray: "none",
                        strokeOpacity: 1,
                    }}
                    transform="translate(3 20)"
                />
            </g>
        </svg>
    )
}
export default BeneficiarySVG
