

export const initialStore = () => ({
  agendaSlug: "nika",
  contactos: [],
  cargando: false,
  error: null,
  traerContactos: async function (dispatch, state) {
    dispatch({ type: "SET_LOADING" });
    try {
      let respuesta = await fetch("https://playground.4geeks.com/contact/agendas/" + state.agendaSlug + "/contacts");
      let datos = await respuesta.json();
      dispatch({ type: "SET_CONTACTS", payload: datos.contacts });
    } catch (errorPeticion) {
      dispatch({ type: "SET_ERROR", payload: "Error al cargar contactos" });
    }
  },
  crearContacto: async function (dispatch, state, datosFormulario, cuandoTermine) {
    try {
      let respuesta = await fetch("https://playground.4geeks.com/contact/agendas/" + state.agendaSlug + "/contacts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(datosFormulario),
      });
      let datos = await respuesta.json();
      dispatch({ type: "ADD_CONTACT", payload: datos });
      cuandoTermine ? cuandoTermine() : null;
    } catch (errorPeticion) {
      cuandoTermine ? cuandoTermine("Error al guardar contacto") : null;
    }
  },
  actualizarContacto: async function (dispatch, state, idContacto, datosFormulario, cuandoTermine) {
    try {
      let respuesta = await fetch("https://playground.4geeks.com/contact/agendas/" + state.agendaSlug + "/contacts/" + idContacto, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(datosFormulario),
      });
      let datos = await respuesta.json();
      dispatch({ type: "UPDATE_CONTACT", payload: datos });
      cuandoTermine ? cuandoTermine() : null;
    } catch (errorPeticion) {
      cuandoTermine ? cuandoTermine("Error al guardar contacto") : null;
    }
  },
  eliminarContacto: async function (dispatch, state, idContacto, cuandoTermine) {
    try {
      await fetch("https://playground.4geeks.com/contact/agendas/" + state.agendaSlug + "/contacts/" + idContacto, { method: "DELETE" });
      dispatch({ type: "DELETE_CONTACT", payload: idContacto });
      cuandoTermine ? cuandoTermine() : null;
    } catch (errorPeticion) {
      cuandoTermine ? cuandoTermine("Error al eliminar contacto") : null;
    }
  }
});

export default function storeReducer(estado, accion = {}) {
  switch (accion.type) {
    case "SET_CONTACTS":
      return { ...estado, contactos: accion.payload, cargando: false };
    case "ADD_CONTACT":
      return { ...estado, contactos: [...estado.contactos, accion.payload] };
    case "UPDATE_CONTACT":
      return {
        ...estado,
        contactos: estado.contactos.map((contacto) =>
          contacto.id === accion.payload.id ? accion.payload : contacto
        ),
      };
    case "DELETE_CONTACT":
      return {
        ...estado,
        contactos: estado.contactos.filter((contacto) => contacto.id !== accion.payload),
      };
    case "SET_LOADING":
      return { ...estado, cargando: true };
    case "SET_ERROR":
      return { ...estado, error: accion.payload, cargando: false };
    default:
      return estado;
  }
}