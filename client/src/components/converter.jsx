import React, { useEffect, useState } from "react";
import axios from "axios";

export function Converter(props) {
    const [value, setValue] = useState(null);
    useEffect(() => {
        const body = {
            Current: props.Current,
            Target: props.Target,
            Value: props.Value
        }
        axios.post('/api/fixed/currency/convert', body)
            .then(res => setValue(res.data.Value))
            .catch(err => console.log(err));
    });
    return value;
};
export default Converter;