const createError = () => {
    console.trace('A file must be given in pathfactory');
    throw new Error('An error was found in PathFactory');
}

export const DynLoadFolder = base_path_url => {
    const methods = {};

    return [
        (file = '') => {
            if(file ==='') createError();
            return methods[file];
        },
        async (file = '') => {
            if(file ==='') createError();
            methods[file] = {
                ...methods[file], 
                ...(await import(`${base_path_url}${file}.js?v=${new Date().getTime()}`))
            };
        }
    ]
}