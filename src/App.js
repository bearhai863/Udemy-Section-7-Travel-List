import React, { useState } from "react";

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

	return (
		<div className="app">
			<Logo />
			<Form onUpdateItems={handleUpdateItems} />
			<PackingList
				items={items}
				onPacked={handlePacked}
				onDelete={handleDelete}
			/>
			<Stats items={items} />
		</div>
	);
}

function Logo() {
	return <h1>🌴 Far Away 💼</h1>;
}

function Form({ onUpdateItems }) {
	const [description, setDescription] = useState("");
	const [quantity, setQuantity] = useState(1);

	function handleSubmit(e) {
		e.preventDefault();

		const newItem = {
			description,
			quantity,
			packed: false,
			id: Date.now(),
		};

		onUpdateItems(newItem);

		setDescription("");
		setQuantity(1);
	}

	return (
		<form className="add-form" onSubmit={handleSubmit}>
			<h3>What do you need for your 😍 trip ?</h3>
			<select
				value={quantity}
				onChange={(e) => setQuantity(Number(e.target.value))}
			>
				{Array.from({ length: 20 }, (_, i) => i + 1).map((num) => (
					<option value={num} key={num}>
						{num}
					</option>
				))}
			</select>
			<input
				type="text"
				placeholder="Item..."
				value={description}
				onChange={(e) => setDescription(e.target.value)}
				required
			></input>
			<button>Add</button>
		</form>
	);
}

function PackingList({ items, onPacked, onDelete }) {
	return (
		<div className="list">
			<ul>
				{items.map((item) => (
					<Item
						item={item}
						key={item.id}
						onPacked={onPacked}
						onDelete={onDelete}
					/>
				))}
			</ul>
		</div>
	);
}

function Item({ item, onPacked, onDelete }) {
	return (
		<li>
			<input
				type="checkbox"
				value={item.packed}
				onChange={() => onPacked(item.id)}
			/>
			<span style={item.packed ? { textDecoration: "line-through" } : {}}>
				{item.quantity} {item.description}
			</span>
			<button
				onClick={() => {
					onDelete(item.id);
				}}
			>
				❌
			</button>
		</li>
	);
}

function Stats({ items }) {
	if (!items.length)
		return (
			<p className="stats">
				<em>Start adding some items to your packing list 🚀</em>
			</p>
		);

	const numPacked = items.filter((item) => item.packed).length;
	const percentage = Math.round((numPacked / items.length) * 100) || 0;

	return (
		<footer className="stats">
			<em>
				{percentage === 100
					? "You got everything! Ready to go ✈️"
					: `💼 You have ${items.length} item on your list, and you already packed ${numPacked} (${percentage}%)`}
			</em>
		</footer>
	);
}
