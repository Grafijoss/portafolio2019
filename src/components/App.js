import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import Alert from 'react-bootstrap/Alert';
import Accordion from 'react-bootstrap/Accordion'

import './styles/App.scss';

function App() {
  return (
		<div className="App">
			<Accordion defaultActiveKey="0">
					<Card>
						<Card.Header>
							<Accordion.Toggle as={Button} variant="link" eventKey="0">
								Click me!
							</Accordion.Toggle>
						</Card.Header>
						<Accordion.Collapse eventKey="0">
							<Card.Body>Hello! I'm the body</Card.Body>
						</Accordion.Collapse>
					</Card>
					<Card>
						<Card.Header>
							<Accordion.Toggle as={Button} variant="link" eventKey="1">
								Click me!
							</Accordion.Toggle>
						</Card.Header>
						<Accordion.Collapse eventKey="1">
							<Card.Body>Hello! I'm another body</Card.Body>
						</Accordion.Collapse>
					</Card>
				</Accordion>
				{
					[
						'primary',
						'secondary',
						'success',
						'danger',
						'warning',
						'info',
						'light',
						'dark',
					].map((variant, idx) => (
						<Alert key={idx} variant={variant}>
							This is a {variant} alert—check it out!
						</Alert>
					))
				}
		</div>
  );
}

export default App;
