import { gql, useQuery } from "@apollo/client";
import { Routes, Route, NavLink } from "react-router-dom";
import { v4 } from 'uuid'
import "./Home.css";
import HomeHeader from "./Header/Header";
import HomeCategory from "./Category/Category";
import Products from "./Products/Products";
import Basket from "./Basket/Basket";

const marketTypes = gql`
	query {
		marketTypes {
			id
			name
			title
			img_url
		}
	}
`;

function Home() {
	const { data, loading, error } = useQuery(marketTypes);

	return (
		<div className="Home">
			<h1 className="visually-hidden">choose what you want</h1>

				<HomeHeader data={data} />
			<Routes>
				<Route
					path="/"
					element={
						<>
							<main className="site-main-part">
								<div className="container df main-part-wrapper">
									{data &&
										data.marketTypes.map((e, i) => (
											<div
												className="main-img-wrapper"
												key={i}
											>
												<NavLink to={`brand/${e.id}`}>
													<img
														src={e.img_url}
														width={500}
														height={334}
														alt="#"
													/>
												</NavLink>
											</div>
										))}
								</div>
							</main>
						</>
					}
				/>
				<Route path="/brand/:typeId" element={<>
					<HomeCategory/>
				</>} />
				<Route path="/product/:brandId" element={<>
					<Products/>
				</>} />
				<Route path="/basket" element={<Basket/>} />
			</Routes>
		</div>
	);
}

export default Home;
