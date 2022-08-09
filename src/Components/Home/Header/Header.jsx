import { NavLink } from "react-router-dom";
import basket from "../../../assets/basket.svg";


function HomeHeader({data}) {
	return (
		<>
			<header className="site-header">
				<div className="container df header-wrapper">
					<div className="header-left df">
						<div className="header-logo-wrapper">
							<h2 className="header-logo-text">Restaurant</h2>
						</div>
						<div className="header-option-wrapper">
							<select name="category" id="category">
								<option
									defaultValue="none"
									disabled
									selected={true}
									hidden
								>
									Choose one
								</option>
								{data &&
									data.marketTypes.map((e, i) => (
										<option key={i} defaultValue={e.title}>
											{e.name}
										</option>
									))}
							</select>
						</div>
					</div>
					<div className="header-right">
						<div className="header-basket-wrapper">
							<NavLink className="header-basket-link" to={"basket"}>
								<img
									src={basket}
									alt="basket icon"
									width={50}
									height={50}
								/>
							</NavLink>
						</div>
					</div>
				</div>
			</header>
		</>
	);
}

export default HomeHeader
