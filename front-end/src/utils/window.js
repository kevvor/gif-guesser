/* Checks if you've scrolled to the bottom of the window */

let scrollTop = (document.documentElement && document.documentElement.scrollTop) || document.body.scrollTop;
let scrollHeight = (document.documentElement && document.documentElement.scrollHeight) || document.body.scrollHeight;
let clientHeight = document.documentElement.clientHeight || window.innerHeight;
let scrolledToBottom = Math.ceil(scrollTop + clientHeight) >= scrollHeight;

export default scrolledToBottom;
