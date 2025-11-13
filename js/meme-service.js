'use strict'

let gFilteredImgs = []


var gImgs = [
    { id: 1, url: 'imgs/meme-imgs (square)/1.jpg', keywords: ['trump', 'funny', 'president'] },
    { id: 2, url: 'imgs/meme-imgs (square)/2.jpg', keywords: ['cute', 'dog', 'puppy'] },
    { id: 3, url: 'imgs/meme-imgs (square)/3.jpg', keywords: ['cute', 'dog', 'baby'] },
    { id: 4, url: 'imgs/meme-imgs (square)/4.jpg', keywords: ['cat', 'funny'] },
    { id: 5, url: 'imgs/meme-imgs (square)/5.jpg', keywords: ['funny', 'baby'] },
    { id: 6, url: 'imgs/meme-imgs (square)/6.jpg', keywords: ['funny', 'aliens'] },
    { id: 7, url: 'imgs/meme-imgs (square)/7.jpg', keywords: ['funny', 'baby'] },
    { id: 8, url: 'imgs/meme-imgs (square)/8.jpg', keywords: ['willy', 'funny'] },
    { id: 9, url: 'imgs/meme-imgs (square)/9.jpg', keywords: ['funny', 'baby', 'laugh'] },
    { id: 10, url: 'imgs/meme-imgs (square)/10.jpg', keywords: ['laugh', 'obama', 'president'] },

]

var gMeme = {
    selectedImgId: 1,
    selectedLineIdx: 0,
    lines:
        [{
            txt: 'Enter Top Text here',
            size: 20,
            color: 'white',
            y: 50,
            x: 50,
            txtPos: 'left',
            font: 'Arial'
        }, {
            txt: 'Enter Bottom Text here',
            size: 20,
            color: 'yellow',
            y: 450,
            x: 250,
            txtPos: 'left',
            font: 'Arial'
        }
        ]
}

function getImgs() {
    if (!gFilteredImgs || !gFilteredImgs.length) return gImgs
    return gFilteredImgs
}

function getMeme() {
    return gMeme
}

function addLine() {
    const line = {
        txt: 'Enter Extra Text here',
        size: 20,
        color: 'white',
        y: 250,
        x: 50,
        txtPos: 'left',
        font: 'Arial'
    }
    gMeme.lines.push(line)
}


function switchLine() {
    (gMeme.selectedLineIdx === gMeme.lines.length - 1) ? gMeme.selectedLineIdx = 0 : gMeme.selectedLineIdx++
}

function getImgURL(id) {
    return gImgs.find(img => img.id === id)
}

function setLineText(text) {
    gMeme.lines[gMeme.selectedLineIdx].txt = text

}

function setMemeTxtColor(color) {
    gMeme.lines[gMeme.selectedLineIdx].color = color
}

function setFontSize(val) {
    gMeme.lines[gMeme.selectedLineIdx].size += val
}

function setPosition(val) {
    gMeme.lines[gMeme.selectedLineIdx].y += val
}

function setTextAlign(pos, x) {
    const currLine = gMeme.lines[gMeme.selectedLineIdx]
    currLine.x = x
    currLine.txtPos = pos
}

function setLineFont(val) {
    gMeme.lines[gMeme.selectedLineIdx].font = val
}

function setImg(id) {
    gMeme.selectedImgId = id
}

function deleteLine() {
    gMeme.lines.splice(gMeme.selectedLineIdx, 1)
    console.log(gMeme)

}

function checkPosition(x, y) {
    const lines = gMeme.lines
    const idx = lines.findIndex(line => line.rect.x <= x && x <= line.rect.x + line.rect.width
        && line.rect.y <= y && y <= line.rect.y + line.rect.height
    )
    if (idx !== -1) {
        gMeme.selectedLineIdx = idx

    }
}


function setFilter(filter) {
    let images = gImgs.filter(img =>
        img.keywords.some(word =>
            word.toLowerCase().includes(filter.toLowerCase()))
    )

    gFilteredImgs = images
   


}


