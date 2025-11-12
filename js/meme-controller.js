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
    //   if (!imgURL) return;

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

function onTextInput(text){
    setLineText(text)
    renderMeme()

}




function renderImg(img) {
    gElCanvas.height = (img.naturalHeight / img.naturalWidth) * gElCanvas.width
    gCtx.drawImage(img, 0, 0, gElCanvas.width, gElCanvas.height)
}


function loadImg(src) {
    const img = new Image()
    img.src = src
    img.onload = () => {
        renderImg(img)
        createTextBox()
    }



}

