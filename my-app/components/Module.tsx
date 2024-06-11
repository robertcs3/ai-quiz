"use client";
import { Button } from "@/components/ui/button";
import { Container } from "./Container";

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

    return (
        <Container variant={"narrowConstrainedPadded"}>
            <div className="min-h-[500px]">
                <div className="max-w-[1500px] mx-auto w-[90%] flex flex-col py-10">
                    {filteredModules.map((module, index) => (
                        <div key={index} className="mb-10 border-b-2">
                            <div className="flex mb-10 ">
            
                                <div>
                                    <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
                                        {module.title}
                                    </h3>
                                </div>
                            </div>
                            <div className=" pb-12">
                                
                                    {module.sections.map((section, sectionIndex) => (
                                        <p key={sectionIndex} className="leading-7 [&:not(:first-child)]:mt-6">{section}</p>
                                    ))}
                                
                            </div>
                        </div>
                    ))}
                    <div className="flex justify-center">
                        <Button className="font-bold">
                            Take the Quiz!
                        </Button>
                    </div>
                </div>
            </div>
        </Container>
    );
};

export default Module;
