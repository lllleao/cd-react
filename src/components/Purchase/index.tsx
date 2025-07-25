import { useEffect, useRef, useState } from 'react'
import { PurchaseContainer } from './styles'
import Card from '../Card'
import { useLazyGetStoreBooksQuery } from '../../services/api'
import Loader from '../Loader'
import {
    addItemToCache,
    getItemFromCache
} from '../../utils/localSrorageConfig'

const Purchase = () => {
    const [getStoreBooks] = useLazyGetStoreBooksQuery()
    const booksFromLocal = getItemFromCache<Books[]>('booksStore')
    const [data, setData] = useState<Books[]>()
    const [inView, setInView] = useState(false)
    const storeRef = useRef<HTMLElement>(null)

    useEffect(() => {
        function handleObserver(entries: IntersectionObserverEntry[]) {
            entries.forEach((entry) => {
                setInView(entry.isIntersecting)
            })
        }

        const purchaseObserver = new IntersectionObserver(handleObserver)

        if (storeRef.current) {
            purchaseObserver.observe(storeRef.current)
        }

        return () => {
            if (storeRef.current) {
                // eslint-disable-next-line reactHooksPlugin/exhaustive-deps
                purchaseObserver.unobserve(storeRef.current)
            }
            purchaseObserver.disconnect()
        }
    }, [])

    useEffect(() => {
        if (booksFromLocal) {
            return setData(booksFromLocal)
        }
        getStoreBooks().then((res) => {
            if (res.data) {
                console.log('fez a aq')
                addItemToCache('booksStore', res.data)
                setData(res.data)
            }
        })
        // eslint-disable-next-line reactHooksPlugin/exhaustive-deps
    }, [getStoreBooks])

    return (
        <PurchaseContainer ref={storeRef} id="purchase" className="container">
            <h2 className="purchase__title">
                Que tal aproveitar e olhar os nossos materiais físicos [e
                pagos]?
                <br />
                <br />
                [ENTREGA SOMENTE PARA FORTALEZA/CE]
            </h2>
            <span>[clique na capa para comprar]</span>
            <div
                className={`store card_container ${inView ? 'store--is-active' : ''}`}
            >
                {!data ? (
                    <Loader />
                ) : (
                    data &&
                    data.map(({ descBooks, id, photo, title, price }) => (
                        <Card
                            type
                            key={id}
                            descBooks={descBooks}
                            price={price}
                            link={`/store/${id}`}
                            photo={photo}
                            title={title}
                        />
                    ))
                )}
            </div>
        </PurchaseContainer>
    )
}

export default Purchase
