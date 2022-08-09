import { useQuery, gql } from "@apollo/client";
import moment from "moment";

const ORDERS = gql`
	query {
		orders {
			id
			products
			client
			time
		}
	}
`;

function AdminHome() {
	const { data, loading, error } = useQuery(ORDERS);
	console.log(data);
	return (
		<>
			<table border="1px">
				<tbody>
					<tr>
						<th>№</th>
						<th>ordered products</th>
						<th>client info</th>
						<th>ordered at:</th>
					</tr>
					{data &&
						data?.orders?.map((e, i) => (
							<tr>
								<td>{i+1}</td>
								<td>{e.products}</td>
								<td>{e.client}</td>
								<td>{moment(e.time).format('MMMM Do YYYY, h:mm:ss a')}</td>
							</tr>
						))}
				</tbody>
			</table>
		</>
	);
}

export default AdminHome;
