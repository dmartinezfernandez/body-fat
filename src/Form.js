import { useState } from "react";
import { ComputeBodyFat, CM, IN, MALE, FEMALE } from "./Calculator";

// Allow query string parameters for initialization.
const qs = (function () {
    const params = new URLSearchParams(window.location.search);
    let unit, gender, height, neck, abdomen, waist, hip;
    if (params.has('gender')) {
        let param = params.get('gender');
        if (param === MALE || param === FEMALE)
            gender = param;
    }
    if (params.has("unit")) {
        let param = params.get("unit").toLowerCase();
        if (param === CM || param === IN)
            unit = param;
    }
    else {
        unit = CM;
    }
    if (params.has("height")) {
        let param = params.get("height");
        if (!isNaN(param))
            height = Number(param);
    }
    if (params.has("neck")) {
        let param = params.get("neck");
        if (!isNaN(param))
            neck = Number(param);
    }
    if (params.has("abdomen")) {
        let param = params.get("abdomen");
        if (!isNaN(param))
            abdomen = Number(param);
    }
    if (params.has("waist")) {
        let param = params.get("waist");
        if (!isNaN(param))
            waist = Number(param);
    }
    if (params.has("hip")) {
        let param = params.get("hip");
        if (!isNaN(param))
            hip = Number(param);
    }
    return { unit, gender, height, neck, abdomen, waist, hip };
}());

function Form() {

    const [data, setData] = useState({ unit: qs.unit || CM, gender: qs.gender, height: qs.height, neck: qs.neck, abdomen: qs.abdomen, waist: qs.waist, hip: qs.hip, bodyFat: undefined });

    const submit = (e) => {
        e.preventDefault();
        let url = window.location.origin + window.location.pathname +
            "?gender=" + data.gender +
            "&unit=" + data.unit +
            "&height=" + data.height +
            "&neck=" + data.neck +
            (
                data.gender === MALE ? `&abdomen=${data.abdomen}` :
                    data.gender === FEMALE ? `&waist=${data.waist}&hip=${data.hip}` : ''
            );
        window.location = url;
    }

    const onUnitChanged = (e, data) => {
        const unit = e.target.value;
        if (data.unit === CM && unit === IN) {
            data.height = !isNaN(data.height) ? data.height / 2.54 : undefined;
            data.neck = !isNaN(data.neck) ? data.neck / 2.54 : undefined;
            data.abdomen = !isNaN(data.abdomen) ? data.abdomen / 2.54 : undefined;
            data.waist = !isNaN(data.waist) ? data.waist / 2.54 : undefined;
            data.hip = !isNaN(data.hip) ? data.hip / 2.54 : undefined;
        }
        else if (data.unit === IN && unit === CM) {
            data.height = !isNaN(data.height) ? data.height * 2.54 : undefined;
            data.neck = !isNaN(data.neck) ? data.neck * 2.54 : undefined;
            data.abdomen = !isNaN(data.abdomen) ? data.abdomen * 2.54 : undefined;
            data.waist = !isNaN(data.waist) ? data.waist * 2.54 : undefined;
            data.hip = !isNaN(data.hip) ? data.hip * 2.54 : undefined;
        }
        data.unit = unit;
        setData({ ...data });
    }

    data.bodyFat = ComputeBodyFat(data.unit, data.gender, data.height, data.neck, data.abdomen, data.waist, data.hip);
    return (
        <div>
            Length unit:<br />
            <label>
                <input type="radio" checked={data.unit === CM} name="unit" value={CM} onChange={e => onUnitChanged(e, data)} />
                Centimeter
            </label>
            <label>
                <input type="radio" checked={data.unit === IN} name="unit" value={IN} onChange={e => onUnitChanged(e, data)} />
                Inch
            </label>
            <br />
            Gender:<br />
            <label>
                <input type="radio" checked={data.gender === MALE} name="gender" value={MALE} onChange={e => setData({ ...data, gender: e.target.value })} /> Male
            </label>
            <label>
                <input type="radio" checked={data.gender === FEMALE} name="gender" value={FEMALE} onChange={e => setData({ ...data, gender: e.target.value })} /> Female
            </label>
            <br />
            {
                (data.gender === MALE || data.gender === FEMALE) &&
                <label>
                    Height:<br />
                    <input type="text" value={data.height} placeholder="Enter height here" onChange={e => setData({ ...data, height: e.target.value })} /><br />
                </label>
            }
            {
                (data.gender === MALE || data.gender === FEMALE) &&
                <label>
                    Neck:<br />
                    <input type="text" value={data.neck} placeholder="Enter neck here" onChange={e => setData({ ...data, neck: e.target.value })} /><br />
                </label>
            }
            {
                data.gender === MALE &&
                <label>
                    Abdomen:<br />
                    <input type="text" value={data.abdomen} placeholder="Enter abdomen here" onChange={e => setData({ ...data, abdomen: e.target.value })} /><br />
                </label>
            }
            {
                data.gender === FEMALE &&
                <label>
                    Waist:<br />
                    <input type="text" value={data.waist} placeholder="Enter waist here" onChange={e => setData({ ...data, waist: e.target.value })} /><br />
                </label>
            }
            {
                data.gender === FEMALE &&
                <label>
                    Hip:<br />
                    <input type="text" value={data.hip} placeholder="Enter hip here" onChange={e => setData({ ...data, hip: e.target.value })} /><br />
                </label>
            }
            {
                data.bodyFat !== undefined &&
                <label>Body Fat Ratio: {data.bodyFat && data.bodyFat.toFixed(0)} %<br />
                </label>
            }

            <br />
            <div>
                <a href="." onClick={e => submit(e)}>Submit</a><br />
                Click submit and add the new URL to your browser bookmarks.<br />
                <br />
            </div>

        </div>
    );
}

export default Form;