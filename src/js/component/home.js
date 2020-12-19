import React, { useEffect, useState } from "react";

//component
function Home() {
	const BASE_URL = "https://assets.breatheco.de/apis/fake/todos/user/maruchf";
	const [tarea, guardarTarea] = useState("");
	const [lista, guardarLista] = useState([]);
	//crear una función para eliminar ítems del arreglo desde un botón
	const eliminaItems = async (indexItem, listaActual) => {
		//filtra la lista con todos los elementos menos el actual
		const listFilter = listaActual.filter(
			(todo, index) => index !== indexItem
		);
		//valida que no se está eliminando el último elemento de la lista y realiza
		//una actualización de los elementos en la API con lo que está en listFilter
		if (listFilter.length > 0) {
			let response = await fetch(BASE_URL, {
				method: "PUT",
				body: JSON.stringify(listFilter), //Envía listFilter en .JSON
				headers: {
					"Content-Type": "application/json"
				}
			});
			if (response.ok) {
				guardarLista(listFilter); //cambia el estado si la respuesta de la API serv es ok, actualiza la lista
			} else {
				alert("hubo un problema"); //si la respuesta fue no ok, informa del problema en un alert
			}
		} else {
			//si es el último elemento de la lista entonces borra todo (duda: incluso el usuario?)
			let response = await fetch(BASE_URL, {
				method: "DELETE",
				headers: {
					"Content-Type": "application/json"
				}
			});
			if (response.ok) {
				guardarLista([]); //si la respuesta anterior es ok, coloca la lista como un arreglo vacío.
			} else {
				alert("Problema de nuevo"); //sino informa un problema
			}
		}
	};

	useEffect(() => {
		const obtenerTareas = async path => {
			try {
				let response = await fetch(path);
				let APILista = await response.json();
				guardarLista(APILista);
			} catch (error) {
				console.log(error);
			}
		};
		let url = `${BASE_URL}`;
		obtenerTareas(url);
		// fetch(url)
		// 	.then(response => response.json())
		// 	.then(APILista => guardarLista(APILista))
		// 	.catch(error => console.log(`{error}`));
	}, []);

	return (
		<div className="container-fluid col-8">
			<h1 className="text-center">Lista de tareas</h1>
			<div className="Group">
				<input
					value={tarea}
					onKeyDown={async e => {
						if (e.keyCode == 13) {
							let nuevaLista = [];
							for (let i = 0; i < lista.length; i++) {
								nuevaLista.push(lista[i]);
							}

							nuevaLista.push({
								label: tarea,
								done: false
							});

							let response = await fetch(BASE_URL, {
								method: "PUT",
								body: JSON.stringify(nuevaLista),
								headers: {
									"Content-Type": "application/json"
								}
							});
							if (response.ok) {
								let response = await fetch(BASE_URL);
								let APILista = await response.json();
								guardarLista(APILista);
								guardarTarea("");
							} else {
								alert("intenta de nuevo, tienes un error");
							}
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
						{lista.map((tarea, index) => {
							return (
								<li
									key={index}
									className="list-group-item d-flex justify-content-between"
									onClick={e =>
										eliminaItems(index, [...lista])
									}>
									{tarea.label}
									<div>
										<i className="fas fa-times" />
									</div>
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
}

export default Home;
