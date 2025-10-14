
import React, { useState } from "react";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import { useNavigate, useParams } from "react-router-dom";

function Contacto() {
  const editando = params.id ? true : false;
  const datos = useGlobalReducer();
  const navegar = useNavigate();
  const params = useParams();
  const [form, setForm] = useState({ name: "", phone: "", email: "", address: "" });
  const [error, setError] = useState("");

  function cambiar(evento) {
    setForm({ ...form, [evento.target.name]: evento.target.value });
  }

  function enviar(evento) {
    evento.preventDefault();
    setError("");
    var campos = [form.name, form.phone, form.email, form.address];
    var vacio = false;
    for (var i = 0; i < campos.length; i++) {
      if (campos[i] === "") {
        vacio = true;
      }
    }
    if (vacio) {
      setError("Todos los campos son obligatorios");
      return;
    }
    if (params.id) {
      datos.store.editarContacto(datos.dispatch, datos.store, params.id, form, function (err) {
        if (err) setError(err)
        else navegar("/");
      });
    } else {
      datos.store.agregarContacto(datos.dispatch, datos.store, form, function (err) {
        if (err) setError(err)
        else navegar("/");
      });
    }
  }

  return (
    <div className="container form-container" style={{ maxWidth: 700, background: '#fff', border: 'none', boxShadow: 'none', paddingTop: 40 }}>
      <h1 style={{ textAlign: 'center', fontWeight: 600, fontSize: '2.5rem', marginBottom: 32 }}>
        {editando ? "Edit contact" : "Add a new contact"}
      </h1>
      <form onSubmit={enviar} className="contact-form" style={{ gap: 24 }}>
        <label style={{ fontWeight: 500, marginBottom: 4 }}>Full Name</label>
        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={form.name}
          onChange={cambiar}
          style={{ fontSize: '1.1rem' }}
        />
        <label style={{ fontWeight: 500, marginBottom: 4 }}>Email</label>
        <input
          type="email"
          name="email"
          placeholder="Enter email"
          value={form.email}
          onChange={cambiar}
          style={{ fontSize: '1.1rem' }}
        />
        <label style={{ fontWeight: 500, marginBottom: 4 }}>Phone</label>
        <input
          type="text"
          name="phone"
          placeholder="Enter phone"
          value={form.phone}
          onChange={cambiar}
          style={{ fontSize: '1.1rem' }}
        />
        <label style={{ fontWeight: 500, marginBottom: 4 }}>Address</label>
        <input
          type="text"
          name="address"
          placeholder="Enter address"
          value={form.address}
          onChange={cambiar}
          style={{ fontSize: '1.1rem' }}
        />
        {error && <p className="error">{error}</p>}
        <button type="submit" style={{ width: '100%', background: '#1677ff', color: '#fff', fontWeight: 500, fontSize: '1.1rem', border: 'none', borderRadius: 4, padding: '12px 0', marginTop: 16, marginBottom: 8, cursor: 'pointer' }}>
          {editando ? "save" : "save"}
        </button>
      </form>
      <div style={{ marginTop: 8, textAlign: 'left' }}>
        <a href="/" style={{ color: '#1677ff', fontSize: '1rem', textDecoration: 'underline' }}>or get back to contacts</a>
      </div>
    </div>
  );
}

export default Contacto;
