"use client";
import { useState, useEffect } from "react";

interface ModuleProps {
    modules: {
        title: string;
        summary: string;
        sections: string[];
        moduleId: string;
    }[];
    selectedModuleId: string;
}

const Module = ({ modules, selectedModuleId }: ModuleProps) => {
    const filteredModules = modules.filter(
        (m) => m.moduleId === selectedModuleId
    );

    const [activeModule, setActiveModule] = useState(0);

    const { title, summary, sections, moduleId } =
        filteredModules[activeModule];

    const nextModule = () => {
        if (activeModule !== filteredModules.length - 1){
            setActiveModule((prev) => prev + 1);
        }
    };

    return (
        <div className="min-h-[500px]">
            <div className="max-w-[1500px] mx-auto w-[90%] flex justify-center py-10 flex-col">
                <div className="flex justify-between mb-10 items-center">
                    <div className="bg-primary text-white px-4 rounded-md py-1">
                        <h2>
                            Threat: {activeModule + 1}
                            <span>/{filteredModules.length}</span>
                        </h2>
                    </div>

                    <div>
                        <h3 className="mb-5 text-2xl font-bold">
                            {title}
                        </h3>
                    </div>
                </div>
                <div>
                    <p>{summary}</p>
                    <ul>
                        {sections.map((section, index) => (
                            <li key={index}>{section}</li>
                        ))}
                    </ul>
                </div>
                <button onClick={nextModule} className="font-bold">
                    {activeModule === filteredModules.length -1
                    ? "Take the Quiz!"
                    : "Next Module →"}
                </button>
            </div>
        </div>
    );
};

export default Module;
