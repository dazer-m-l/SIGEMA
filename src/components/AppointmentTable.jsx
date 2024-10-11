import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableRow, Checkbox, Button } from '@mui/material';
import { Trash2 } from 'lucide-react';

const AppointmentTable = ({ appointments, onDelete, onSelect }) => {
  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>Seleccionar</TableCell>
          <TableCell>Paciente</TableCell>
          <TableCell>Fecha</TableCell>
          <TableCell>Hora</TableCell>
          <TableCell>Médico</TableCell>
          <TableCell>Motivo</TableCell>
          <TableCell>Estado</TableCell>
          <TableCell>Acciones</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {appointments.map((appointment, index) => (
          <TableRow key={index}>
            <TableCell>
              <Checkbox
                checked={appointment.selected}
                onChange={(e) => onSelect(index, e.target.checked)}
              />
            </TableCell>
            <TableCell>{appointment.patientName}</TableCell>
            <TableCell>{appointment.date}</TableCell>
            <TableCell>{appointment.time}</TableCell>
            <TableCell>{appointment.doctor}</TableCell>
            <TableCell>{appointment.reason}</TableCell>
            <TableCell>{appointment.status}</TableCell>
            <TableCell>
              <Button variant="text" onClick={() => onDelete(index)}>
                <Trash2 />
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default AppointmentTable;
