import { useState } from "react";
import axios from "axios";
import styles from "../styles/Home.module.css";
import cookies from 'next-cookies'
import API_URL from '../components/globalApiUrl.js'


export default function Home(props) {
	const [tasks, setTasks] = useState(props.tasks);
	const [task, setTask] = useState({ name: "", UserId: null, StatusId: null});

	const handleChange = ({ currentTarget: input }) => {
		input.value === ""
			? setTask({ name: "" })
			: setTask((prev) => ({ ...prev, name: input.value }));
	};

	const addTask = async (e) => {
		e.preventDefault();
		try {
			if (task.id) {
				const { data } = await axios.put(API_URL + "/update/" + task.id, task, {
					headers: props.headers
				  }).then((data) => {
					const originalTasks = [...tasks];
					const index = originalTasks.findIndex((t) => t.id === task.id);
					originalTasks[index] = data.data.item;
					setTasks(originalTasks);
					setTask({ name: "", UserId: null, StatusId: null });
				});
			} else {
				task.UserId = props.userId;
				task.StatusId = 1;
				const { data } = await axios.post(API_URL + "/add", task, {
					headers: props.headers
				  }).then((data) => {
					  console.log(data)
					setTasks((prev) => [...prev, data.data.item]);
					setTask({ name: "", UserId: null, StatusId: null });
				  });
			}
		} catch (error) {
			console.log(error);
		}
	};

	const editTask = (task) => {
		const currentTask = tasks.filter((t) => t.id === task.id);
		setTask(currentTask[0]);
	};

	const updateTask = async (task) => {
		try {
			if (task.StatusId === 3) {
				task.StatusId = 1;
			} else {
				task.StatusId = 3;
			}
			await axios.put(API_URL + "/update/" + task.id, task, {
				headers: props.headers
			  }).then((data) => {
				const originalTasks = [...tasks];
				const index = originalTasks.findIndex((t) => t.id === task.id);
				originalTasks[index] = data.data.item;
				setTasks(originalTasks);
				console.log(data.message);
			});
		} catch (error) {
			console.log(error);
		}
	};

	const deleteTask = async (task) => {
		try {
			await axios.delete(API_URL + "/delete/" + task.id, {
				headers: props.headers
			  }).then(() => {
				setTasks((prev) => prev.filter((t) => t.id !== task.id));
			  })
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<main className={styles.main}>
			<h1 className={styles.heading}>TO-DO</h1>
			<div className={styles.container}>
				<form onSubmit={addTask} className={styles.form_container}>
					<input
            required
						className={styles.input}
						type="text"
						placeholder="Task to be done..."
						onChange={handleChange}
						value={task.name}
					/>
					<button type="submit" className={styles.submit_btn}>
						{task.id ? "Update" : "Add"}
					</button>
				</form>
				{tasks.map((task) => (
					<div className={styles.task_container} key={task.id}>
						<input
							type="checkbox"
							className={styles.check_box}
							checked={task.StatusId === 3}
							onChange={() => updateTask(task)}
						/>
						<p
							className={
								task.StatusId === 3 
									? styles.task_text + " " + styles.line_through
									: styles.task_text
							}
						>
							{task.name}
						</p>
						<button
							onClick={() => editTask(task)}
							className={styles.edit_task}
						>
							&#9998;
						</button>
						<button
							onClick={() => deleteTask(task)}
							className={styles.remove_task}
						>
							&#10006;
						</button>
					</div>
				))}
				{tasks.length === 0 && <h2 className={styles.no_tasks}>No tasks</h2>}
			</div>
		</main>
	);
}

export const getServerSideProps = async (ctx) => {
	const c = cookies(ctx);
	const headers = {
		'Content-Type': 'application/json',
		'x-access-token': c.authtoken
	}
	const { data } = await axios.get(API_URL + "/get", { headers: headers });

	return {
		props: {
			tasks: data.todolist,
			headers: headers,
			userId: c.userId
		},
	};
};