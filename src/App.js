import React, { useState } from 'react';
import './App.css';

import { Formik, Field, Form, ErrorMessage } from 'formik';
import { FaTimes } from 'react-icons/fa';
import * as yup from 'yup';

function App() {
	const [toggle, setToggle] = useState(false);
	const [skill, setSkill] = useState('');
	const [selectedSkills, setSelectedSkills] = useState([]);
	const [skilError, setSkilError] = useState(false);
	const [user, setUser] = useState([]);

	const initialValues = {
		name: '',
		nickname: '',
		age: '',
		schooling: '',
		skills: [''],
	};

	const contactSchema = yup.object().shape({
		name: yup.string().required('Nome é obrigatório'),
		nickname: yup.string().required('Sobrenome é obrigatório'),
		age: yup.number().required('Idade é obrigatória'),
		schooling: yup.string().required('Escolaridade é obrigatória'),
	});

	const handleSubmit = (
		values,
		{ setSubmitting, setErrors, setStatus, resetForm }
	) => {
		if (selectedSkills.length === 0) {
			setSkilError(true);
			return;
		}

		try {
			values.skills = selectedSkills;
			setUser([...user, values]);

			resetForm({});
			setSkill('');
			setSelectedSkills([]);
			handleToggle();
		} catch (error) {
			setErrors({ submit: error.message });
			setStatus({ success: false });
			setSubmitting(false);
		}
	};

	function handleToggle() {
		setToggle(toggle ? false : true);
	}

	function onChangeSkill() {
		setSkilError(false);
		setSkill('');
		setSelectedSkills([...selectedSkills, skill]);
	}

	return (
		<main id="page-create">
			{console.log('users', user)}
			<header className="header">
				<h1>Listagem de usuários</h1>
				<button onClick={(e) => handleToggle()}>Cadastrar usuário</button>
			</header>
			<div className="content">
				{user.length !== 0 ? (
					<table>
						<tr>
							<th>Nome</th>
							<th>Sobrenome</th>
							<th>Idade</th>
							<th>Escolaridade</th>
							<th>Qtd Skills</th>
						</tr>
						{user.map((user) => (
							<>
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
							</>
						))}
					</table>
				) : (
					<div className="has-nothing">Nenhum usuário cadastrado.</div>
				)}
			</div>

			{toggle && (
				<div className="create-container">
					<Formik
						initialValues={initialValues}
						onSubmit={handleSubmit}
						validationSchema={contactSchema}
					>
						<Form>
							<FaTimes
								size={16}
								style={{
									position: 'absolute',
									top: '4px',
									left: '4px',
									zIndex: 2,
									cursor: 'pointer',
								}}
								onClick={(e) => handleToggle()}
							/>
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
											<ErrorMessage
												className="Form-Error"
												component="span"
												name="name"
											/>
										</div>
										<div className="input-block">
											<legend>Idade</legend>
											<Field name="age" type="number" placeholder="Idade" />
											<ErrorMessage
												className="Form-Error"
												component="span"
												name="age"
											/>
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
											<ErrorMessage
												className="Form-Error"
												component="span"
												name="nickname"
											/>
										</div>
										<div className="input-block">
											<legend>Escolaridade</legend>
											<Field
												name="schooling"
												type="text"
												placeholder="Escolaridade"
											/>
											<ErrorMessage
												className="Form-Error"
												component="span"
												name="schooling"
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
											{skilError && (
												<span
													className="Form-Error skill-error"
													component="span"
													name="skills"
												>
													Insira pelo menos 1 skill
												</span>
											)}
										</div>
										<div className="input-block">
											<button
												className="skill"
												onClick={() => onChangeSkill()}
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
