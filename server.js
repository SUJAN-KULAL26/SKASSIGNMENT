// Synergia Event Booking API
// -------------------------------------------
// Import dependencies
const express = require('express');
const app = express();
const PORT = 3000;

// Middleware to parse JSON
app.use(express.json());

// Temporary in-memory storage
let events = [
  { id: 1, name: "AI & ML Workshop", date: "2025-11-10", venue: "Auditorium A" },
  { id: 2, name: "Web Dev Hackathon", date: "2025-11-12", venue: "Lab 1" }
];

let bookings = [
  { id: 1, eventId: 1, name: "John Doe", email: "john@example.com" },
  { id: 2, eventId: 2, name: "Jane Smith", email: "jane@example.com" }
];

// -------------------------------------------
// EVENT ROUTES
// -------------------------------------------

// 1. GET /events - Get all events
app.get('/events', (req, res) => {
  res.status(200).json(events);
});

// 2. POST /events/add - Create a new event
app.post('/events/add', (req, res) => {
  const { name, date, venue } = req.body;
  if (!name || !date || !venue) {
    return res.status(400).json({ message: "Please provide name, date, and venue" });
  }

  const newEvent = {
    id: events.length + 1,
    name,
    date,
    venue
  };
  events.push(newEvent);
  res.status(201).json({ message: "Event added successfully", event: newEvent });
});

// 3. GET /event/:id - Get event by ID
app.get('/event/:id', (req, res) => {
  const event = events.find(e => e.id === parseInt(req.params.id));
  if (!event) return res.status(404).json({ message: "Event not found" });
  res.status(200).json(event);
});

// 4. PUT /event/:id - Update event details
app.put('/event/:id', (req, res) => {
  const event = events.find(e => e.id === parseInt(req.params.id));
  if (!event) return res.status(404).json({ message: "Event not found" });

  const { name, date, venue } = req.body;
  if (name) event.name = name;
  if (date) event.date = date;
  if (venue) event.venue = venue;

  res.status(200).json({ message: "Event updated successfully", event });
});

// 5. DELETE /event/:id - Cancel an event
app.delete('/event/:id', (req, res) => {
  const eventIndex = events.findIndex(e => e.id === parseInt(req.params.id));
  if (eventIndex === -1) return res.status(404).json({ message: "Event not found" });

  const removedEvent = events.splice(eventIndex, 1);
  res.status(200).json({ message: "Event deleted successfully", removedEvent });
});

// -------------------------------------------
// BOOKING ROUTES
// -------------------------------------------

// 1. GET /api/bookings - Get all bookings
app.get('/api/bookings', (req, res) => {
  res.status(200).json(bookings);
});

// 2. POST /api/bookings - Create a new booking
app.post('/api/bookings', (req, res) => {
  const { eventId, name, email } = req.body;
  const event = events.find(e => e.id === parseInt(eventId));

  if (!event) return res.status(404).json({ message: "Event not found" });
  if (!name || !email) return res.status(400).json({ message: "Please provide name and email" });

  const newBooking = {
    id: bookings.length + 1,
    eventId,
    name,
    email
  };

  bookings.push(newBooking);
  res.status(201).json({ message: "Booking successful", booking: newBooking });
});

// 3. GET /api/bookings/:id - Get booking by ID
app.get('/api/bookings/:id', (req, res) => {
  const booking = bookings.find(b => b.id === parseInt(req.params.id));
  if (!booking) return res.status(404).json({ message: "Booking not found" });
  res.status(200).json(booking);
});

// 4. PUT /api/bookings/:id - Update participant details
app.put('/api/bookings/:id', (req, res) => {
  const booking = bookings.find(b => b.id === parseInt(req.params.id));
  if (!booking) return res.status(404).json({ message: "Booking not found" });

  const { name, email } = req.body;
  if (name) booking.name = name;
  if (email) booking.email = email;

  res.status(200).json({ message: "Booking updated successfully", booking });
});

// 5. DELETE /api/bookings/:id - Cancel a booking
app.delete('/api/bookings/:id', (req, res) => {
  const index = bookings.findIndex(b => b.id === parseInt(req.params.id));
  if (index === -1) return res.status(404).json({ message: "Booking not found" });

  const removedBooking = bookings.splice(index, 1);
  res.status(200).json({ message: "Booking cancelled successfully", removedBooking });
});

// -------------------------------------------
// START SERVER
// -------------------------------------------
app.listen(PORT, () => {
  console.log(`✅ Synergia Event Booking API running on http://localhost:${PORT}`);
});
