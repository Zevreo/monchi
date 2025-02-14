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
            .then(res => {
                if (props.Multiplier) {
                    if(props.Target === "JPY") setValue(Number((res.data.Value) * props.Multiplier).toFixed(0));
                    else setValue(Number((res.data.Value) * props.Multiplier).toFixed(2));
                }
                else setValue(Number(res.data.Value));
            })
            .catch(err => console.log(err));
    }, [props.Current, props.Target, props.Value, props.Multiplier]);
    if (value !== null) return value;
};
export async function ConverterMultiply(Current, Target, Value, Multiplier) {
    let response = null;
    const body = { Current, Target, Value }
    await axios.post('/api/fixed/currency/convert', body)
        .then(res => response = (Number(res.data.Value) * Multiplier))
        .catch(err => console.log(err));
    return response;
}
export default Converter;