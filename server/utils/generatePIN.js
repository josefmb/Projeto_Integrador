const generatePIN = () => {
    let PIN = [];

    for (let idx = 0; idx < 6; ++idx) {
        let min = Math.ceil(0);
        let max = Math.floor(9);

        PIN[idx] = Math.floor(Math.random() * (max - min) + min);
    }

    return PIN;
}