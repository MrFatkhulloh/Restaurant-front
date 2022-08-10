import { gql, useMutation, useQuery } from "@apollo/client";
import { useEffect, useState } from "react";
import "./deleteType.css";

const TYPE_LIST = gql`
	query {
		marketTypes {
			id
			name
			img_url
		}
	}
`;

const DELETE_TYPE = gql`
	mutation deleteType($id: ID!) {
		deleteType(id: $id) {
			id
			name
			img_url
		}
	}
`;

function DeleteType() {
	const [deleteType] = useMutation(DELETE_TYPE, {
		update: (cache, data) => {
			console.log(data);
		},
	});
	const { data, loading, error } = useQuery(TYPE_LIST);

	const [types, setType] = useState(data?.types);

	useEffect(() => {
		setType(data?.types);
	}, [data]);

	const handleDelete = (e) => {
		const id = e.target.parentElement.getAttribute("typeId");
		deleteType({
			variables: {
				id,
			},
		});
		const lasttypes = types.filter((e) => e.id !== id);
		setType(lasttypes);
	};

	return (
		<>
			<div className="container">
				<div className="df">
					{types &&
						types.map((e, i) => (
							<div
								typeId={e.id}
								key={i}
								className="type_wrapper deleting-type"
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

export default DeleteType;
