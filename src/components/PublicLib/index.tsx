import { useEffect, useRef, useState } from "react"
import Card from "../Card"
import { Carrossel, PublicLibContainer } from "./styles"
import CardsClone from "../CardsClone"

type StateProps = {
    startPoint: number
    positionSaved: number
    currentPoint: number
    moviment: number
    indexCurrent: number
    positionSavedBefore: number
    positionSavedAfter: number
    positionSavedTotal: number
}

const state: StateProps = {
    startPoint: 0,
    positionSaved: 0,
    currentPoint: 0,
    moviment: 0,
    indexCurrent: 0,
    positionSavedBefore: 0,
    positionSavedAfter: 0,
    positionSavedTotal: 0,
}
let count = 0
let testLoop: boolean

const PublicLib = () => {
    const [data, setData] = useState<Books[]>()
    const carrousselRef = useRef<HTMLDivElement>(null)
    const hasMounted = useRef(false)
    const hasMountedFetch = useRef(false)

    const [removeTouchStart, setRemoveTouchStart] = useState(false)
    const [removeTouchEnd, setRemoveTouchEnd] = useState(true)
    const [removeTouchMove, setRemoveTouchMove] = useState(true)

    const [carrousselItems, setCarrousselItems] = useState<NodeListOf<Element> | null>(null)
    const [items, setItems] = useState<Element[]>()
    const [mainLib, setMainLib] = useState<number>()
    const mainLibElement = useRef(null)
    const [clonedMainLibLeft, setClonedMainLibLeft] = useState<number>()
    const [clonedMainRight, setClonedMainRight] = useState<number>()
    const [elementWidth, setElementWidth] = useState<number>()

    useEffect(() => {
        const handleResizer = (entries: ResizeObserverEntry[]) => {
            const currentWidth = entries[0].borderBoxSize[0].inlineSize
            if (currentWidth > 706 && carrousselItems) {
                setRemoveTouchStart(true)
                setRemoveTouchEnd(true)
                setRemoveTouchMove(true)
                carrousselItems.forEach(item => {
                    (item as HTMLElement).style.cssText = `transform: none;`
                })
            } else if (carrousselItems) {
                setElementWidth(carrousselItems[0].clientWidth)
                setRemoveTouchStart(false)
                setRemoveTouchEnd(false)
                setRemoveTouchMove(false)
            }
        }

        const resizerObserver = new ResizeObserver(handleResizer)

        if (mainLibElement.current) {
            resizerObserver.observe(mainLibElement.current)
        }

        return () => {
            if (mainLibElement.current) {
                resizerObserver.unobserve(mainLibElement.current)
            }
            resizerObserver.disconnect()
        }
    }, [carrousselItems])

    useEffect(() => {
        if (carrousselRef.current && data && !hasMounted.current) {
            hasMounted.current = true
            const carrousselInner = carrousselRef.current.querySelectorAll('.card_lib')
            setCarrousselItems(carrousselRef.current.querySelectorAll('.card_lib'))
            const itemsInner = [...carrousselInner]
            setItems(itemsInner)
            setMainLib(itemsInner.indexOf(carrousselRef.current.querySelector('#main') as Element))
            setClonedMainLibLeft(itemsInner.indexOf(carrousselRef.current.querySelector('#main_cloned_left') as Element))
            setClonedMainRight(itemsInner.indexOf(carrousselRef.current.querySelector('#main_cloned_right') as Element))
        }
    }, [data])

    function handleTouch(event: React.TouchEvent<HTMLAnchorElement>) {
        if (carrousselItems) {
            const index = items?.indexOf(event.currentTarget as Element)

            touchMoves(event, index as number)

        }

    }

    function touchMoves(e: React.TouchEvent<HTMLAnchorElement>, index: number) {
        state.indexCurrent = index

        if (index === clonedMainRight || index === clonedMainLibLeft) {
            setRemoveTouchMove(true)
            setRemoveTouchEnd(true)
        } else {
            state.startPoint = e.targetTouches[0].clientX

            state.currentPoint = state.startPoint - state.positionSaved
            state.positionSavedBefore = state.positionSaved

            setRemoveTouchEnd(true)
            setRemoveTouchMove(false)
        }
    }

    function onMouseMove(e: React.TouchEvent<HTMLAnchorElement>) {
        state.moviment = e.targetTouches[0].clientX - state.currentPoint
        state.positionSaved = state.moviment

        carrousselItems?.forEach((item) => {
            (item as HTMLElement).style.cssText = `transform: translateX(${state.moviment}px);`
            setRemoveTouchEnd(false)
        })
    }

    function onMouseUp() {
        state.positionSavedAfter = state.moviment
        state.positionSavedTotal = state.positionSavedAfter - state.positionSavedBefore

        if (elementWidth && mainLib && clonedMainLibLeft) {
            if (state.positionSavedTotal < -100) {
                count = countTheElementsToPass() ? 1 : count + 1
                const position = count * (elementWidth + 16)
                setTranslate(-position)

            } else if (state.positionSavedTotal > 100) {
                count = countTheElementsToPass() ? -1 : count - 1
                const position = count * (elementWidth + 16)
                setTranslate(-position)
            } else {
                // count = count === 4
                const position = (state.indexCurrent - mainLib) * (elementWidth + 16) // talvez o erro seja aqui
                setTranslate(-position)
            }

            testLoop = state.positionSaved === ((elementWidth + 16) * (mainLib - clonedMainLibLeft)) || state.positionSaved === ((elementWidth + 16) * (clonedMainLibLeft - mainLib))
        }
    }

    function countTheElementsToPass() {
        const resetCountTest = state.indexCurrent === mainLib || state.indexCurrent === clonedMainLibLeft || state.indexCurrent === clonedMainRight

        return resetCountTest
    }

    function setTranslate(position: number) {

        carrousselItems?.forEach(item => {
            (item as HTMLElement).style.cssText = `transform: translateX(${position}px);`;

            (item as HTMLElement).style.transition = 'transform 0.3s'
        })

        state.positionSaved = position
    }

    const loop = (e: React.TransitionEvent<HTMLAnchorElement>) => {
        const element = e.currentTarget as HTMLElement
        if (testLoop) {

            element.style.cssText = `transform: translateX(${0}px);`
            element.style.transition = 'none'

            for (let states in state) {
                state[states as keyof StateProps] = 0
            }
        }
    }

    useEffect(() => {
        if (!hasMountedFetch.current) {
            hasMountedFetch.current = true
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
                        const json = JSON.parse(text)
                        setData(json)
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
    return (
        <PublicLibContainer ref={mainLibElement} id="public-lb" className="public-lb container">
            <h2 className="public-lb__title">TARTARU'S COFFE SHOPEE</h2>
            <p className="public-lb__desc">
                Em uma cidade escondida de tudo há uma cafeteria exótica na
                beira de uma fenda, uma fenda tão profunda que pode até mostrar
                o rio Tártaro do Hades. Esta cafeteria é a Tartaru's Coffee
                Shop, localizada na Cidade Eclipse.
                <br />
                <br />
                Entre, dê uma espiada nas nossas profundezas - mas não proteja
                os olhos, hein!
            </p>
            <div className="cursor">
                <span className="mask-left"></span>
                <span className="mask-right"></span>
                <Carrossel ref={carrousselRef} className="card_container carroussel">
                    <CardsClone loop={loop} removeTouchEnd={removeTouchEnd} onMouseUp={onMouseUp} onMouseMove={onMouseMove} removeTouchMove={removeTouchMove} handleTouch={handleTouch} removeTouchStart={removeTouchStart} idName="main_cloned_left" quant={data?.length} />
                    {
                        data && data.map(({ title, id, link, photo, desc }) => (
                            <Card loop={loop} onMouseUp={onMouseUp} removeTouchEnd={removeTouchEnd} onMouseMove={onMouseMove} removeTouchMove={removeTouchMove} handleTouch={handleTouch} removeTouchStart={removeTouchStart} idName="main" title={title} id={id} link={link}
                                photo={photo} desc={desc} key={id} />
                        ))
                    }
                    <CardsClone loop={loop} removeTouchEnd={removeTouchEnd} onMouseUp={onMouseUp} onMouseMove={onMouseMove} removeTouchMove={removeTouchMove} handleTouch={handleTouch} removeTouchStart={removeTouchStart} idName="main_cloned_right" quant={3} />
                </Carrossel>
            </div>
        </PublicLibContainer>
    )
}

export default PublicLib
