import React, { useState } from 'react'
import { Trash2Icon, AlertCircleIcon } from 'lucide-react'

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Checkbox } from "@/components/ui/checkbox"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

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
      <div>
        <label htmlFor="patientName" className="block font-bold text-gray-700 mb-1">
          Nombre del Paciente:
        </label>
        <Input
          type="text"
          id="patientName"
          name="patientName"
          value={appointment.patientName}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label htmlFor="patientId" className="block font-bold text-gray-700 mb-1">
          Identificación del Paciente:
        </label>
        <Input
          type="text"
          id="patientId"
          name="patientId"
          value={appointment.patientId}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label htmlFor="date" className="block font-bold text-gray-700 mb-1">
          Fecha de la Cita:
        </label>
        <Input
          type="date"
          id="date"
          name="date"
          value={appointment.date}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label htmlFor="time" className="block font-bold text-gray-700 mb-1">
          Hora de la Cita:
        </label>
        <Input
          type="time"
          id="time"
          name="time"
          value={appointment.time}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label htmlFor="doctor" className="block font-bold text-gray-700 mb-1">
          Médico Asignado:
        </label>
        <Select 
          name="doctor" 
          value={appointment.doctor} 
          onValueChange={(value) => handleChange({ target: { name: 'doctor', value } })}
        >
          <SelectTrigger>
            <SelectValue placeholder="Seleccione un médico" />
          </SelectTrigger>
          <SelectContent>
            {doctors.map((doctor) => (
              <SelectItem key={doctor.id} value={doctor.id}>
                {doctor.name} - {doctor.specialty}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div>
        <label htmlFor="reason" className="block font-bold text-gray-700 mb-1">
          Motivo de la Cita:
        </label>
        <Input
          type="text"
          id="reason"
          name="reason"
          value={appointment.reason}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label htmlFor="status" className="block font-bold text-gray-700 mb-1">
          Estado de la Cita:
        </label>
        <Select 
          name="status" 
          value={appointment.status} 
          onValueChange={(value) => handleChange({ target: { name: 'status', value } })}
        >
          <SelectTrigger>
            <SelectValue placeholder="Seleccione un estado" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Pendiente">Pendiente</SelectItem>
            <SelectItem value="Confirmada">Confirmada</SelectItem>
            <SelectItem value="Cancelada">Cancelada</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <Button type="submit">
        {appointmentToEdit ? 'Actualizar Cita' : 'Agendar Cita'}
      </Button>
    </form>
  )
}

const AppointmentTable = ({ appointments, onDelete, onSelect }) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Seleccionar</TableHead>
          <TableHead>Paciente</TableHead>
          <TableHead>Fecha</TableHead>
          <TableHead>Hora</TableHead>
          <TableHead>Médico</TableHead>
          <TableHead>Motivo</TableHead>
          <TableHead>Estado</TableHead>
          <TableHead>Acciones</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {appointments.map((appointment, index) => (
          <TableRow key={index}>
            <TableCell>
              <Checkbox
                checked={appointment.selected}
                onCheckedChange={(checked) => onSelect(index, checked)}
              />
            </TableCell>
            <TableCell>{appointment.patientName}</TableCell>
            <TableCell>{appointment.date}</TableCell>
            <TableCell>{appointment.time}</TableCell>
            <TableCell>{appointment.doctor}</TableCell>
            <TableCell>{appointment.reason}</TableCell>
            <TableCell>{appointment.status}</TableCell>
            <TableCell>
              <Button variant="ghost" onClick={() => onDelete(index)}>
                <Trash2Icon className="h-4 w-4" />
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
    // Add more doctors as needed
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
          <Dialog open={isAddModalOpen} onOpenChange={setIsAddModalOpen}>
            <DialogTrigger asChild>
              <Button>Agendar Cita</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Agendar Nueva Cita</DialogTitle>
              </DialogHeader>
              <AppointmentForm onSubmit={handleSubmit} onClose={() => setIsAddModalOpen(false)} doctors={doctors} />
            </DialogContent>
          </Dialog>
          <Button onClick={handleUpdate}>Actualizar Cita</Button>
        </div>
        {showAlert && (
          <Alert variant="destructive">
            <AlertCircleIcon className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>
              Por favor, seleccione una cita antes de actualizar.
            </AlertDescription>
          </Alert>
        )}
      </div>
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Lista de Citas</h2>
        <AppointmentTable appointments={appointments} onDelete={handleDelete} onSelect={handleSelect} />
      </div>
      {isUpdateModalOpen && selectedAppointmentIndex !== null && (
        <Dialog open={isUpdateModalOpen} onOpenChange={setIsUpdateModalOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Actualizar Cita</DialogTitle>
            </DialogHeader>
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
