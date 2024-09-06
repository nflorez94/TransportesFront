import React, { useState, useEffect } from 'react';
import { Table, Container, Alert } from 'react-bootstrap';
import axios from 'axios';

interface Transporte {
  id: number;
  numeroViaje: string;
  origen: string;
  destino: string;
  transportista: string;
  tarifaAcordada: number;
  fechaSalida: string;
  fechaEntrega: string;
}

const ListaTransportes: React.FC = () => {
  const [transportes, setTransportes] = useState<Transporte[]>([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchTransportes = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:3000/transportes', {
          headers: { 'user-id': token }
        });
        setTransportes(response.data);
      } catch (err) {
        setError('Error al obtener los transportes');
      }
    };

    fetchTransportes();
  }, []);

  return (
    <Container>
      <h2 className="mb-4">Lista de Transportes</h2>
      {error && <Alert variant="danger">{error}</Alert>}
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>Número de Viaje</th>
            <th>Origen</th>
            <th>Destino</th>
            <th>Transportista</th>
            <th>Tarifa Acordada</th>
            <th>Fecha de Salida</th>
            <th>Fecha de Entrega</th>
          </tr>
        </thead>
        <tbody>
          {transportes.map((transporte) => (
            <tr key={transporte.id}>
              <td>{transporte.numeroViaje}</td>
              <td>{transporte.origen}</td>
              <td>{transporte.destino}</td>
              <td>{transporte.transportista}</td>
              <td>${transporte.tarifaAcordada.toFixed(2)}</td>
              <td>{new Date(transporte.fechaSalida).toLocaleDateString()}</td>
              <td>{new Date(transporte.fechaEntrega).toLocaleDateString()}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default ListaTransportes;
