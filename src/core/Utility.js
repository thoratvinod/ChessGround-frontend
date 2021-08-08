export const charCodeA = "a".charCodeAt(0);

export const charCodeH = "h".charCodeAt(0);

export const charCode0 = "0".charCodeAt(0);

export const positionToArrayIndex = (position) => {

    const letter = position.charCodeAt(0);
    const num    = position.charCodeAt(1) - charCode0;

    let letterNum = letter - charCodeA + 1;
    return letterNum + (num-1) * 8;
}
