export const load = async module => {
    document.getElementById('root').innerHTML = '';
    (await import(`../modules/${module}.js?v=${new Date().getTime()}`)).init();
}