"use client";

import { useState } from "react";

export default function ProductTabs() {
    const [activeTab, setActiveTab] = useState("description");

    return (
        <div className="mb-20">
            {/* Tabs Header */}
            <div className="flex border-b border-gray-200 mb-8">
                {["description", "shipping", "reviews"].map((tab) => (
                    <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={`mr-8 pb-4 text-sm font-medium uppercase tracking-wide transition-colors ${activeTab === tab
                                ? "border-b-2 border-black text-black"
                                : "text-gray-400 hover:text-gray-600"
                            }`}
                    >
                        {tab}
                    </button>
                ))}
            </div>

            {/* Tabs Content */}
            <div className="text-gray-600 leading-relaxed text-sm">
                {activeTab === "description" && (
                    <div className="space-y-4">
                        <p>
                            Nam tempus turpis at metus scelerisque placerat nulla deumantos solicitud felis. Pellentesque diam dolor, elementum etos lobortis des mollis ut risus. Sedcus faucibus an sullamcorper mattis drostique des commodo pharetras loremos.Donec pretium egestas sapien et mollis.
                        </p>
                        <h4 className="font-serif text-black text-lg mt-4">Lorem ipsum dolor sit amet</h4>
                        <p>
                            Sonsectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                        </p>
                    </div>
                )}
                {activeTab === "shipping" && (
                    <p>Shipping information goes here.</p>
                )}
                {activeTab === "reviews" && (
                    <p>Customer reviews go here.</p>
                )}
            </div>
        </div>
    );
}
