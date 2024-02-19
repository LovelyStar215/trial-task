"use client"

import Header from "@/components/header.component";
import { AdvancedChart } from 'react-tradingview-embed';

export default async function BonusPage() {

    return (
        <div className="relative h-[100vh] grid">
            <img src="/img/login-bg.png" alt="image" className="absolute w-full h-full object-cover object-center blur-md" />
            <div className="pt-20">
                <AdvancedChart widgetProps={{ height: "785px" }} />
            </div>
            <Header />
        </div>
    );
}
