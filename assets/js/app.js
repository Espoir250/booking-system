const STORAGE_KEY = "medibook-data";
const SESSION_KEY = "medibook-session";

const seedData = {
  users: [
    { id: "p1", role: "patient", name: "Alice Uwase", email: "patient@medibook.com", password: "password123", location: "Kigali" },
    {
      id: "d1",
      role: "doctor",
      name: "Dr. Eric Ndayisaba",
      email: "doctor@medibook.com",
      password: "password123",
      specialization: "Dentist",
      clinic: "CHUK",
      location: "Kigali",
      experience: 9,
      rating: 4.8,
      photo: "assets/images/doctors/eric-ndayisaba.jpg",
      bio: "Experienced family dentist focused on restorative and preventive care.",
      availability: [
        { day: "Monday", slot: "09:00 AM - 09:30 AM" },
        { day: "Monday", slot: "10:00 AM - 10:30 AM" },
        { day: "Wednesday", slot: "01:00 PM - 01:30 PM" },
        { day: "Friday", slot: "11:00 AM - 11:30 AM" }
      ],
      reviews: [
        { patient: "Diane K.", comment: "Very patient and professional." },
        { patient: "Martin N.", comment: "Clear explanation and fast treatment." }
      ]
    },
    {
      id: "d2",
      role: "doctor",
      name: "Dr. Grace Achieng",
      email: "grace@medibook.com",
      password: "password123",
      specialization: "Cardiologist",
      clinic: "King Faisal Hospital",
      location: "Kigali",
      experience: 12,
      rating: 4.9,
      photo: "assets/images/doctors/grace-achieng.jpg",
      bio: "Cardiology consultant for preventive screening and chronic care follow-up.",
      availability: [
        { day: "Tuesday", slot: "08:30 AM - 09:00 AM" },
        { day: "Thursday", slot: "03:00 PM - 03:30 PM" },
        { day: "Saturday", slot: "10:00 AM - 10:30 AM" }
      ],
      reviews: [{ patient: "J. Kamau", comment: "Excellent consultation and guidance." }]
    },
    {
      id: "d3",
      role: "doctor",
      name: "Dr. Samuel Okoro",
      email: "samuel@medibook.com",
      password: "password123",
      specialization: "Neurologist",
      clinic: "CHUK",
      location: "Kigali",
      experience: 11,
      rating: 4.7,
      photo: "assets/images/doctors/samuel-okoro.jpg",
      bio: "Neurology specialist helping patients manage complex nerve and brain conditions with clear treatment plans.",
      availability: [
        { day: "Monday", slot: "02:00 PM - 02:30 PM" },
        { day: "Thursday", slot: "09:30 AM - 10:00 AM" },
        { day: "Saturday", slot: "11:30 AM - 12:00 PM" }
      ],
      reviews: [{ patient: "Patrick M.", comment: "Very calm, clear, and reassuring during consultation." }]
    },
    {
      id: "d4",
      role: "doctor",
      name: "Dr. Musa Karekezi",
      email: "musa@medibook.com",
      password: "password123",
      specialization: "Dermatologist",
      clinic: "King Faisal Hospital",
      location: "Kigali",
      experience: 8,
      rating: 4.8,
      photo: "assets/images/doctors/musa-karekezi.jpg",
      bio: "Dermatologist focused on skin health, allergy care, and long-term treatment support.",
      availability: [
        { day: "Tuesday", slot: "01:00 PM - 01:30 PM" },
        { day: "Friday", slot: "09:00 AM - 09:30 AM" },
        { day: "Friday", slot: "10:00 AM - 10:30 AM" }
      ],
      reviews: [{ patient: "Linda U.", comment: "Helpful treatment plan and a very professional attitude." }]
    },
    {
      id: "d5",
      role: "doctor",
      name: "Dr. Aline Uwimana",
      email: "aline@medibook.com",
      password: "password123",
      specialization: "Gynecologist",
      clinic: "CHUK",
      location: "Kigali",
      experience: 10,
      rating: 4.9,
      photo: "assets/images/doctors/aline-uwimana.jpg",
      bio: "Gynecology and women's health consultant offering preventive care and follow-up appointments.",
      availability: [
        { day: "Wednesday", slot: "08:00 AM - 08:30 AM" },
        { day: "Thursday", slot: "11:00 AM - 11:30 AM" },
        { day: "Saturday", slot: "02:00 PM - 02:30 PM" }
      ],
      reviews: [{ patient: "Irene K.", comment: "Warm and professional from start to finish." }]
    },
    {
      id: "d6",
      role: "doctor",
      name: "Dr. Daniel Ncube",
      email: "daniel@medibook.com",
      password: "password123",
      specialization: "Orthopedist",
      clinic: "King Faisal Hospital",
      location: "Kigali",
      experience: 13,
      rating: 4.6,
      photo: "assets/images/doctors/daniel-ncube.jpg",
      bio: "Orthopedic consultant supporting injury recovery, bone care, and movement rehabilitation.",
      availability: [
        { day: "Monday", slot: "11:00 AM - 11:30 AM" },
        { day: "Wednesday", slot: "03:00 PM - 03:30 PM" },
        { day: "Friday", slot: "12:00 PM - 12:30 PM" }
      ],
      reviews: [{ patient: "Joseph R.", comment: "Explained recovery steps very clearly." }]
    },
    { id: "a1", role: "admin", name: "System Admin", email: "admin@medibook.com", password: "password123" }
  ],
  clinics: [
    { id: "c1", name: "CHUK", location: "Kigali" },
    { id: "c2", name: "King Faisal Hospital", location: "Kigali" }
  ],
  appointments: [
    {
      id: "appt1",
      patientId: "p1",
      doctorId: "d1",
      doctorName: "Dr. Eric Ndayisaba",
      patientName: "Alice Uwase",
      specialization: "Dentist",
      clinic: "Sunrise Dental Clinic",
      location: "Kigali",
      date: "2026-04-20",
      day: "Monday",
      slot: "09:00 AM - 09:30 AM",
      status: "confirmed",
      notes: "Confirmation sent via email/SMS demo flow."
    }
  ]
};

function getData() {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (!stored) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(seedData));
    return structuredClone(seedData);
  }
  const parsed = JSON.parse(stored);

  const seededUserIds = new Set(seedData.users.map((user) => user.id));
  parsed.users = parsed.users.map((user) => {
    const seededUser = seedData.users.find((seedUser) => seedUser.id === user.id);
    return seededUser ? { ...user, ...seededUser } : user;
  });
  seedData.users.forEach((user) => {
    if (!parsed.users.some((entry) => entry.id === user.id)) parsed.users.push(user);
  });

  const seededClinicIds = new Set(seedData.clinics.map((clinic) => clinic.id));
  parsed.clinics = parsed.clinics.map((clinic) => {
    const seededClinic = seedData.clinics.find((seedClinic) => seedClinic.id === clinic.id);
    return seededClinic ? { ...clinic, ...seededClinic } : clinic;
  });
  parsed.clinics = parsed.clinics.filter((clinic) => !clinic.id || !seededClinicIds.has(clinic.id) || seedData.clinics.some((seedClinic) => seedClinic.id === clinic.id));
  seedData.clinics.forEach((clinic) => {
    if (!parsed.clinics.some((entry) => entry.id === clinic.id)) parsed.clinics.push(clinic);
  });

  saveData(parsed);
  return parsed;
}

function saveData(data) { localStorage.setItem(STORAGE_KEY, JSON.stringify(data)); }
function getSession() { const stored = localStorage.getItem(SESSION_KEY); return stored ? JSON.parse(stored) : null; }
function setSession(user) { localStorage.setItem(SESSION_KEY, JSON.stringify({ id: user.id, role: user.role, name: user.name, email: user.email })); }
function byId(id) { return document.getElementById(id); }
function getQuery() { return new URLSearchParams(window.location.search); }
function formatRole(role) { return role.charAt(0).toUpperCase() + role.slice(1); }
function getWeekday(date) { return new Date(`${date}T12:00:00`).toLocaleDateString("en-US", { weekday: "long" }); }
function getDoctorPhoto(doctor) { return doctor?.photo || "assets/images/doctors/eric-ndayisaba.jpg"; }
function renderDoctorIdentity(doctor, size = "sm") {
  const className = size === "lg" ? "doctor-photo-lg" : size === "md" ? "doctor-photo" : "doctor-photo-sm";
  return `<div class="table-person"><img class="${className}" src="${getDoctorPhoto(doctor)}" alt="${doctor.name}"><span>${doctor.name}</span></div>`;
}

function redirectByRole(role) {
  if (role === "patient") window.location.href = "patient-dashboard.html";
  if (role === "doctor") window.location.href = "doctor-dashboard.html";
  if (role === "admin") window.location.href = "admin-dashboard.html";
}

function findDoctor(data, doctorId) {
  return data.users.find((user) => user.role === "doctor" && user.id === doctorId);
}

function isSlotBooked(data, doctorId, date, slot, ignoreAppointmentId = null) {
  return data.appointments.some((appointment) =>
    appointment.doctorId === doctorId &&
    appointment.date === date &&
    appointment.slot === slot &&
    appointment.status !== "cancelled" &&
    appointment.id !== ignoreAppointmentId
  );
}

function availableSlotsForDate(data, doctorId, date) {
  const doctor = findDoctor(data, doctorId);
  if (!doctor) return [];
  const day = getWeekday(date);
  return doctor.availability.filter((item) => item.day === day && !isSlotBooked(data, doctorId, date, item.slot));
}

function renderTable(columns, rows) {
  if (!rows.length) return `<div class="empty-state">No records found.</div>`;
  return `
    <div class="table-scroll">
      <table>
        <thead><tr>${columns.map((column) => `<th>${column}</th>`).join("")}</tr></thead>
        <tbody>${rows.map((row) => `<tr>${row.map((cell) => `<td>${cell}</td>`).join("")}</tr>`).join("")}</tbody>
      </table>
    </div>
  `;
}

function renderDoctorCards(doctors) {
  const target = byId("doctor-results");
  if (!target) return;
  if (!doctors.length) {
    target.innerHTML = `<div class="empty-state">No doctors matched your search. Try adjusting specialization, clinic, or location.</div>`;
    return;
  }
  target.innerHTML = doctors.map((doctor) => `
    <article class="doctor-card">
      <div class="doctor-card-top">
        <img class="doctor-photo" src="${getDoctorPhoto(doctor)}" alt="${doctor.name}">
        <div class="doctor-title-block">
          <h3>${doctor.name}</h3>
          <p>${doctor.specialization}</p>
          <span class="badge">${doctor.specialization}</span>
        </div>
      </div>
      <div class="meta-list">
        <span>${doctor.clinic}</span>
        <span>${doctor.location}</span>
        <span>${doctor.experience} years experience</span>
        <span>${doctor.rating} / 5 rating</span>
      </div>
      <p>${doctor.bio}</p>
      <div class="hero-actions">
        <a class="btn btn-primary" href="doctor-profile.html?id=${doctor.id}">View Profile</a>
      </div>
    </article>
  `).join("");
}

function initHomePage(data) {
  if (byId("stat-doctors")) byId("stat-doctors").textContent = data.users.filter((user) => user.role === "doctor").length;
  if (byId("stat-clinics")) byId("stat-clinics").textContent = data.clinics.length;
  if (byId("stat-bookings")) byId("stat-bookings").textContent = data.appointments.length;

  const searchForm = byId("home-search-form");
  if (!searchForm) return;
  searchForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const form = new FormData(searchForm);
    const query = new URLSearchParams({
      specialization: form.get("specialization") || "",
      clinic: form.get("clinic") || "",
      location: form.get("location") || ""
    });
    window.location.href = `doctors.html?${query.toString()}`;
  });
}

function initRegisterPage(data) {
  const roleSelect = byId("register-role");
  const doctorFields = byId("doctor-fields");
  const form = byId("register-form");

  if (roleSelect && doctorFields) {
    const toggleFields = () => doctorFields.classList.toggle("hidden", roleSelect.value !== "doctor");
    roleSelect.addEventListener("change", toggleFields);
    toggleFields();
  }

  if (!form) return;
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const formData = new FormData(form);
    const email = String(formData.get("email")).toLowerCase();
    if (data.users.some((user) => user.email.toLowerCase() === email)) {
      alert("An account with that email already exists.");
      return;
    }

    const role = String(formData.get("role"));
    const user = {
      id: `${role[0]}${Date.now()}`,
      role,
      name: formData.get("name"),
      email,
      password: formData.get("password"),
      location: formData.get("location") || ""
    };

    if (role === "doctor") {
      Object.assign(user, {
        specialization: formData.get("specialization"),
        clinic: formData.get("clinic"),
        experience: Number(formData.get("experience")) || 1,
        rating: 5,
        photo: "assets/images/doctors/eric-ndayisaba.jpg",
        bio: "New doctor profile. Update biography and availability from the dashboard.",
        availability: [],
        reviews: []
      });
      if (user.clinic && !data.clinics.some((clinic) => clinic.name.toLowerCase() === String(user.clinic).toLowerCase())) {
        data.clinics.push({ id: `c${Date.now()}`, name: user.clinic, location: user.location || "Not specified" });
      }
    }

    data.users.push(user);
    saveData(data);
    setSession(user);
    redirectByRole(role);
  });
}

function initLoginPage(data) {
  const form = byId("login-form");
  if (!form) return;
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const formData = new FormData(form);
    const email = String(formData.get("email")).toLowerCase();
    const password = String(formData.get("password"));
    const role = String(formData.get("role"));
    const user = data.users.find((entry) => entry.email.toLowerCase() === email && entry.password === password && entry.role === role);
    if (!user) {
      alert("Invalid login details for that role.");
      return;
    }
    setSession(user);
    redirectByRole(user.role);
  });
}

function initDoctorsPage(data) {
  const form = byId("doctor-filter-form");
  const query = getQuery();

  function applyFilters() {
    const specialization = (query.get("specialization") || "").toLowerCase();
    const clinic = (query.get("clinic") || "").toLowerCase();
    const location = (query.get("location") || "").toLowerCase();
    const doctors = data.users.filter((user) => user.role === "doctor").filter((doctor) =>
      (!specialization || doctor.specialization.toLowerCase().includes(specialization)) &&
      (!clinic || doctor.clinic.toLowerCase().includes(clinic)) &&
      (!location || doctor.location.toLowerCase().includes(location))
    );
    renderDoctorCards(doctors);
  }

  if (form) {
    ["specialization", "clinic", "location"].forEach((field) => {
      const input = form.elements.namedItem(field);
      if (input) input.value = query.get(field) || "";
    });
    form.addEventListener("submit", (event) => {
      event.preventDefault();
      const formData = new FormData(form);
      query.set("specialization", String(formData.get("specialization") || ""));
      query.set("clinic", String(formData.get("clinic") || ""));
      query.set("location", String(formData.get("location") || ""));
      window.history.replaceState({}, "", `doctors.html?${query.toString()}`);
      applyFilters();
    });
  }
  applyFilters();
}

function initDoctorProfilePage(data) {
  const target = byId("doctor-profile-view");
  if (!target) return;

  const doctorId = getQuery().get("id");
  const doctor = findDoctor(data, doctorId);
  if (!doctor) {
    target.innerHTML = `<div class="empty-state">Doctor not found.</div>`;
    return;
  }

  const today = new Date().toISOString().split("T")[0];
  target.innerHTML = `
    <article class="profile-card">
      <div class="profile-hero">
        <img class="doctor-photo-lg" src="${getDoctorPhoto(doctor)}" alt="${doctor.name}">
        <div class="doctor-title-block">
          <span class="badge">${doctor.specialization}</span>
          <h2>${doctor.name}</h2>
          <p>${doctor.specialization} at ${doctor.clinic}</p>
        </div>
      </div>
      <p>${doctor.bio}</p>
      <div class="meta-list">
        <span>Clinic: ${doctor.clinic}</span>
        <span>Location: ${doctor.location}</span>
        <span>Experience: ${doctor.experience} years</span>
        <span>Rating: ${doctor.rating} / 5</span>
      </div>
      <h3>Reviews</h3>
      <div class="review-list">
        ${doctor.reviews.length ? doctor.reviews.map((review) => `<span><strong>${review.patient}:</strong> ${review.comment}</span>`).join("") : "<span>No reviews yet.</span>"}
      </div>
    </article>
    <article class="profile-card">
      <h2>Book appointment</h2>
      <form id="booking-form" class="stack-form">
        <label>Select Date<input type="date" name="date" min="${today}" required></label>
        <label>Available Time Slots
          <select name="slot" id="booking-slot-select" required>
            <option value="">Choose a date first</option>
          </select>
        </label>
        <button class="btn btn-primary" type="submit">Confirm Booking</button>
      </form>
      <h3>Weekly availability</h3>
      <div class="availability-list">
        ${doctor.availability.map((item) => `<span class="slot-pill">${item.day}: ${item.slot}</span>`).join("") || "<span>No availability added yet.</span>"}
      </div>
    </article>
  `;

  const session = getSession();
  const bookingForm = byId("booking-form");
  const slotSelect = byId("booking-slot-select");
  const dateInput = bookingForm.elements.namedItem("date");

  function populateSlots() {
    const date = dateInput.value;
    const slots = date ? availableSlotsForDate(data, doctor.id, date) : [];
    if (!slots.length) {
      slotSelect.innerHTML = `<option value="">No slots available for that date</option>`;
      return;
    }
    slotSelect.innerHTML = `<option value="">Select a time slot</option>` +
      slots.map((entry) => `<option value="${entry.slot}">${entry.slot}</option>`).join("");
  }

  dateInput.addEventListener("change", populateSlots);
  bookingForm.addEventListener("submit", (event) => {
    event.preventDefault();
    if (!session || session.role !== "patient") {
      alert("Please login as a patient before booking.");
      window.location.href = "login.html";
      return;
    }

    const date = String(dateInput.value);
    const slot = String(slotSelect.value);
    if (!date || !slot) {
      alert("Please choose a valid date and time slot.");
      return;
    }
    if (isSlotBooked(data, doctor.id, date, slot)) {
      alert("That slot has just been booked. Please choose another.");
      populateSlots();
      return;
    }

    const patient = data.users.find((user) => user.id === session.id);
    data.appointments.push({
      id: `appt${Date.now()}`,
      patientId: session.id,
      doctorId: doctor.id,
      doctorName: doctor.name,
      patientName: patient?.name || session.name,
      specialization: doctor.specialization,
      clinic: doctor.clinic,
      location: doctor.location,
      date,
      day: getWeekday(date),
      slot,
      status: "pending",
      notes: "Confirmation notification queued in demo mode."
    });
    saveData(data);
    alert("Appointment booked successfully. Demo confirmation generated.");
    window.location.href = "patient-dashboard.html";
  });
}

function initPatientDashboard(data) {
  const session = getSession() || { id: "p1", role: "patient" };
  const appointments = data.appointments.filter((appointment) => appointment.patientId === session.id);
  const upcoming = appointments.filter((appointment) => appointment.status !== "cancelled");
  const cancelled = appointments.filter((appointment) => appointment.status === "cancelled");

  if (byId("patient-upcoming-count")) byId("patient-upcoming-count").textContent = upcoming.length;
  if (byId("patient-cancelled-count")) byId("patient-cancelled-count").textContent = cancelled.length;

  const target = byId("patient-appointments");
  if (!target) return;
  target.innerHTML = renderTable(
    ["Doctor", "Specialization", "Clinic", "Date", "Slot", "Status", "Actions"],
    appointments.map((appointment) => [
      renderDoctorIdentity(findDoctor(data, appointment.doctorId) || { name: appointment.doctorName, id: appointment.doctorId }, "sm"),
      appointment.specialization,
      appointment.clinic,
      appointment.date,
      appointment.slot,
      `<span class="status-pill ${appointment.status}">${appointment.status}</span>`,
      `<button class="btn btn-ghost" data-action="reschedule" data-id="${appointment.id}">Reschedule</button>
       <button class="btn btn-ghost" data-action="cancel" data-id="${appointment.id}">Cancel</button>`
    ])
  );

  target.addEventListener("click", (event) => {
    const actionTarget = event.target.closest("button[data-action]");
    if (!actionTarget) return;
    const appointmentId = actionTarget.dataset.id;
    const appointment = data.appointments.find((item) => item.id === appointmentId);
    if (!appointment) return;

    if (actionTarget.dataset.action === "cancel") {
      appointment.status = "cancelled";
      saveData(data);
      window.location.reload();
    }

    if (actionTarget.dataset.action === "reschedule") {
      const newDate = prompt("Enter new appointment date (YYYY-MM-DD):", appointment.date);
      if (!newDate) return;
      const slots = availableSlotsForDate(data, appointment.doctorId, newDate).filter((entry) => entry.slot !== appointment.slot || newDate !== appointment.date);
      if (!slots.length) {
        alert("No available slots for the new date.");
        return;
      }
      const newSlot = prompt(`Available slots:\n${slots.map((entry) => entry.slot).join("\n")}\n\nType one slot exactly:`, slots[0].slot);
      if (!newSlot) return;
      if (isSlotBooked(data, appointment.doctorId, newDate, newSlot, appointment.id)) {
        alert("That slot is already taken.");
        return;
      }
      appointment.date = newDate;
      appointment.day = getWeekday(newDate);
      appointment.slot = newSlot;
      appointment.status = "pending";
      appointment.notes = "Reschedule request submitted.";
      saveData(data);
      window.location.reload();
    }
  });
}

function initDoctorDashboard(data) {
  const session = getSession();
  const doctor = data.users.find((user) => user.role === "doctor" && user.id === (session?.id || "d1")) || data.users.find((user) => user.id === "d1");
  if (!doctor) return;

  const appointments = data.appointments.filter((appointment) => appointment.doctorId === doctor.id);
  if (byId("doctor-total-bookings")) byId("doctor-total-bookings").textContent = appointments.length;
  if (byId("doctor-pending-bookings")) byId("doctor-pending-bookings").textContent = appointments.filter((appointment) => appointment.status === "pending").length;

  const profileSummary = byId("doctor-profile-summary");
  if (profileSummary) {
    profileSummary.innerHTML = `
      <div class="profile-hero">
        <img class="doctor-photo" src="${getDoctorPhoto(doctor)}" alt="${doctor.name}">
        <div class="doctor-title-block">
          <h3>${doctor.name}</h3>
          <p>${doctor.specialization}</p>
        </div>
      </div>
      <div class="meta-list">
        <span>${doctor.specialization}</span>
        <span>${doctor.clinic}</span>
        <span>${doctor.location}</span>
        <span>${doctor.experience} years experience</span>
        <span>${doctor.rating} / 5 rating</span>
      </div>
    `;
  }

  const availabilityList = byId("doctor-availability-list");
  const renderAvailability = () => {
    if (!availabilityList) return;
    availabilityList.innerHTML = doctor.availability.length
      ? doctor.availability.map((item, index) => `<span class="slot-pill">${item.day}: ${item.slot} <button class="btn-link" data-remove-slot="${index}">x</button></span>`).join("")
      : `<div class="empty-state">No availability set yet.</div>`;
  };
  renderAvailability();

  const availabilityForm = byId("availability-form");
  if (availabilityForm) {
    availabilityForm.addEventListener("submit", (event) => {
      event.preventDefault();
      const formData = new FormData(availabilityForm);
      doctor.availability.push({ day: String(formData.get("day")), slot: String(formData.get("slot")) });
      saveData(data);
      availabilityForm.reset();
      renderAvailability();
    });
  }

  if (availabilityList) {
    availabilityList.addEventListener("click", (event) => {
      const button = event.target.closest("[data-remove-slot]");
      if (!button) return;
      doctor.availability.splice(Number(button.dataset.removeSlot), 1);
      saveData(data);
      renderAvailability();
    });
  }

  const target = byId("doctor-appointments");
  if (!target) return;
  target.innerHTML = renderTable(
    ["Patient", "Date", "Slot", "Clinic", "Status", "Actions"],
    appointments.map((appointment) => [
      appointment.patientName,
      appointment.date,
      appointment.slot,
      appointment.clinic,
      `<span class="status-pill ${appointment.status}">${appointment.status}</span>`,
      `<button class="btn btn-ghost" data-doctor-action="approve" data-id="${appointment.id}">Approve</button>
       <button class="btn btn-ghost" data-doctor-action="reject" data-id="${appointment.id}">Reject</button>`
    ])
  );

  target.addEventListener("click", (event) => {
    const actionTarget = event.target.closest("button[data-doctor-action]");
    if (!actionTarget) return;
    const appointment = data.appointments.find((item) => item.id === actionTarget.dataset.id);
    if (!appointment) return;
    appointment.status = actionTarget.dataset.doctorAction === "approve" ? "confirmed" : "cancelled";
    saveData(data);
    window.location.reload();
  });
}

function initAdminDashboard(data) {
  const users = data.users;
  const doctors = users.filter((user) => user.role === "doctor");
  const patients = users.filter((user) => user.role === "patient");

  if (byId("admin-total-users")) byId("admin-total-users").textContent = users.length;
  if (byId("admin-total-doctors")) byId("admin-total-doctors").textContent = doctors.length;
  if (byId("admin-total-patients")) byId("admin-total-patients").textContent = patients.length;
  if (byId("admin-total-appointments")) byId("admin-total-appointments").textContent = data.appointments.length;

  const usersTable = byId("admin-users-table");
  if (usersTable) {
    usersTable.innerHTML = renderTable(
      ["Name", "Email", "Role", "Location"],
      users.map((user) => [user.name, user.email, formatRole(user.role), user.location || "-"])
    );
  }

  const clinicsList = byId("admin-clinics-list");
  if (clinicsList) {
    clinicsList.innerHTML = data.clinics.length
      ? data.clinics.map((clinic) => `<div class="slot-pill">${clinic.name} - ${clinic.location}</div>`).join("")
      : `<div class="empty-state">No clinics available.</div>`;
  }

  const appointmentsTable = byId("admin-appointments-table");
  if (appointmentsTable) {
    appointmentsTable.innerHTML = renderTable(
      ["Patient", "Doctor", "Date", "Slot", "Status"],
      data.appointments.map((appointment) => [
        appointment.patientName,
        renderDoctorIdentity(findDoctor(data, appointment.doctorId) || { name: appointment.doctorName, id: appointment.doctorId }, "sm"),
        appointment.date,
        appointment.slot,
        `<span class="status-pill ${appointment.status}">${appointment.status}</span>`
      ])
    );
  }
}

function boot() {
  const data = getData();
  const page = document.body.dataset.page;
  if (page === "home") initHomePage(data);
  if (page === "login") initLoginPage(data);
  if (page === "register") initRegisterPage(data);
  if (page === "doctors") initDoctorsPage(data);
  if (page === "doctor-profile") initDoctorProfilePage(data);
  if (page === "patient-dashboard") initPatientDashboard(data);
  if (page === "doctor-dashboard") initDoctorDashboard(data);
  if (page === "admin-dashboard") initAdminDashboard(data);
}

document.addEventListener("DOMContentLoaded", boot);
