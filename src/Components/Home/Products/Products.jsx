import { gql, useMutation, useQuery } from "@apollo/client";
import { useEffect, useState } from "react";
import { Routes, Route, NavLink, useParams } from "react-router-dom";

const PRODUCT_BY_BRAND = gql`
	query productByBrand($brandId: ID!) {
		productByBrand(brandId: $brandId) {
			id
			name
			img_url
			price
		}
	}
`;

function Products() {
	const [localStorage, setLocalStorage] = useState(
		JSON.parse(window.localStorage.getItem("myBasket")) || []
	);
	const { brandId } = useParams();
	const [products, setProduct] = useState(undefined);
	const { data, loading, error } = useQuery(PRODUCT_BY_BRAND, {
		variables: {
			brandId,
		},
	});
	useEffect(() => {
		setProduct(data?.productByBrand);
	}, [data]);

	const handleClick = (e) => {
		const targetedProduct = JSON.parse(
			e.target.parentElement.getAttribute("name")
		);
		const foundItem = localStorage?.find((e) => e.id == targetedProduct.id);
		if (foundItem) {
			foundItem.count = Number(foundItem.count) + 1;
			localStorage.splice(
				localStorage.findIndex((e) => e.id == targetedProduct.id),
				1,
				foundItem
			);
			setLocalStorage(localStorage);
			window.localStorage.removeItem("myBasket");
			window.localStorage.setItem(
				"myBasket",
				JSON.stringify(localStorage)
			);
            window.alert(`bu mahsulot savatdagi soni ${foundItem.count} taga yetdi!`)
		} else {
            targetedProduct.count = 1;
			localStorage.length
            ? setLocalStorage([...localStorage, targetedProduct])
            : setLocalStorage([targetedProduct]);
			localStorage.length
            ? window.localStorage.setItem(
                "myBasket",
                JSON.stringify([...localStorage, targetedProduct])
				  )
                  : window.localStorage.setItem(
                      "myBasket",
						JSON.stringify([targetedProduct])
                        );
                        window.alert(`Mahsulot savatchaga qo'shildi!`)
                    }
	};
    
	return (
		<>
			<div className="container df">
				{products &&
					products.map((e, i) => (
						<div
							className="product-card"
							name={JSON.stringify(e)}
							key={i}
						>
							<img
								src={e.img_url}
								width={200}
								height={200}
								alt={e.name}
								className="product_image"
							/>
							<h3 className="card_title">{e.name}</h3>
							<p className="card_price">{e.price}</p>
							<button onClick={handleClick}>To Basket</button>
						</div>
					))}
			</div>
		</>
	);
}

export default Products;
