import { gql, useMutation, useQuery } from "@apollo/client";
import { useEffect, useState } from "react";

const MARKET_TYPES = gql`
	query {
		marketTypes {
			id
			name
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

const NEW_BRAND = gql`
	mutation newBrand($name: String!, $image: String!, $typeId: ID!) {
		newBrand(name: $name, image: $image, typeId: $typeId) {
			id
			name
			img_url
		}
	}
`;

function NewBrand() {
	const {
		data: marketType,
		loading: typeLoading,
		error: typeError,
	} = useQuery(MARKET_TYPES);
	const { data, loading, error } = useQuery(BRANDS);
	const [brands, setBrand] = useState(data?.brands);
	const [marketTypes, setMarketType] = useState(marketType?.marketTypes);

	useEffect(() => {
		setMarketType(marketType?.marketTypes);
	}, [marketType]);

	useEffect(() => {
		setBrand(data?.brands);
	}, [data]);

	const [NewBrand] = useMutation(NEW_BRAND, {
		update: (cache, data) => {
			setBrand([data?.data?.newBrand, ...brands]);
			// console.log(data.data.newType, 'and', marketType)
		},
	});

	const handleSubmit = (e) => {
		e.preventDefault();

		const { brand, brand_image, brand_type } = e.target;

		const foundType = marketTypes.find((e) => e.name == brand_type.value);

		NewBrand({
			variables: {
				name: brand.value,
				image: brand_image.value,
				typeId: foundType.id,
			},
		});
	};

	return (
		<>
			<div className="newMarketWrapper">
				<form action="" onSubmit={handleSubmit}>
					<input
						required={true}
						type="text"
						name="brand"
						placeholder="brand name"
					/>
					<input
						required={true}
						type="text"
						name="brand_image"
						placeholder="brand image url"
					/>
					<select name="brand_type" id="type_select">
						<option
							defaultValue={"zero"}
							selected={true}
							disabled={true}
							hidden={true}
						>
							select one
						</option>
						{marketTypes &&
							marketTypes.map((e, i) => (
								<option key={i} defaultValue={e.id}>
									{e.name}
								</option>
							))}
					</select>
					<button type="submit">Add Brand</button>
				</form>
				<div className="df">
					{brands &&
						brands.map((e, i) => (
							<div key={i} className="type_wrappers">
								<h3>{e.name}</h3>
								<img
									src={e.img_url}
									width={400}
									height={300}
									alt={e.name}
								/>
							</div>
						))}
				</div>
			</div>
		</>
	);
}

export default NewBrand;
