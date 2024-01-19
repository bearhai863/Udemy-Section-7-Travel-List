import React, { useState } from "react";
import Logo from "./components/Logo";
import { Form } from "./components/Form";
import { PackingList } from "./components/PackingList";
import { Stats } from "./components/Stats";

export default function App() {
	const [items, setItems] = useState([]);

	function handleUpdateItems(newItem) {
		setItems([...items, newItem]);
	}

	function handlePacked(id) {
		setItems((currItems) =>
			currItems.map((item) =>
				item.id === id ? { ...item, packed: !item.packed } : item
			)
		);
	}

	function handleDelete(id) {
		setItems((currItems) => currItems.filter((item) => item.id !== id));
	}

	function handleClearList() {
		const confirmed = window.confirm(
			"Are you sure you want to delete all items?"
		);

		confirmed && setItems([]);
	}

	return (
		<div className="app">
			<Logo />
			<Form onUpdateItems={handleUpdateItems} />
			<PackingList
				items={items}
				onPacked={handlePacked}
				onDelete={handleDelete}
				onClearList={handleClearList}
			/>
			<Stats items={items} />
		</div>
	);
}
