const appendTo = (el,par)=>par.append(el);
const createEl = el => document.createElement(el);
const addClass = (el,className)=>el.classList = className;

export {
    appendTo,
    createEl,
    addClass
}
