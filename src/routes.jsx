import {
    createBrowserRouter,
    createRoutesFromElements,
    Route,
} from "react-router-dom";
import { Layout } from "./pages/Layout";
import Home from "./pages/Home";
import Contacto from "./pages/Contacto";
import { Single } from "./pages/Single";
import { Demo } from "./pages/Demo";

export const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Layout />} errorElement={<h1>Not found!</h1>} >
        <Route path= "/" element={<Home />} />
        <Route path="/add" element={<Contacto />} />
        <Route path="/edit/:id" element={<Contacto />} />
        <Route path="/single/:theId" element={ <Single />} />
        <Route path="/demo" element={<Demo />} />
      </Route>
    )
);