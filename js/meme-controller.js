'use strict'
let gElCanvas
let gCtx


function onInit() {
    gElCanvas = document.querySelector('canvas')
    gCtx = gElCanvas.getContext('2d')




}

function renderMeme() {




}



function renderImg(img) {
    gElCanvas.height = (img.naturalHeight / img.naturalWidth) * gElCanvas.width
    gCtx.drawImage(img, 0, 0, gElCanvas.width, gElCanvas.height)
}


function loadImg(src) {
    console.log(src)

    const img = new Image()
    img.src = src
    img.onload = () => {
        renderImg(img)
    }
}

