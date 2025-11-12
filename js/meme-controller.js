'use strict'
let gElCanvas
let gCtx


function onInit() {
    gElCanvas = document.querySelector('canvas')
    gCtx = gElCanvas.getContext('2d')

    renderGallery()
    renderMeme()




}

function renderMeme() {

    const meme = getMeme()
    const imgURL = getImgURL(meme.selectedImgId)

    const img = new Image()
    img.src = imgURL.url
    img.onload = () => {

        renderImg(img)

        const line = meme.lines[0]
        gCtx.font = `${line.size}px Arial`
        gCtx.fillStyle = line.color
        gCtx.textAlign = 'center'


        gCtx.fillText(line.txt, gElCanvas.width / 2, 50)

    }
}

function onTextInput(text) {
    setLineText(text)
    renderMeme()

}

function onSetColor(color) {
    setMemeTxtColor(color)
    renderMeme()
}

function onChangeFontSize(val) {
    setFontSize(val)
    renderMeme()

}

function onDownloadImage(elLink) {
    const dataUrl = gElCanvas.toDataURL()
    elLink.href = dataUrl
}


function renderImg(img) {
    gElCanvas.height = (img.naturalHeight / img.naturalWidth) * gElCanvas.width
    gCtx.drawImage(img, 0, 0, gElCanvas.width, gElCanvas.height)
}


