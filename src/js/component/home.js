import React, { useState } from "react";

//incorpora un componente llamado lista

//include images into your bundle

//create your first component
const Home = () => {
	const [tarea, guardarTarea] = useState("");
	const [lista, guardarLista] = useState([]);
	//crear una función para eliminar ítems del arreglo desde un botón
	const eliminaItems = indexItem => {
		guardarLista(prevState =>
			prevState.filter((todo, index) => index !== indexItem)
		);
	};

	//declarar funciones
	return (
		<div className="container-fluid col-8">
			<h1 className="text-center">Lista de tareas</h1>
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
								<li
									key={index}
									className="list-group-item d-flex justify-content-between">
									{cosas}
									<button
										className="btn btn-light"
										onClick={e => {
											eliminaItems(index);
										}}>
										<i className="fas fa-times" />
									</button>
								</li>
							);
						})}
					</ul>
				</div>
			</div>
			<div className="card-footer text-muted">
				<p>{lista.length} tareas pendientes</p>
			</div>
		</div>
	);
};

export default Home;
