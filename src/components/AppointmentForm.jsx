import React, { useState } from 'react'
import { Trash2, AlertCircle } from 'lucide-react'
import { 
  Button, 
  TextField, 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableRow, 
  Dialog, 
  DialogActions, 
  DialogContent, 
  DialogContentText, 
  DialogTitle,
  Checkbox,
  Alert,
  Select,
  MenuItem,
  FormControl,
  InputLabel
} from '@mui/material'

const AppointmentForm = ({ onSubmit, appointmentToEdit, onClose, doctors }) => {
  const [appointment, setAppointment] = useState(
    appointmentToEdit || {
      patientName: '',
      patientId: '',
      date: '',
      time: '',
      doctor: '',
      reason: '',
      status: 'Pendiente',
    }
  )

  const handleChange = (e) => {
    const { name, value } = e.target
    setAppointment((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    onSubmit(appointment)
    onClose()
  }

  return (
    <form onSubmit={handleSubmit} className="grid gap-4">
      <TextField
        label="Nombre del Paciente"
        name="patientName"
        value={appointment.patientName}
        onChange={handleChange}
        required
        fullWidth
      />
      <TextField
        label="Identificación del Paciente"
        name="patientId"
        value={appointment.patientId}
        onChange={handleChange}
        required
        fullWidth
      />
      <TextField
        label="Fecha de la Cita"
        name="date"
        type="date"
        value={appointment.date}
        onChange={handleChange}
        required
        fullWidth
        InputLabelProps={{
          shrink: true,
        }}
      />
      <TextField
        label="Hora de la Cita"
        name="time"
        type="time"
        value={appointment.time}
        onChange={handleChange}
        required
        fullWidth
        InputLabelProps={{
          shrink: true,
        }}
      />
      <FormControl fullWidth>
        <InputLabel id="doctor-label">Médico Asignado</InputLabel>
        <Select
          labelId="doctor-label"
          name="doctor"
          value={appointment.doctor}
          onChange={handleChange}
        >
          {doctors.map((doctor) => (
            <MenuItem key={doctor.id} value={doctor.id}>
              {doctor.name} - {doctor.specialty}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <TextField
        label="Motivo de la Cita"
        name="reason"
        value={appointment.reason}
        onChange={handleChange}
        required
        fullWidth
      />
      <FormControl fullWidth>
        <InputLabel id="status-label">Estado de la Cita</InputLabel>
        <Select
          labelId="status-label"
          name="status"
          value={appointment.status}
          onChange={handleChange}
        >
          <MenuItem value="Pendiente">Pendiente</MenuItem>
          <MenuItem value="Confirmada">Confirmada</MenuItem>
          <MenuItem value="Cancelada">Cancelada</MenuItem>
        </Select>
      </FormControl>
      <Button type="submit" variant="contained">
        {appointmentToEdit ? 'Actualizar Cita' : 'Agendar Cita'}
      </Button>
    </form>
  )
}

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
  )
}

const Component = () => {
  const [appointments, setAppointments] = useState([
    {
      patientName: 'Juan Pérez',
      patientId: '12345',
      date: '2023-06-15',
      time: '10:00',
      doctor: '1',
      reason: 'Chequeo anual',
      status: 'Pendiente',
      selected: false,
    }
  ])
  const [showAlert, setShowAlert] = useState(false)
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false)
  const [selectedAppointmentIndex, setSelectedAppointmentIndex] = useState(null)

  const doctors = [
    { id: '1', name: 'Dr. García', specialty: 'Cardiología' },
    { id: '2', name: 'Dra. Rodríguez', specialty: 'Pediatría' },
    // Agrega más médicos según sea necesario
  ]

  const handleSubmit = (newAppointment) => {
    setAppointments([...appointments, { ...newAppointment, selected: false }])
  }

  const handleEdit = (updatedAppointment) => {
    const updatedAppointments = [...appointments]
    updatedAppointments[selectedAppointmentIndex] = { ...updatedAppointment, selected: false }
    setAppointments(updatedAppointments)
    setSelectedAppointmentIndex(null)
  }

  const handleDelete = (index) => {
    const updatedAppointments = appointments.filter((_, i) => i !== index)
    setAppointments(updatedAppointments)
  }

  const handleSelect = (index, checked) => {
    const updatedAppointments = [...appointments]
    updatedAppointments[index].selected = checked
    setAppointments(updatedAppointments)
  }

  const handleUpdate = () => {
    const selectedAppointment = appointments.findIndex(appointment => appointment.selected)
    if (selectedAppointment === -1) {
      setShowAlert(true)
      setTimeout(() => setShowAlert(false), 3000)
    } else {
      setSelectedAppointmentIndex(selectedAppointment)
      setIsUpdateModalOpen(true)
    }
  }

  return (
    <div className="space-y-8 p-4 max-w-4xl mx-auto">
      <div>
        <h1 className="text-2xl font-bold mb-2">Citas Médicas</h1>
        <p className="text-muted-foreground">Esta sección muestra las citas médicas programadas.</p>
      </div>
      <div className="space-y-4">
        <div className="flex justify-between">
          <Button variant="contained" onClick={() => setIsAddModalOpen(true)}>
            Agendar Cita
          </Button>
          <Button variant="contained" onClick={handleUpdate}>
            Actualizar Cita
          </Button>
        </div>
        {showAlert && (
          <Alert severity="error" onClose={() => setShowAlert(false)}>
            Por favor, seleccione una cita antes de actualizar.
          </Alert>
        )}
      </div>
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Lista de Citas</h2>
        <AppointmentTable appointments={appointments} onDelete={handleDelete} onSelect={handleSelect} />
      </div>
      <Dialog open={isAddModalOpen} onClose={() => setIsAddModalOpen(false)}>
        <DialogTitle>Agendar Nueva Cita</DialogTitle>
        <DialogContent>
          <AppointmentForm onSubmit={handleSubmit} onClose={() => setIsAddModalOpen(false)} doctors={doctors} />
        </DialogContent>
      </Dialog>
      {isUpdateModalOpen && selectedAppointmentIndex !== null && (
        <Dialog open={isUpdateModalOpen} onClose={() => setIsUpdateModalOpen(false)}>
          <DialogTitle>Actualizar Cita</DialogTitle>
          <DialogContent>
            <AppointmentForm
              onSubmit={handleEdit}
              appointmentToEdit={appointments[selectedAppointmentIndex]}
              onClose={() => setIsUpdateModalOpen(false)}
              doctors={doctors}
            />
          </DialogContent>
        </Dialog>
      )}
    </div>
  )
}

export default AppointmentForm;
