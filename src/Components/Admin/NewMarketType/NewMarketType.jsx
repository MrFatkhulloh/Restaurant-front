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

const NEW_MARKET_TYPE = gql`
	mutation newType($name: String!, $image: String!) {
		newType(name: $name, image: $image) {
			id
			name
			img_url
		}
	}
`;

function NewMarketType() {
	const { data, loading, error } = useQuery(MARKET_TYPES);
	const [marketTypes, setMarketType] = useState(data?.marketTypes);

	useEffect(() => {
		setMarketType(data?.marketTypes);
	}, [data]);
    
	const [NewType] = useMutation(NEW_MARKET_TYPE, {
        update: (cache, data) => {
            setMarketType([data?.data?.newType, ...marketTypes]);
            // console.log(data.data.newType, 'and', marketTypes)
		},
	});


	const handleSubmit = (e) => {
		e.preventDefault();

		const { category, category_image } = e.target;

		NewType({
			variables: {
				name: category.value,
				image: category_image.value,
			},
		});
	};
	return (
		<div className="newMarketWrapper">
			<form action="" onSubmit={handleSubmit}>
				<input
					required
					type="text"
					name="category"
					placeholder="Category name"
				/>
				<input
					required
					type="text"
					name="category_image"
					placeholder="Category image url"
				/>
				<button type="submit">Add Category</button>
			</form>
			<div className="df">
				{marketTypes &&
					marketTypes.map((e, i) => (<div key={i} className="type_wrappers">
                        <h3>{e.name}</h3>
						<img  src={e.img_url} width={400} height={300} alt={e.name} /></div>
					))}
			</div>
		</div>
	);
}

export default NewMarketType;
