import { DynLoadFolder } from "../components/base/DynLoadFolder.js";

// Set PathFactory
const [ call, addFunctions ] = DynLoadFolder('../../examples/dynload/');

export const init = async () => {
    await addFunctions('lib1');
    call('lib1').greet('Earthling');
};