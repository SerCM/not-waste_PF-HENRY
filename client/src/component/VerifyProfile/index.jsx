import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getCustomer, getManagers, getSellers } from "../../redux/actions";

function VerifyProfile(props) { //se debe pasar como propiedad el email a buscar en la base de datos

    const dispatch = useDispatch()
    const seller = useSelector(state => state.seller)
    useEffect(() => {
        dispatch(getSellers())
    }, [dispatch])
    const customer = useSelector(state => state.customer)
    useEffect(() => {
        dispatch(getCustomer())
    }, [dispatch])
    const managers = useSelector(state => state.managers)
    useEffect(() => {
        dispatch(getManagers())
    }, [dispatch])

    let respuesta = { exists: false }
    if (props) {
        seller && seller.map(e => {
            if (e.email === props.toLowerCase()) {
                respuesta = { exists: true, type: "seller", ...e }
            }
        })
        customer && customer.map(e => {
            if (e.email === props.toLowerCase()) {
                respuesta = { exists: true, type: "customer", ...e }
            }
        })
        managers && managers.map(e => {
            if (e.username === props.toLowerCase()) {
                respuesta = { exists: true, type: "manager"}
            }
        })
    }

    return respuesta
}

export default VerifyProfile