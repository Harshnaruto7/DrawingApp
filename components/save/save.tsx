import React from "react"
import { BsFillSave2Fill } from "react-icons/bs";

// typeScript so interface
interface SaveProps {
    canvasRef: React.RefObject<HTMLCanvasElement>; // Reference to the canvas
  }
  
  const Save: React.FC<SaveProps> = ({ canvasRef }) => {
    // Function to handle the saving of the canvas
    const handleSave = () => {
      if (canvasRef.current) {
        // Get the canvas data URL
        const dataURL = canvasRef.current.toDataURL("image/png");
  
        // Create a temporary link element
        const link = document.createElement("a");
        link.href = dataURL;
        link.download = "drawing.png"; // Set the default file name
  
        // Append to the body, click and remove it
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }
    };
  
    return (
      <button
        onClick={handleSave}
        className=" flex flex-col justify-center items-center p-2 rounded-md border border-black mt-4"
      >
        Save Drawing
        <BsFillSave2Fill className="flex items-center justify-center h-5 w-5" />
      </button>
    );
  };
  
  export default Save;



















