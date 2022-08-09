import { useEffect, useState } from "react";
import ClientInfo from "../ClientInfo/ClientInfo";


function Basket() {
	const [myOrders, setMyOrders] = useState(
		JSON.parse(window.localStorage.getItem("myBasket")) || []
	);
    const [state, setState] = useState(0)
	const [modal, setModal] = useState(false)

    useEffect(() => {
        setMyOrders(myOrders)
		console.log(myOrders , 'useEffectda')
    },[state])

	const handleClick = (e) => {
		const targetedProduct = JSON.parse(
			e.target.parentElement.getAttribute("name")
		);

		const filterdOrders = myOrders.filter(
			(e) => e.id !== targetedProduct.id
		);
		setMyOrders(filterdOrders);
		window.localStorage.removeItem("myBasket");
		window.localStorage.setItem("myBasket", JSON.stringify(filterdOrders));
	};

	const handleOrder = (e) => {
		setModal(true)
	};

	const handleInput = (e) => {
		const newCount = e.target.value;
		const targetedProduct = JSON.parse(
			e.target.parentElement.getAttribute("name")
		);

        const changingOrderList = myOrders
		const foundOrder = myOrders.find((e) => e.id == targetedProduct.id);
		const index = myOrders.findIndex((e) => e.id == targetedProduct.id);

		foundOrder.count = newCount;

        changingOrderList.splice(index, 1, foundOrder)

		setMyOrders(changingOrderList);
		window.localStorage.removeItem("myBasket");
		window.localStorage.setItem("myBasket", JSON.stringify(changingOrderList));
        setState(state + 1)
		console.log(myOrders , ' pastda')
	};

	return (
		<>
			<div className="container">
				<div className="order-wrapperr df jc_start">
					{myOrders &&
						myOrders?.map((e, i) => (
							<div
								className="product-card"
								key={i}
								name={JSON.stringify(e)}
							>
								<img
									src={e.img_url}
									width={200}
									height={200}
									alt={e.name}
									className="product_image"
								/>
								<h3 className="card_title">{e.name}</h3>
								<input
									onChange={handleInput}
									type="number"
									defaultValue={e.count}
								/>
								<p className="card_price">
									cost: {e.price * e.count}
								</p>
								<button onClick={handleClick}>remove</button>
							</div>
						))}
				</div>
				{myOrders?.length && (
					<button onClick={handleOrder}>orderAll</button>
				)}
			</div>
			<ClientInfo modal={modal} setModal={setModal} myOrders={myOrders} setMyOrders={setMyOrders}/>
		</>
	);
}

export default Basket;
