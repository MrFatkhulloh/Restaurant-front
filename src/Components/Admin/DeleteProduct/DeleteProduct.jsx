import { gql, useMutation, useQuery } from "@apollo/client";
import { useEffect, useState } from "react";
import "./DeleteProduct.css";

const PRODUCT_LIST = gql`
	query {
		products {
			id
			name
			price
			img_url
		}
	}
`;

const DELETE_PRODUCT = gql`
	mutation deleteProduct($id: ID!) {
		deleteProduct(id: $id) {
			id
			name
			img_url
			price
		}
	}
`;

function DeleteProduct() {

    const [deleteProduct] = useMutation(DELETE_PRODUCT, {
        update: (cache, data) => {
            console.log(data)
        }
    })
	const { data, loading, error } = useQuery(PRODUCT_LIST);

	const [products, setProduct] = useState(data?.products);

	useEffect(() => {
		setProduct(data?.products);
	}, [data]);

	const handleDelete = (e) => {
		const id =
			e.target.parentElement.getAttribute("productId");
            deleteProduct({
                variables: {
                    id
                }
            })
            const lastProducts = products.filter(e => e.id !== id)
            setProduct(lastProducts)
	};

	return (
		<>
			<div className="container">
				<div className="df">
					{products &&
						products.map((e, i) => (
							<div
								productId={e.id}
								key={i}
								className="product_wrapper deleting-product"
							>
								<div className="df">
									<h3>{e.name}</h3>
								</div>
								<img
									src={e.img_url}
									width={400}
									height={300}
									alt={e.name}
								/>
								<p className="product_price">{e.price}</p>
								<div
									onClick={handleDelete}
									className="delete-btn"
								>
									x
								</div>
							</div>
						))}
				</div>

			</div>
		</>
	);
}

export default DeleteProduct;
