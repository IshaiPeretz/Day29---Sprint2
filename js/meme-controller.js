'use strict'
let gElCanvas
let gCtx
let isUserTyping = false

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
        
        meme.lines.forEach(line => {
            gCtx.font = `${line.size}px Arial`
            gCtx.fillStyle = line.color
            gCtx.textAlign ='center'
            
            let x = gElCanvas.width / 2
            let y 
            
            if (line.pos === 'top') y = 50
            else if (line.pos === 'bottom') y = gElCanvas.height - 50
            else if (line.pos === 'center') y = gElCanvas.height /2
            
            line.x = x
            line.y = y
            
            gCtx.fillText(line.txt, x, y)
        })
        if(!isUserTyping){
        const currLine = meme.lines[meme.selectedLineIdx]
        let textWidth = gCtx.measureText(currLine.txt).width
        gCtx.fillStyle = ' rgba(0, 0, 0, 0.3)'
        gCtx.fillRect(currLine.x-textWidth/2, currLine.y - currLine.size,textWidth , currLine.size+10)
        }

    }
}

function onTextInput(text) {
    isUserTyping = true
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


function onAddLine() {
    addLine()
    renderMeme()
}

function onSwitchLine() {
    isUserTyping = false
    switchLine()
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


