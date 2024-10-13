import { useEffect, useRef, useState } from "react"
import { PurchaseContainer } from "./styles"
import Card from "../Card"

const Purchase = () => {
    const [data, setData] = useState<Books[]>()
    const [inView, setInView] = useState(false)
    const storeRef = useRef<HTMLElement>(null)

    useEffect(() => {
        function handleObserver(entries: IntersectionObserverEntry[]) {

            entries.forEach(entry => {
                setInView(entry.isIntersecting)
        })
        }

        const purchaseObserver = new IntersectionObserver(handleObserver)

        if (storeRef.current) {
            purchaseObserver.observe(storeRef.current)
        }

        return () => {
            if (storeRef.current) {
                purchaseObserver.unobserve(storeRef.current)
            }
            purchaseObserver.disconnect()
        }
    }, [])

    useEffect(() => {
        fetch('http://localhost:9001/store-books', {
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
    }, [])

    return (
        <PurchaseContainer ref={storeRef} id="purchase" className="container">
            <h2 className="purchase__title">Que tal aproveitar e olhar os nossos materiais físicos [e pagos]?</h2>
            <span>[clique na capa para comprar]</span>
            <div className={`store card_container ${inView ? 'store--is-active' : ''}`}>
                {
                    data && data.map(({desc, id, link, photo, title}) => (
                        <Card type key={id} desc={desc} link={`/store-books/${id}`} photo={photo} title={title} />
                    ))
                }
            </div>
        </PurchaseContainer>
    )
}

export default Purchase
