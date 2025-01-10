/*
    Test te viability to use a proxy to create pseudo-reactive objects
*/

const GenerateError = (error) => {
    console.trace(error);
    throw new Error('An error was encountered during proxy creation');
};

const ProxyGenerator = (generic_obj, options = {}) => {
    return new Proxy(generic_obj, {
        get: function(target, prop, receiver) {
            if(target[prop] === undefined) GenerateError(`Property '${prop}' was not found in proxy generator`);
            return target[prop];
        },
        set: function(obj, prop, value) {
            if(obj[prop] === undefined) GenerateError(`Property '${prop}' was not found in proxy generator`);
            if(options[prop] === undefined) GenerateError(`Option '${prop}' was not found in proxy generator`);
            obj[prop] = value;
            options[prop](value);
            return true;
        }
    });
};

const html = () => {
    // HTML Setup
    const container = document.getElementById('root');
    container.style = 'display: flex; justify-content: flex-start; align-items: flex-start;gap: 5px; flex-direction: column;';

    const button_decrease = document.createElement('button');
    button_decrease.append(document.createTextNode('Decrease quantity'));

    const button_increase = document.createElement('button');
    button_increase.append(document.createTextNode('Increase quantity'));

    const product_input = document.createElement('input');
    product_input.placeholder = 'Product';

    const product_element = document.createElement('label');
    product_element.style.color = 'white';
    product_element.textContent = `Product: `;

    const quantity_element = document.createElement('label');
    quantity_element.style.color = 'white';
    quantity_element.textContent = `Quantity: 0`;

    container.append(button_decrease, button_increase, product_input, product_element, quantity_element);
    return { product_input, button_decrease, button_increase, product_element, quantity_element };
};

export const init = () => {
    const { 
        product_input, button_decrease, button_increase,
        product_element, quantity_element
     } = html();
    // Proxy setup
    const Product = ProxyGenerator({product: '',quantity: 0}, {
        'product': value => product_element.textContent = `Product: ${value}`,
        'quantity': value => quantity_element.textContent = `Quantity: ${value}`
    });
    button_decrease.addEventListener('click', _ => Product.quantity--);
    button_increase.addEventListener('click', _ => Product.quantity++);
    product_input.addEventListener('keyup', e => Product.product = e.target.value.trim());
};