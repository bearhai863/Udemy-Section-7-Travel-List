import React, { useState } from "react";
import { Item } from "./Item";

export function PackingList({ items, onPacked, onDelete, onClearList }) {
	const [sortBy, setSortBy] = useState("input");

	let sortItems =
		sortBy === "input"
			? items
			: sortBy === "description"
			? items
					.slice()
					.sort((a, b) => a.description.localeCompare(b.description))
			: items.slice().sort((a, b) => a.packed - b.packed);

	return (
		<div className="list">
			<ul>
				{sortItems.map((item) => (
					<Item
						item={item}
						key={item.id}
						onPacked={onPacked}
						onDelete={onDelete}
					/>
				))}
			</ul>

			<div className="actions">
				<select
					value={sortBy}
					onChange={(e) => setSortBy(e.target.value)}
				>
					<option value={"input"}>Sort by Input</option>
					<option value={"description"}>Sort by Description</option>
					<option value={"packed"}>Sort by Packed</option>
				</select>
				<button onClick={onClearList}>Clear List</button>
			</div>
		</div>
	);
}
