import { useEffect } from 'react'
<<<<<<< HEAD
import { useGetItemsCartQuery } from '../../services/api'

const CartListenner = () => {
    const csrfToken = localStorage.getItem('csrfToken') as string

    const { refetch } = useGetItemsCartQuery(csrfToken)
=======
import { useLazyGetItemsCartQuery } from '../../services/api'
import { useCsrfTokenStore } from '../../hooks/useFetchCsrfToken'

const CartListenner = () => {
    const csrfToken = useCsrfTokenStore((state) => state.csrfToken) as string

    const [getDataItem] = useLazyGetItemsCartQuery()
>>>>>>> 94a51dc (Pc sabrina)

    const channelName = 'cart_channel'
    useEffect(() => {
        const channel = new BroadcastChannel(channelName)

        channel.onmessage = (event) => {
<<<<<<< HEAD
            if (event.data.type === 'UPDATE_COUNT') {
                setTimeout(refetch, 1000)
=======
            if (event.data.type === 'UPDATE_COUNT' && csrfToken) {
                setTimeout(() => getDataItem(csrfToken), 1000)
>>>>>>> 94a51dc (Pc sabrina)
            }
        }

        return () => {
            // eslint-disable-next-line @typescript-eslint/no-unused-expressions
            channel.close
        }
<<<<<<< HEAD
    }, [refetch])
=======
    }, [csrfToken, getDataItem])
>>>>>>> 94a51dc (Pc sabrina)
    return null
}

export default CartListenner
