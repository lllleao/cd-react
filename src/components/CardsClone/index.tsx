import { useEffect, useState } from "react"
import Card from "../Card"

interface PropsData extends Public_lib {}
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

    useEffect(() => {
        fetch('https://backend-cidadeclipse.vercel.app/', {
            method: 'GET'
        }).
            then(res => {
                if (!res.ok) {
                    throw new Error('Network response was not ok')
                }
                return res.json()
            })
            .then(res => {
                setData(res)
            })
            .catch(err => {
                console.error('There was a problem with the fetch operation:', err)
            })
    }, [])

    useEffect(() => {
        const clones = data?.slice(0, quant)
        setNewClone(clones)
    }, [data, quant])

    return (
        <>
            {
                newClone?.map(({ id, date, link, photo, title }) => (
                    <Card loop={loop} onMouseUp={onMouseUp} removeTouchEnd={removeTouchEnd} onMouseMove={onMouseMove} removeTouchMove={removeTouchMove} handleTouch={handleTouch} removeTouchStart={removeTouchStart} idName={idName} key={id} clone id={id} date={date} link={link} photo={photo} title={title} />
                ))
            }
        </>
    )
}

export default CardsClone
