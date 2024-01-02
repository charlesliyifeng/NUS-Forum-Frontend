import { useParams } from "react-router-dom";

function get_url_id(): number {
    const { id } = useParams();
    if (id) {
        return +id;
    } else {
        return -1;
    }
}

export default get_url_id;
