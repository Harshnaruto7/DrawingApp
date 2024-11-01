"use client"
import { useEffect, useRef, useState } from "react"


export const useDraw = (onDraw:({context,currentPoint,prevPoint}: Draw) => void) =>{
   
     const [mousDown,setMouseDown] =useState(false)

    const CanvasRef = useRef<HTMLCanvasElement>(null)
    const prevPoint = useRef<null | Point>(null) 

    const onMouseDown = () => setMouseDown(true)

    const clear = () => {
     const canvas =  CanvasRef.current
     
     if(!canvas) return

     const context = canvas.getContext('2d')

     if (!context) return

     context.clearRect(0,0,canvas.width,canvas.height)


    }
  
    useEffect(()=>{

        const handler = (e:MouseEvent) =>{
          
            if(!mousDown) return
            
            console.log({x:e.clientX , y:e.clientY});
            
            

            const currentPoint = computePointInCanvas(e)

            const context = CanvasRef.current?.getContext('2d')
            if(!context || !currentPoint) return;
           
            onDraw({context,currentPoint,prevPoint : prevPoint.current })
            prevPoint.current = currentPoint

        }

        const computePointInCanvas = (e:MouseEvent) =>{
            const canvas = CanvasRef.current
            if(!canvas) return

            const  rect = canvas.getBoundingClientRect();

            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

             return{x,y}
        }


       const mouseUpHandler = () => {
        setMouseDown(false)
        prevPoint.current = null
       }


        //  Adding event lister
        CanvasRef.current?.addEventListener('mousemove', handler)
        window.addEventListener('mouseup',mouseUpHandler)

        // removing event lister
        return  () => {
            CanvasRef.current?.removeEventListener('mousemove', handler)
            window.removeEventListener('mouseup',mouseUpHandler)
        } 
  }, [onDraw])







 
  return {CanvasRef,onMouseDown,clear}



}