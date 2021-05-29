import React, { useState } from 'react';
import { Container, Form, Button, Card, Row, Col } from 'react-bootstrap';
import { connect } from 'react-redux';
import { setAlert } from '../../actions/alert';
import { register } from '../../actions/auth';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import './auth.css';

const Register = ({ setAlert, register, isAuthenticated, user }) => {
	const [
		formData,
		setformData
	] = useState({
		name     : '',
		email    : '',
		password : ''
	});

	const { name, email, password } = formData;

	const onChange = (e) =>
		setformData({ ...formData, [e.target.name]: e.target.value });

	const onSubmit = async (e) => {
		e.preventDefault();
		register({ name, email, password });
	};

	console.log('Changing state');
	//Redirect to dashboards
	try {
		if(isAuthenticated)
		{
			if(user === 'null'){
				window.location.reload(true);
			}
			else{
				<Redirect to='/dashboard' />;
			}
		}	
	} catch (error) {
		window.location.reload(true);
	}

	return (
		<Container fluid='md'>
			<Row>
				<Col />
				<Col md='auto'>
					<Card
						style={{
							width           : '30rem',
							marginTop       : '5em',
							backgroundColor : 'lightgrey',
							border          : '1px grey'
						}}>
						<p>Welcome, please provide the details!</p>
						<Form className='form' onSubmit={(e) => onSubmit(e)}>
							<Form.Group>
								<Form.Label>Full Name</Form.Label>
								<Form.Control
									size='sm'
									type='text'
									placeholder='Enter name'
									name='name'
									value={name}
									onChange={(e) => onChange(e)}
									required
								/>
							</Form.Group>
							<Row>
								<Col>
									<Form.Group controlId='formBasicEmail'>
										<Form.Label>Email address</Form.Label>
										<Form.Control
											size='sm'
											type='email'
											placeholder='Enter email'
											name='email'
											value={email}
											onChange={(e) => onChange(e)}
											required
										/>
									</Form.Group>
								</Col>
								<Col>
									<Form.Group controlId='formBasicPassword'>
										<Form.Label>Password</Form.Label>
										<Form.Control
											size='sm'
											type='password'
											placeholder='Enter Password'
											name='password'
											value={password}
											onChange={(e) => onChange(e)}
											minLength='6'
											required
										/>
									</Form.Group>
								</Col>
							</Row>
							<Button
								size='sm'
								variant='warning'
								type='submit'
								value='register'>
								Register
							</Button>
						</Form>
					</Card>
				</Col>
				<Col />
			</Row>
		</Container>
	);
};

Register.propTypes = {
	setAlert        : PropTypes.func.isRequired,
	register        : PropTypes.func.isRequired,
	isAuthenticated : PropTypes.bool,
	user         : PropTypes.element
};

const mapStateToprops = (state) => ({
	isAuthenticated : state.auth.isAuthenticated,
	user         : state.auth.user
});

export default connect(mapStateToprops, { setAlert, register })(Register);
