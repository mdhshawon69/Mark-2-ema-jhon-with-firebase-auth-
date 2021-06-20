import androids from './android';
import cameras from './camera';
import laptops from './laptop';

const fakeData = [...androids, ...cameras, ...laptops];

const shuffle = (a) => {
    // eslint-disable-next-line no-plusplus
    for (let i = a.length; i; i--) {
        const j = Math.floor(Math.random() * i);
        // eslint-disable-next-line no-param-reassign
        [a[i - 1], a[j]] = [a[j], a[i - 1]];
    }
};

shuffle(fakeData);

export default fakeData;
