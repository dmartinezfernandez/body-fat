const CM = 'cm', IN = 'in', MALE = 'male', FEMALE = 'female';

const ComputeBodyFat = (
    unit,
    gender,
    height,
    neck,
    abdomen,
    waist,
    hip) => {
    let bodyFat = undefined;
    if (unit === CM) {
        height = height / 2.54;
        abdomen = abdomen / 2.54;
        waist = waist / 2.54;
        neck = neck / 2.54;
        hip = hip / 2.54;
        unit = IN;
    }
    if (Boolean(height) && Boolean(neck)) {
        if (gender === FEMALE && Boolean(waist) && Boolean(hip))
            bodyFat = 163.205 * Math.log10(waist + hip - neck) - 97.684 * Math.log10(height) - 78.387;
        else if (gender === MALE && Boolean(abdomen))
            bodyFat = 86.010 * Math.log10(abdomen - neck) - 70.041 * Math.log10(height) + 36.76;
    }

    return Boolean(bodyFat) && !isNaN(bodyFat) && bodyFat >= 0 && bodyFat <= 100 ? bodyFat : undefined;
};

export { ComputeBodyFat, CM, IN, MALE, FEMALE };