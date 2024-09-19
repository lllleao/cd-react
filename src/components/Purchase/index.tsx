import { useEffect, useState } from "react"
import { PurchaseContainer } from "./styles"
import { useInView } from "react-intersection-observer"
import Card from "../Card"

const Purchase = () => {
    const {ref: storeRef, inView} = useInView({threshold: 0.2})
    const [data, setData] = useState<Books[]>()

    useEffect(() => {
        fetch('https://backend-cidadeclipse.vercel.app/', {
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
                    setData(json.storeBooksDate)
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
                        <Card type key={id} desc={desc} link={link} photo={photo} title={title} />
                    ))
                }
            </div>
        </PurchaseContainer>
    )
}

export default Purchase
