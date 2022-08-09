import { useParams } from "react-router-dom";
import { useQuery, gql } from "@apollo/client";
import { NavLink } from "react-router-dom";

const BRAND_BY_TYPE = gql`
	query typeBrands($typeId: ID!) {
		typeBrands(typeId: $typeId) {
			id
			name
			img_url
		}
	}
`;

function HomeCategory() {
	const { typeId } = useParams();
	const { data, loading, error } = useQuery(BRAND_BY_TYPE, {
		variables: {
			typeId,
		},
	});

	
	return (
		<div className="HomeCategory">
			<main className="site-main-part">
				<div className="container df main-part-wrapper">
					{data &&
						data.typeBrands.map((e, i) => (
							<div className="main-img-wrapper" key={i}>
								<NavLink to={`/Home/product/${e.id}`}>
									<img
										src={e.img_url}
										width={400}
										height={400}
										alt="#"
									/>
								</NavLink>
							</div>
						))}
				</div>
			</main>
		</div>
	);
}

export default HomeCategory;
