'use strict'
let gElCanvas
let gCtx
let isUserTyping = false
let moveLineVertBy = 0

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
            gCtx.textAlign = line.txtPos
            const textWidth = gCtx.measureText(line.txt).width
            line.textWidth = textWidth


            let x = line.x
            if (line.txtPos === 'right') x = line.x - textWidth
            else if (line.txtPos === 'center') x = line.x - textWidth/2
           


            line.rect = {
                x: x,
                y: line.y - line.size,
                width: textWidth,
                height: line.size + 10
            }

            gCtx.fillText(line.txt, line.x, line.y)
        })

        if (!isUserTyping) {
            const currLine = meme.lines[meme.selectedLineIdx]
            gCtx.fillStyle = ' rgba(0, 0, 0, 0.3)'
            const rect = currLine.rect
            gCtx.fillRect(rect.x, rect.y, rect.width, rect.height)

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


function onClick(ev) {
    const { offsetX, offsetY } = ev
    console.log(offsetX, offsetY)

    checkPosition(offsetX, offsetY)
    renderMeme()
}

function onChangePosition(val) {
    setPosition(val)
    renderMeme()

}

function onSetAlignment(pos,x) {
    setTextAlign(pos,x)
    renderMeme()

}

