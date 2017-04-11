function scrollTo(pos) {
    document.documentElement.scrollTop = document.body.scrollTop = pos;
}

function scrollPos() {
    return (window.pageYOffset || document.documentElement.scrollTop)
        - (document.documentElement.clientTop || 0);
}


export { scrollPos, scrollTo };