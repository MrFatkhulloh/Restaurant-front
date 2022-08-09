import { gql, useMutation, useQuery } from "@apollo/client";
import { useEffect, useState } from "react";

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

const BRANDS = gql`
	query {
		brands {
			id
			name
			img_url
		}
	}
`;

const NEW_PRODUCT = gql`
	mutation newProduct(
		$name: String!
		$image: String!
		$price: Int!
		$brandId: ID!
	) {
		newProduct(
			name: $name
			image: $image
			price: $price
			brandId: $brandId
		) {
			id
			name
			img_url
			price
		}
	}
`;

function NewProduct() {
	const {
		data: brandList,
		loading: brandLoading,
		error: brandError,
	} = useQuery(BRANDS);
    const {data, loading, error} = useQuery(PRODUCT_LIST);
    
	const [brands, setBrand] = useState(brandList?.brands);
	const [products, setProduct] = useState(data?.products);
    
    const [newProduct] = useMutation(NEW_PRODUCT, {
        update: (cache, data) => {
            setProduct([data?.data?.newProduct, ...products]);
            // console.log(data.data.newType, 'and', marketType)
        },
    });


	const handleSubmit = (e) => {
        e.preventDefault();

        const { product, product_image, product_price, product_brand } = e.target

        const foundBrand = brands.find(e => e.name == product_brand.value)

        // console.log({
        //     name: product.value,
        //     image: product_image.value,
        //     price: product_price.value,
        //     brandId: foundBrand.id
        // })

        newProduct({
            variables: {
                name: product.value,
                image: product_image.value,
                price: Number(product_price.value),
                brandId: foundBrand.id
            }
        })
	};

	useEffect(() => {
		setBrand(brandList?.brands);
	}, [brandList]);

	useEffect(() => {
		setProduct(data?.products);
	}, [data]);

	return (
		<>
			<div className="newProductWrapper">
				<form action="" onSubmit={handleSubmit}>
					<input
						required={true}
						type="text"
						name="product"
						placeholder="product name"
					/>
					<input
						required={true}
						type="text"
						name="product_image"
						placeholder="product image url"
					/>
					<input
						required={true}
						type="number"
						name="product_price"
						placeholder="price"
					/>
					<select name="product_brand" id="brand_select">
						<option
							defaultValue={"zero"}
							selected={true}
							disabled={true}
							hidden={true}
						>
							select one
						</option>
						{brands &&
							brands.map((e, i) => (
								<option key={i} defaultValue={e.id}>
									{e.name}
								</option>
							))}
					</select>
					<button type="submit">Add product</button>
				</form>
				<div className="df">
					{products &&
						products.map((e, i) => (
							<div key={i} className="product_wrapper">
								<h3>{e.name}</h3>
								<img
									src={e.img_url}
									width={400}
									height={300}
									alt={e.name}
								/>
                                <p className="product_price">{e.price}</p>
							</div>
						))}
				</div>
			</div>
		</>
	);
}

export default NewProduct;
