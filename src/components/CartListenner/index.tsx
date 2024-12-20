import { useEffect } from 'react'
import { useGetItemsCartQuery } from '../../services/api'

const CartListenner = () => {
    const { refetch } = useGetItemsCartQuery()

    const channelName = 'cart_channel'
    useEffect(() => {
        const channel = new BroadcastChannel(channelName)

        channel.onmessage = (event) => {
            if (event.data.type === 'UPDATE_COUNT') {
                setTimeout(refetch, 1000)
            }
        }

        return () => {
            // eslint-disable-next-line @typescript-eslint/no-unused-expressions
            channel.close
        }
    }, [refetch])
    return null
}

export default CartListenner
