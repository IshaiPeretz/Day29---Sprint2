'use strict'
let gElCanvas
let gCtx
let gIsUserTyping = false


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
            gCtx.font = `${line.size}px ${line.font}`
            gCtx.fillStyle = line.color
            gCtx.textAlign = line.txtPos
            const textWidth = gCtx.measureText(line.txt).width
            line.textWidth = textWidth


            let x = line.x
            if (line.txtPos === 'right') x = line.x - textWidth
            else if (line.txtPos === 'center') x = line.x - textWidth / 2



            line.rect = {
                x: x,
                y: line.y - line.size,
                width: textWidth,
                height: line.size + 10
            }

            gCtx.fillText(line.txt, line.x, line.y)

        })

        if (!gIsUserTyping) {
            const currLine = meme.lines[meme.selectedLineIdx]
            gCtx.fillStyle = ' rgba(0, 0, 0, 0.3)'
            const rect = currLine.rect
            gCtx.fillRect(rect.x, rect.y, rect.width, rect.height)

        }
    }
}

function onTextInput(text) {
    gIsUserTyping = true
    setLineText(text)
    renderMeme()

}

function onSetColor(color) {
    setMemeTxtColor(color)
    renderMeme()
    gElMemeInputText.focus()
}

function onChangeFontSize(val) {
    setFontSize(val)
    renderMeme()
    gElMemeInputText.focus()

}

function onAddLine() {
    addLine()
    renderMeme()
    gElMemeInputText.focus()
}

function onSetFont(val) {
    setLineFont(val)
    renderMeme()
    gElMemeInputText.focus()

}

function onSwitchLine() {
    gIsUserTyping = false
    gElMemeInputText.focus()
    switchLine()
    renderMeme()
}

function onDownloadImage(elLink) {
    const dataUrl = gElCanvas.toDataURL()
    elLink.href = dataUrl

}


function addEmoji(elBtn) {
    addLine(elBtn.innerText)
    renderMeme()
}



function renderImg(img) {
    gElCanvas.height = (img.naturalHeight / img.naturalWidth) * gElCanvas.width
    gCtx.drawImage(img, 0, 0, gElCanvas.width, gElCanvas.height)
}


function onClick(ev) {
    const { offsetX, offsetY } = ev
    console.log(offsetX, offsetY)

    checkPosition(offsetX, offsetY)
    gElMemeInputText.focus()
    gIsUserTyping = false
    renderMeme()

}

function onChangePosition(val) {
    setPosition(val)
    renderMeme()

}

function onSetAlignment(pos, x) {
    setTextAlign(pos, x)
    renderMeme()

}

function onReset() {
    resetMemeEdit()
    gElMemeInputText.value = ''
    gElFontSelector.value = 'Arial'
    gElTextColor.value = '#000000'
    renderMeme()
}

function onDeleteLine() {
    deleteLine()
    renderMeme()
    gElMemeInputText.focus()
}


function onShareImg(ev) {
    ev.preventDefault()
    const canvasData = gElCanvas.toDataURL('image/jpeg')


    function onSuccess(uploadedImgUrl) {
        const encodedUploadedImgUrl = encodeURIComponent(uploadedImgUrl)
        console.log('encodedUploadedImgUrl:', encodedUploadedImgUrl)
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodedUploadedImgUrl}&t=${encodedUploadedImgUrl}`)

    }
    uploadImg(canvasData, onSuccess)
}


async function uploadImg(imgData, onSuccess) {
    const CLOUD_NAME = 'webify'
    const UPLOAD_URL = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`
    const formData = new FormData()
    formData.append('file', imgData)
    formData.append('upload_preset', 'webify')
    try {
        const res = await fetch(UPLOAD_URL, {
            method: 'POST',
            body: formData
        })
        const data = await res.json()
        console.log('Cloudinary response:', data)
        onSuccess(data.secure_url)

    } catch (err) {
        console.log(err)
    }
}

