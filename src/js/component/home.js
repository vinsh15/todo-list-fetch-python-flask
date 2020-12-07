import React, { useState } from "react";

//incorpora un componente llamado lista

//include images into your bundle

//create your first component
const Home = () => {
	const [tarea, guardarTarea] = useState("");
	const [lista, guardarLista] = useState([]);

	return (
		<div className="container-fluid col-8">
			<h1 className="text-center">To Do List!</h1>
			<div className="Group">
				<input
					value={tarea}
					onKeyDown={e => {
						if (e.keyCode == 13) {
							let nuevaLista = [];
							for (let i = 0; i < lista.length; i++) {
								nuevaLista.push(lista[i]);
							}
							nuevaLista.push(tarea);
							guardarLista(nuevaLista);
							guardarTarea("");
						}
					}}
					onChange={e => {
						guardarTarea(e.target.value);
					}}
					type="text"
					placeholder="Ingresa tus tareas aquí"
				/>
				<div className="card">
					<ul className="list-group list-group-flush">
						{lista.map((cosas, index) => {
							return (
								<li key={index} className="list-group-item">
									{cosas}
								</li>
							);
						})}
					</ul>
				</div>
			</div>
			<div className="card-footer text-muted">3 elements</div>
		</div>
	);
};

export default Home;
