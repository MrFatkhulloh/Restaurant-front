import { Link, Route, Routes } from "react-router-dom";
import "./Admin.css"
import AdminHome from "./AdminHome/AdminHome";
import DeleteProduct from "./DeleteProduct/DeleteProduct";
import NewBrand from "./NewBrand/NewBrand";
import NewMarketType from "./NewMarketType/NewMarketType";
import NewProduct from "./NewProduct/NewProduct";


function Order() {
	return (
		<div className="Admin container">
			<h1 className="visually-hidden">Site admin panel</h1>

			<header className="header admin-sidebar" role="banner">
				<h2 className="logo">
					<a href="#">
						Admin <span>Panel</span>
					</a>
				</h2>
				<div className="nav-wrap">
					<nav className="main-nav" role="navigation">
						<ul className="unstyled list-hover-slide">
							<li>
								<Link to={'newCategory'}>Add a new category</Link>
							</li>
							<li>
								<Link to={'newBrand'}>Add a new brand</Link>
							</li>
							<li>
								<Link to={'newProduct'}>Add a new product</Link>
							</li>
							<li>
								<Link to={'#'}>Delete a category</Link>
							</li>
							<li>
								<Link to={'#'}>Delete a brand</Link>
							</li>
							<li>
								<Link to={'deleteProduct'}>Delete a product</Link>
							</li>
						</ul>
					</nav>
				</div>
			</header>
			
			<main className="site-main-part">
				<div className=" df main-part-wrapper admin-main">
					<Routes>
						<Route path="/" element={<AdminHome/>} />		
						<Route path="/newCategory" element={<NewMarketType/>} />		
						<Route path="/newBrand" element={<NewBrand/>} />		
						<Route path="/newProduct" element={<NewProduct/>} />		
						<Route path="/deleteProduct" element={<DeleteProduct/>} />		
					</Routes>
					
				</div>
			</main>
		</div>
	);
}

export default Order;
