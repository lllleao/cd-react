import { useNavigate, useParams } from 'react-router-dom'
import { AboutBook, BookImg, BooksPurchase } from './styles'
import { useEffect, useState } from 'react'
import ButtonPurchase from '../ButtonPurchase'
import {
    useAddToCartMutation,
    useGetSpecificStoreBookQuery,
    useLazyGetStoreBooksQuery,
    useLazyGetItemsCartQuery,
    useRefreshTokenMutation
} from '../../services/api'
import Card from '../Card'
import Loader from '../Loader'
import { useCsrfTokenStore } from '../../hooks/useFetchCsrfToken'
import { isErrorMessageExist } from '../../utils'
import { getItemFromCache } from '../../utils/localSrorageConfig'

let isSeeMore: boolean = false

type BookParams = {
    id: string
}
const Book = () => {
    const csrfToken = useCsrfTokenStore((state) => state.csrfToken) as string

    const setViweNumberCart = useCsrfTokenStore(
        (state) => state.setViweNumberCart
    )
    const channelName = 'cart_channel'
    const [addToCart] = useAddToCartMutation()
    const [getDataItem] = useLazyGetItemsCartQuery()
    const navigate = useNavigate()
    const [valueQuant, setValueQuant] = useState('1')
    const [addCartLoader, setAddCartLoader] = useState(false)
    const [buttonMessage, setButtonMessage] = useState('Adicionar ao carrinho')
    const [priceCalc, setPriceCalc] = useState(10)
    const [textIsHidden, setTextIsHidden] = useState(true)
    const [isItemAdd, setIsItemAdd] = useState(false)
    const { id } = useParams() as BookParams

    const booksFromLocal = getItemFromCache<Books[]>('booksStore')
    const specificBook = getItemFromCache<Books[]>('booksStore')

    const [booksStore, setBooksStore] = useState<Books[]>()
    const [data, setData] = useState<BooksPurchase>()
    // const { data, isFetching } = useGetSpecificStoreBookQuery(id)
    const [ getStoreBooks ] = useLazyGetStoreBooksQuery()

    const [getRefresh] = useRefreshTokenMutation()

    const only212Characters = () => {
        const appear = data?.summary.slice(0, 212)
        const allText = data?.summary
        const lengthCheck = data?.summary.length || 0

        if (lengthCheck > 212 && textIsHidden) {
            isSeeMore = true
            return appear + '...'
        } else {
            return allText
        }
    }

    const handleChangeOption = (
        element: React.ChangeEvent<HTMLSelectElement>
    ) => {
        const quant = element.target.value
        setValueQuant(quant)
        const currentValue = data && data.price * Number(quant)
        setPriceCalc(currentValue as number)

        return currentValue
    }

    const handleAddToCart = () => {
        if (data) {
            setAddCartLoader(true)
            const channel = new BroadcastChannel(channelName)
            channel.postMessage({ type: 'UPDATE_COUNT', value: 'opa' })
            channel.close()
            if (csrfToken) {
                setTimeout(() => getDataItem(csrfToken), 1000)
            }
            addToCart({
                items: [
                    {
                        photo: data.photo,
                        price: priceCalc,
                        quant: Number(valueQuant),
                        name: data.title
                    }
                ],
                csrfToken
            })
                .then((res) => {
                    if (isErrorMessageExist(res)) {
                        const message = res.error.data.message as string

                        switch (message) {
                            case 'Token expirado':
                                return getRefresh(csrfToken).then(
                                    (response) => {
                                        if (response.error) {
                                            setAddCartLoader(false)

                                            return navigate('/login')
                                        }

                                        addToCart({
                                            items: [
                                                {
                                                    photo: data.photo,
                                                    price: priceCalc,
                                                    quant: Number(valueQuant),
                                                    name: data.title
                                                }
                                            ],
                                            csrfToken
                                        }).then((resAddTo) => {
                                            if (isErrorMessageExist(resAddTo)) {
                                                if (
                                                    resAddTo.error.data
                                                        .message ===
                                                    'Item já existe'
                                                ) {
                                                    setAddCartLoader(false)

                                                    setIsItemAdd(true)
                                                    setTimeout(() => {
                                                        setIsItemAdd(false)
                                                    }, 3000)
                                                    return res.data
                                                }
                                            }
                                            setViweNumberCart(true)
                                            setButtonMessage('Item adicionado')
                                            setTimeout(
                                                () =>
                                                    setButtonMessage(
                                                        'Adicionar ao carrinho'
                                                    ),
                                                3000
                                            )
                                            setAddCartLoader(false)
                                        })
                                    }
                                )
                            case 'Item já existe':
                                setAddCartLoader(false)

                                setIsItemAdd(true)
                                setTimeout(() => {
                                    setIsItemAdd(false)
                                }, 3000)
                                return res.data
                            default:
                                setAddCartLoader(false)

                                return navigate('/login')
                        }
                    }
                    setViweNumberCart(true)
                    setButtonMessage('Item adicionado')
                    setTimeout(
                        () => setButtonMessage('Adicionar ao carrinho'),
                        3000
                    )
                    setAddCartLoader(false)
                })
                .catch((err) => console.error(err))
        }
    }

    useEffect(() => {
        if (booksFromLocal) {
            return setBooksStore(booksFromLocal)
        }
        getStoreBooks()
    // eslint-disable-next-line reactHooksPlugin/exhaustive-deps
    }, [getStoreBooks])

    useEffect(() => {
        if (booksFromLocal) {
            const bookToThisPage = booksFromLocal.find((bookArray) => bookArray.id === Number(id))
            console.log(bookToThisPage)
        }
    }, [booksFromLocal, id])

    return (
        <BooksPurchase $isFeching={false}>
            <div className="container">
                <div className="book">
                    <BookImg>
                        <img src={data?.photo} alt="" />
                        <p className="price-container">
                            <span className="price">[ R$ {priceCalc},00 ]</span>
                            <select
                                onChange={(e) => handleChangeOption(e)}
                                className="quant"
                                name="quant"
                                value={valueQuant}
                            >
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                            </select>
                        </p>
                    </BookImg>
                    <AboutBook $isSeeMore={isSeeMore}>
                        <h3>{data?.title}</h3>
                        <p className="sinopse">
                            <span className="sinopse-title">Sinopse: </span>
                            <span className="sinopse__view">
                                <span className="sinopse__view__all">
                                    {data?.summary}
                                </span>
                                <span className="sinopse__view__part">
                                    <span className="sinopse__view__first">
                                        {only212Characters()}
                                    </span>
                                    <span className="sinopse__view__second"></span>
                                    {textIsHidden ? (
                                        <span
                                            onClick={() =>
                                                setTextIsHidden(false)
                                            }
                                            className="see-more"
                                        >
                                            [Ver mais]
                                        </span>
                                    ) : (
                                        <span
                                            onClick={() =>
                                                setTextIsHidden(true)
                                            }
                                            className="see-more"
                                        >
                                            [Ver menos]
                                        </span>
                                    )}
                                </span>
                            </span>
                        </p>
                        <div className="others-informations">
                            <ul>
                                {data?.isbn && (
                                    <li>
                                        <span className="sinopse-title">
                                            ISBN:{' '}
                                        </span>
                                        {data.isbn}
                                    </li>
                                )}
                                <li>
                                    <span className="sinopse-title">
                                        Tamanho:{' '}
                                    </span>{' '}
                                    {data?.width}
                                </li>
                                <li>
                                    <span className="sinopse-title">
                                        Número de Páginas:{' '}
                                    </span>{' '}
                                    {data?.pageQuant}
                                </li>
                                {data?.store_books_credits.map((item) => (
                                    <li key={item.person}>
                                        <span className="sinopse-title">
                                            {item.type}:{' '}
                                        </span>
                                        {item.person}
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className="tags">{data?.tags}</div>
                    </AboutBook>
                </div>
                <div className="buttons">
                    <ButtonPurchase
                        isItemAdd={isItemAdd}
                        addToCart={handleAddToCart}
                    >
                        {isItemAdd ? 'Item já adicionado' : buttonMessage}
                    </ButtonPurchase>
                    {addCartLoader ? <Loader isCircle /> : <></>}
                </div>
                <div className="cards-store-container">
                    {!booksStore ? (
                        <Loader />
                    ) : (
                        booksStore &&
                        booksStore.map(
                            ({ descBooks, id, photo, title, price }) => (
                                <Card
                                    type
                                    key={id}
                                    descBooks={descBooks}
                                    price={price}
                                    link={`/store/${id}`}
                                    photo={photo}
                                    title={title}
                                />
                            )
                        )
                    )}
                </div>
            </div>
        </BooksPurchase>
    )
}

export default Book
