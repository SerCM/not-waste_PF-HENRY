import { useDispatch } from "react-redux";
import { actualizarOrden } from "../../redux/actions";

const dispatch = useDispatch

function entregado(id) {
   dispatch(actualizarOrden(id, {state: "entregado"}))
}

function cancelado(id) {
    dispatch(actualizarOrden(id, {state: "cancelado"}))
}

export {entregado, cancelado}