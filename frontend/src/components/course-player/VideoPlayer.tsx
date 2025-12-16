"use client";

import { Play, Pause, Volume2, Maximize2, SkipBack, SkipForward } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { useState } from "react";

export function VideoPlayer() {
    const [isPlaying, setIsPlaying] = useState(false);
    const [progress, setProgress] = useState(35);

    return (
        <div className="relative aspect-video bg-black rounded-lg overflow-hidden group">
            {/* Placeholder for actual video */}
            <div className="absolute inset-0 flex items-center justify-center bg-zinc-900 text-white">
                <span className="text-zinc-500">Video Player Placeholder</span>
            </div>

            {/* Big Play Button Overlay */}
            {!isPlaying && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/40 cursor-pointer" onClick={() => setIsPlaying(true)}>
                    <div className="h-16 w-16 bg-primary/90 rounded-full flex items-center justify-center pl-1 hover:bg-primary transition-colors hover:scale-105 transform duration-200">
                        <Play className="h-8 w-8 text-white fill-current" />
                    </div>
                </div>
            )}

            {/* Controls Bar */}
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4 opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="mb-2">
                    <Slider value={[progress]} max={100} step={1} className="cursor-pointer" />
                </div>
                <div className="flex items-center justify-between text-white">
                    <div className="flex items-center gap-2">
                        <Button variant="ghost" size="icon" className="text-white hover:bg-white/20 h-8 w-8" onClick={() => setIsPlaying(!isPlaying)}>
                            {isPlaying ? <Pause className="h-4 w-4 fill-current" /> : <Play className="h-4 w-4 fill-current" />}
                        </Button>
                        <Button variant="ghost" size="icon" className="text-white hover:bg-white/20 h-8 w-8">
                            <SkipBack className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="text-white hover:bg-white/20 h-8 w-8">
                            <SkipForward className="h-4 w-4" />
                        </Button>
                        <div className="flex items-center gap-2 ml-2 group/vol">
                            <Volume2 className="h-4 w-4" />
                            <div className="w-0 overflow-hidden group-hover/vol:w-20 transition-all">
                                <Slider defaultValue={[80]} max={100} className="w-20" />
                            </div>
                        </div>
                        <span className="text-xs ml-2">04:32 / 12:45</span>
                    </div>
                    <div>
                        <Button variant="ghost" size="icon" className="text-white hover:bg-white/20 h-8 w-8">
                            <Maximize2 className="h-4 w-4" />
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}
