import { useEffect, useRef, useState } from "react"
import Card from "../Card"

interface PropsData extends Books {}
type PropsClone = {
    quant: number | undefined
    idName: string
    removeTouchStart: boolean
    removeTouchMove: boolean
    removeTouchEnd: boolean
    handleTouch: (event: React.TouchEvent<HTMLAnchorElement>) => void
    onMouseMove: (event: React.TouchEvent<HTMLAnchorElement>) => void
    onMouseUp: (event: React.TouchEvent<HTMLAnchorElement>) => void
    loop: (event: React.TransitionEvent<HTMLAnchorElement>) => void
}

const CardsClone = ({ quant, idName, removeTouchStart, handleTouch, onMouseMove, removeTouchMove, onMouseUp, removeTouchEnd, loop }: PropsClone) => {
    const [data, setData] = useState<PropsData[]>()
    const [newClone, setNewClone] = useState<PropsData[]>()
    const hasMounted = useRef(false)

    useEffect(() => {
        if (!hasMounted.current) {
            hasMounted.current = true
            fetch('https://backend-cidadeclipse.vercel.app/public-books', {
                method: 'GET'
            }).
                then(res => {
                    if (!res.ok) {
                        throw new Error('Network response was not ok')
                    }
                    return res.text()
                })
                .then(text => {
                    try {
                        const json = JSON.parse(text);
                        setData(json);
                    } catch (error) {
                        const err = error as Error
                        throw new Error('Failed to parse JSON: ' + err.message);
                    }
                })
                .catch(err => {
                    console.error('There was a problem with the fetch operation:', err)
                })
        }
    }, [])

    useEffect(() => {
        const clones = data?.slice(0, quant)
        setNewClone(clones)
    }, [data, quant])

    return (
        <>
            {
                newClone?.map(({ id, title, link, photo, desc }) => (
                    <Card loop={loop} onMouseUp={onMouseUp} removeTouchEnd={removeTouchEnd} onMouseMove={onMouseMove} removeTouchMove={removeTouchMove} handleTouch={handleTouch} removeTouchStart={removeTouchStart} idName={idName} key={id} clone id={id} title={title} link={link} photo={photo} desc={desc} />
                ))
            }
        </>
    )
}

export default CardsClone
