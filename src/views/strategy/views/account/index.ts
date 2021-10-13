export const fakeClick = (obj) => {
    var ev = document.createEvent('MouseEvents')
    ev.initMouseEvent(
        'click',
        true,
        false,
        window,
        0,
        0,
        0,
        0,
        0,
        false,
        false,
        false,
        false,
        0,
        null
    )
    obj.dispatchEvent(ev)
}