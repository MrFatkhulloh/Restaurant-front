import { gql, useMutation, useQuery } from "@apollo/client";
import { useEffect, useState } from "react";
import "./DeleteBrand.css";

const BRAND_LIST = gql`
	query {
		brands {
			id
			name
			img_url
		}
	}
`;

const DELETE_BRAND = gql`
	mutation deleteBrand($id: ID!) {
		deleteBrand(id: $id) {
			id
			name
			img_url
		}
	}
`;

function DeleteBrand() {
	const [deleteBrand] = useMutation(DELETE_BRAND, {
		update: (cache, data) => {
			console.log(data);
		},
	});
	const { data, loading, error } = useQuery(BRAND_LIST);

	const [brands, setBrand] = useState(data?.brands);

	useEffect(() => {
		setBrand(data?.brands);
	}, [data]);

	const handleDelete = (e) => {
		const id = e.target.parentElement.getAttribute("brandId");
		deleteBrand({
			variables: {
				id,
			},
		});
		const lastbrands = brands.filter((e) => e.id !== id);
		setBrand(lastbrands);
	};

	return (
		<>
			<div className="container">
				<div className="df">
					{brands &&
						brands.map((e, i) => (
							<div
								brandId={e.id}
								key={i}
								className="brand_wrapper deleting-brand"
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

export default DeleteBrand;
