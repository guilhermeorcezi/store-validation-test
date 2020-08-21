import React, { useRef, useState } from 'react';
import './App.css';

import { Formik, Field, Form } from 'formik';
import { FaTimes } from 'react-icons/fa';

function App() {
	const [toggle, setToggle] = useState(false);
	const [skill, setSkill] = useState('');
	const [selectedSkills, setSelectedSkills] = useState([]);
	const [user, setUser] = useState([]);

	function handleToggle() {
		setToggle(toggle ? false : true);
	}

	return (
		<main id="page-create">
			<header className="header">
				<h1>Listagem de usuários</h1>
				<button onClick={(e) => handleToggle()}>Cadastrar usuário</button>
			</header>
			<div className="content">
				{console.log('data', user)}
				{user.length !== 0 ? (
					<table>
						<tr>
							<th>Nome</th>
							<th>Sobrenome</th>
							<th>Idade</th>
							<th>Escolaridade</th>
							<th>Qtd Skills</th>
						</tr>
						<tr>
							<td>{user.name}</td>
							<td>{user.nickname}</td>
							<td>{user.age}</td>
							<td>{user.schooling}</td>
							<td>
								<ul>
									{user.skills.map((skill, index) => (
										<li key={index}>
											{index + 1} - {skill}
										</li>
									))}
								</ul>
							</td>
						</tr>
					</table>
				) : (
					<div className="has-nothing">Nenhum item cadastrado.</div>
				)}
			</div>

			{toggle && (
				<div className="create-container">
					<FaTimes
						size={16}
						style={{
							position: 'absolute',
							top: 240,
							left: 375,
							zIndex: 2,
							cursor: 'pointer',
						}}
						onClick={(e) => handleToggle()}
					/>
					<Formik
						initialValues={{
							name: '',
							nickname: '',
							age: '',
							schooling: '',
							skills: [''],
						}}
						onSubmit={(values, {resetForm}) => {
							values.skills = selectedSkills;
							console.log('valores final', values);
              setUser(values);

              resetForm({})
              setSkill('');
              setSelectedSkills([]);
              handleToggle();
						}}
					>
						<Form>
							<div className="form-header">
								<h1>Cadastro de Usuários</h1>

								<button type="submit">Cadastrar</button>
							</div>

							<div className="form-content">
								<div className="create-profile">
									<div className="input-group">
										<div className="input-block">
											<legend>Nome</legend>
											<Field name="name" type="text" placeholder="Nome" />
										</div>
										<div className="input-block">
											<legend>Idade</legend>
											<Field name="age" type="text" placeholder="Idade" />
										</div>
									</div>
									<div className="input-group">
										<div className="input-block">
											<legend>Sobrenome</legend>
											<Field
												name="nickname"
												type="text"
												placeholder="Sobrenome"
											/>
										</div>
										<div className="input-block">
											<legend>Escolaridade</legend>
											<Field
												name="schooling"
												type="text"
												placeholder="Escolaridade"
											/>
										</div>
									</div>
								</div>

								<div className="create-skills">
									<div className="input-group">
										<div className="input-block">
											<Field
												name="skills"
												type="text"
												placeholder="Skills"
												className="input-skills"
												value={skill}
												onChange={(e) => setSkill(e.target.value)}
											/>
										</div>
										<div className="input-block">
											<button
												className="skill"
												onClick={() =>
													setSelectedSkills([...selectedSkills, skill])
												}
												type="button"
											>
												Adicionar
											</button>
										</div>
									</div>
									<div className="input-block">
										<ul>
											{selectedSkills.map((skill, index) => (
												<li key={index}>{skill}</li>
											))}
										</ul>
									</div>
								</div>
							</div>
						</Form>
					</Formik>
				</div>
			)}
		</main>
	);
}

export default App;
