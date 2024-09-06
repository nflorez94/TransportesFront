import React, { useState } from 'react';
import { Form, Button, Container, Row, Col, Alert } from 'react-bootstrap';
import axios from 'axios';

interface TransporteData {
  numeroViaje: string;
  origen: string;
  destino: string;
  transportista: string;
  tarifaAcordada: number;
  fechaSalida: string;
  fechaEntrega: string;
  notas?: string;
  vehiculoAsignado?: string;
  condicionesEspeciales?: string;
}

const Backoffice: React.FC = () => {
  const [transporteData, setTransporteData] = useState<TransporteData>({
    numeroViaje: '',
    origen: '',
    destino: '',
    transportista: '',
    tarifaAcordada: 0,
    fechaSalida: '',
    fechaEntrega: '',
    notas: '',
    vehiculoAsignado: '',
    condicionesEspeciales: '',
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setTransporteData({ ...transporteData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (new Date(transporteData.fechaEntrega) <= new Date(transporteData.fechaSalida)) {
      setError('La fecha de entrega debe ser posterior a la fecha de salida');
      return;
    }

    if (transporteData.tarifaAcordada <= 0) {
      setError('La tarifa acordada debe ser un número positivo');
      return;
    }

    try {
      const token = localStorage.getItem('token');
      await axios.post('http://localhost:3000/transportes', transporteData, {
        headers: { 'user-id': token }
      });
      setSuccess('Transporte registrado exitosamente');
      setTransporteData({
        numeroViaje: '',
        origen: '',
        destino: '',
        transportista: '',
        tarifaAcordada: 0,
        fechaSalida: '',
        fechaEntrega: '',
      });
    } catch (err) {
      setError('Error al registrar el transporte');
    }
  };

  return (
    <Container>
      <h2 className="mb-4">Registrar Transporte</h2>
      {error && <Alert variant="danger">{error}</Alert>}
      {success && <Alert variant="success">{success}</Alert>}
      <Form onSubmit={handleSubmit}>
        <Row>
          <Col md={6}>
            <Form.Group className="mb-3" controlId="numeroViaje">
              <Form.Label>Número de Viaje</Form.Label>
              <Form.Control
                type="text"
                name="numeroViaje"
                value={transporteData.numeroViaje}
                onChange={handleInputChange}
                required
              />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group className="mb-3" controlId="transportista">
              <Form.Label>Transportista</Form.Label>
              <Form.Control
                type="text"
                name="transportista"
                value={transporteData.transportista}
                onChange={handleInputChange}
                required
              />
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col md={6}>
            <Form.Group className="mb-3" controlId="origen">
              <Form.Label>Origen</Form.Label>
              <Form.Control
                type="text"
                name="origen"
                value={transporteData.origen}
                onChange={handleInputChange}
                required
              />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group className="mb-3" controlId="destino">
              <Form.Label>Destino</Form.Label>
              <Form.Control
                type="text"
                name="destino"
                value={transporteData.destino}
                onChange={handleInputChange}
                required
              />
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col md={4}>
            <Form.Group className="mb-3" controlId="tarifaAcordada">
              <Form.Label>Tarifa Acordada</Form.Label>
              <Form.Control
                type="number"
                name="tarifaAcordada"
                value={transporteData.tarifaAcordada}
                onChange={handleInputChange}
                required
                min="0.01"
                step="0.01"
              />
            </Form.Group>
          </Col>
          <Col md={4}>
            <Form.Group className="mb-3" controlId="fechaSalida">
              <Form.Label>Fecha de Salida</Form.Label>
              <Form.Control
                type="date"
                name="fechaSalida"
                value={transporteData.fechaSalida}
                onChange={handleInputChange}
                required
              />
            </Form.Group>
          </Col>
          <Col md={4}>
            <Form.Group className="mb-3" controlId="fechaEntrega">
              <Form.Label>Fecha de Entrega Estimada</Form.Label>
              <Form.Control
                type="date"
                name="fechaEntrega"
                value={transporteData.fechaEntrega}
                onChange={handleInputChange}
                required
              />
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col md={6}>
            <Form.Group className="mb-3" controlId="notas">
              <Form.Label>Notas (opcional)</Form.Label>
              <Form.Control
                as="textarea"
                name="notas"
                value={transporteData.notas}
                onChange={handleInputChange}
              />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group className="mb-3" controlId="vehiculoAsignado">
              <Form.Label>Vehículo Asignado (opcional)</Form.Label>
              <Form.Control
                type="text"
                name="vehiculoAsignado"
                value={transporteData.vehiculoAsignado}
                onChange={handleInputChange}
              />
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col md={12}>
            <Form.Group className="mb-3" controlId="condicionesEspeciales">
              <Form.Label>Condiciones Especiales (opcional)</Form.Label>
              <Form.Control
                as="textarea"
                name="condicionesEspeciales"
                value={transporteData.condicionesEspeciales}
                onChange={handleInputChange}
              />
            </Form.Group>
          </Col>
        </Row>
        <Button variant="primary" type="submit">
          Registrar Transporte
        </Button>
      </Form>
    </Container>
  );
};

export default Backoffice;
