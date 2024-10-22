
import React from 'react';
import Svg, { Path, Rect, G } from 'react-native-svg';
import Svg1 from "../../assets/light/logo/logo_t1.svg";
import Svg2 from "../../assets/light/logo/logo_t2.svg";
import Svg3 from "../../assets/light/logo/logo_t3.svg";
import Svg4 from "../../assets/light/logo/logo_t4.svg";
import DarkSvg1 from "../../assets/dark/logo/logo_t1.svg";
import DarkSvg2 from "../../assets/dark/logo/logo_t2.svg";
import DarkSvg3 from "../../assets/dark/logo/logo_t3.svg";
import DarkSvg4 from "../../assets/dark/logo/logo_t4.svg";

// Create separate components for each SVG
export const Logo1 = ({ color }: { color: string }) => (
    <Svg width="250" height="250" viewBox="0 0 250 250">
        {/* Replace with your actual SVG paths from logo_t1.svg */}
        <Path d="M50 50 L200 50 L200 200 L50 200 Z" stroke={color} fill="none" />
    </Svg>
);

export const Logo2 = ({ color }: { color: string }) => (
    <Svg width="250" height="250" viewBox="0 0 250 250">
        {/* Replace with your actual SVG paths from logo_t2.svg */}
        <Path d="M50 125 C50 75, 200 75, 200 125" stroke={color} fill="none" />
    </Svg>
);

export const Logo3 = ({ color }: { color: string }) => (
    <Svg width="250" height="250" viewBox="0 0 250 250">
        {/* Replace with your actual SVG paths from logo_t3.svg */}
        <Path d="M50 125 L200 125" stroke={color} fill="none" />
    </Svg>
);

export const Logo4 = ({ color }: { color: string }) => (
    <Svg width="250" height="250" viewBox="0 0 250 250">
        {/* Replace with your actual SVG paths from logo_t4.svg */}
        <Path d="M125 50 L125 200" stroke={color} fill="none" />
    </Svg>
);
