import { gql, useMutation } from "@apollo/client";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import './ClientInfo.css'

const NEW_ORDER = gql`
	mutation newOrder($product: String!, $client: String!) {
		newOrder(product: $product, client: $client) {
			id
			products
			client
			time
		}
	}
`;

function ClientInfo({modal, setModal, myOrders, setMyOrders}) {

    const navigae = useNavigate()

    console.log(myOrders)
    const [inName, setName] = useState('')
    const [inLocation, setLocation] = useState('')
    const [inPhone, setPhone] = useState('')
    const [state, setState] = useState(0)

    useEffect(() => {
        setName('')
        setLocation('')
        setPhone('')
    },[state])

    const [newOrder] = useMutation(NEW_ORDER, {
        update: (cache, data) => {
            console.log(data)
        }
    })

    const handleModal = () => setModal(false)

    const handleSubmit = e => {
        e.preventDefault()

        const {name, location, phone} = e.target


        let products = ''
        const clientInfo = name.value + ' ' + location.value + ' ' + phone.value
        
        if(myOrders?.length) {
            for (const i of myOrders) {
                const text = i.name + ' - ' + i.count + ' ta'
                products = products + text + ';'
            }

            newOrder({
                variables: {
                    product: products,
                    client: clientInfo
                }
            })
        } 
        e.target.reset()
        setModal(false)
        setState(state + 1)
        setMyOrders([])
        window.localStorage.removeItem("myBasket")
        setName('')
        setLocation('')
        setPhone('')
        setState(state + 1)
        navigae('/Home')
    }

    return <>
        <div className={`container modal ${modal && 'modal--open'}`} onClick={e => e.target.matches('.modal') && setModal(false)}>
            <form action="" onSubmit={handleSubmit} className="modal-form">
                <input defaultValue={inName} required={true} type="text" name="name" placeholder="name" />
                <input defaultValue={inLocation} required={true} type="text" name="location" placeholder="location" />
                <input defaultValue={inPhone} required={true} type="number" name="phone" placeholder="phone number" />
                <button type="submit">Order</button>

                <div className="exit" onClick={handleModal}>x</div>
            </form>
        </div>
    </>
}

export default ClientInfo