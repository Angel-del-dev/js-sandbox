import { load } from "./lib/module_loader.js";

const dev = false;

if(dev) {
    load('Test_Proxy');
} else {
    const container = document.getElementById('root');
    const ul = document.createElement('ul');
    ul.classList.add('default_ul');
    container.append(ul);
    [
        'Test_DynLoadFolder',
        'Test_Proxy'
    ].map( mod => {
        const li = document.createElement('li');
        li.textContent = mod;
        li.addEventListener('click', _ => load(mod));
        ul.append(li);
    } );
}