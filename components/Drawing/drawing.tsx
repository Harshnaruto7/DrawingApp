"use client"
import {useState} from "react"
import { useDraw } from "@/hooks/useDraw";
import React from "react";
import {ChromePicker} from "react-color"
import { TbBallpenFilled } from "react-icons/tb";
import { FaEraser } from "react-icons/fa";
import { IoIosColorPalette } from "react-icons/io";
import Save from "../save/save";
import { RiFileCloseFill } from "react-icons/ri";



export default function Drawing(){

  const [color, setColor] = useState<string>('#000');
    const [isEraser, setIsEraser] = useState<boolean>(false); 
    const { CanvasRef, onMouseDown, clear } = useDraw(drawLine);
    const [brushSize, setBrushSize] = useState<number>(5);
    const [eraserSize, setEraserSize] = useState<number>(10);
    const [showColorPicker, setShowColorPicker] = useState<boolean>(false);

    function drawLine({ prevPoint, currentPoint, context }: Draw) {
        const { x: currX, y: currY } = currentPoint;
        const lineColor = isEraser ? "#FFFFFF" : color;  // Set color to white if erasing
        const lineWidth = isEraser ? eraserSize : brushSize;

        const startPoint = prevPoint ?? currentPoint;
        context.beginPath();
        context.lineWidth = lineWidth;
        context.strokeStyle = lineColor;

        // Eraser mode clears with white rectangles
        if (isEraser) {
            context.clearRect(currX - lineWidth / 2, currY - lineWidth / 2, lineWidth, lineWidth); // Clear area for erasing
        } else {
            // Drawing mode - draw lines
            context.moveTo(startPoint.x, startPoint.y);
            context.lineTo(currX, currY);
            context.stroke();
            context.fillStyle = lineColor;
            context.beginPath();
            context.arc(startPoint.x, startPoint.y, 2, 0, 2 * Math.PI);
            context.fill();
        }
    }



return(
    <>
    <div className="w-screen h-screen bg-white flex justify-center items-center">
                <div className="flex flex-col gap-4 pr-4">
                    <button
                        type="button"
                        onClick={() => setShowColorPicker((prev) => !prev)}
                        className="p-2 rounded-md border border-black flex items-center gap-2"
                    >
                        <IoIosColorPalette className="h-5 w-5" />
                        {showColorPicker ? "Hide Color Picker" : "Show Color Picker"}
                    </button>

                    {showColorPicker && (
                        <div className="mt-2">
                            <ChromePicker color={color} onChange={(e) => setColor(e.hex)} />
                        </div>
                    )}

                    <button
                        type="button"
                        onClick={clear}
                        className=" flex justify-center flex-col items-center p-2 rounded-md border border-black"
                    >
                        Clear Canvas
                        <RiFileCloseFill className=" flex h-5 w-5 justify-center items-center" />
                    </button>

                    <button
                        type="button"
                        onClick={() => setIsEraser((prev) => !prev)}
                        className={`p-2 rounded-md border ${isEraser ? "bg-gray-200" : "bg-white"} border-black`}
                    >
                        {isEraser ? (
                            <>
                                <div className="flex flex-col justify-center items-center">
                                    Switch to Pen <TbBallpenFilled className="flex justify-center h-5 w-5" />
                                </div>
                            </>
                        ) : (
                            <>
                                <div className="flex flex-col justify-center items-center">
                                    Eraser <FaEraser className="flex justify-center h-5 w-5" />
                                </div>
                            </>
                        )}
                    </button>
                    
                    <Save canvasRef={CanvasRef} />

                    <label className="mt-2">
                        Brush Size: {brushSize}px
                        <input
                            type="range"
                            min="1"
                            max="20"
                            value={brushSize}
                            onChange={(e) => setBrushSize(Number(e.target.value))}
                            className="w-full"
                            disabled={isEraser}
                        />
                    </label>

                    <label className="mt-2">
                        Eraser Size: {eraserSize}px
                        <input
                            type="range"
                            min="5"
                            max="50"
                            value={eraserSize}
                            onChange={(e) => setEraserSize(Number(e.target.value))}
                            className="w-full"
                            disabled={!isEraser}
                        />
                    </label>
                </div>

                <canvas
                    ref={CanvasRef}
                    onMouseDown={onMouseDown}
                    width={600}
                    height={600}
                    className="border border-black rounded-md"
                />
            </div>
    </>
  
    
    
    
    
    
    
    
    

);


}

















