'use strict'

const STORAGE_KEY = 'keywordsDB'
let gFilteredImgs
let gKeywords

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
    { id: 11, url: 'imgs/meme-imgs (square)/11.jpg', keywords: ['basketball', 'kiss'] },
    { id: 12, url: 'imgs/meme-imgs (square)/12.jpg', keywords: ['you', 'sunshine'] },
    { id: 13, url: 'imgs/meme-imgs (square)/13.jpg', keywords: ['leonardo', 'dicaprio', 'cheers'] },
    { id: 14, url: 'imgs/meme-imgs (square)/14.jpg', keywords: ['matrix', 'morpheus', 'what if'] },
    { id: 15, url: 'imgs/meme-imgs (square)/15.jpg', keywords: ['one does not', 'lord of the rings'] },
    { id: 16, url: 'imgs/meme-imgs (square)/16.jpg', keywords: ['picard', 'facepalm'] },
    { id: 17, url: 'imgs/meme-imgs (square)/17.jpg', keywords: ['president', 'putin'] },
    { id: 18, url: 'imgs/meme-imgs (square)/18.jpg', keywords: ['toy story', 'woody', 'buzz'] },

]



var gMeme = {
    selectedImgId: 1,
    selectedLineIdx: 0,
    lines:
        []
}



function getMemeLine() {
    return gMeme.lines[gMeme.selectedLineIdx]

}
function resetMemeEdit() {
    gMeme.lines = [
        {
            txt: 'Enter Text here',
            size: 30,
            color: 'white',
            y: gElCanvas.height * 0.2,
            x: gElCanvas.width * 0.1,
            txtPos: 'left',
            font: 'Impact',
            idx: 0,
            isDrag: false
        }
    ]
    gMeme.selectedLineIdx = 0
}

function getImgs() {
    if (!gFilteredImgs) return gImgs
    return gFilteredImgs
}

function getMeme() {
    return gMeme
}


function getNextLinePos() {
    const lines = gMeme.lines
    if (lines.length === 0) return { x: gElCanvas.width * 0.1, y: gElCanvas.height * 0.2 }
    else if (lines.length === 1) return { x: gElCanvas.width * 0.1, y: gElCanvas.height * 0.8 }
    else if (lines.length === 2) return { x: gElCanvas.width * 0.1, y: gElCanvas.height * 0.5 }
    const lastLine = lines[lines.length - 1]
    const diffX = 10
    const diffY = 10
    return { x: lastLine.x + diffX, y: lastLine.y + diffY }
}


function addLine(txt = 'Enter Text here') {
    const position = getNextLinePos()
    const line = {
        txt: txt,
        size: 30,
        color: 'white',
        y: position.y,
        x: position.x,
        txtPos: 'left',
        font: 'Impact',
        isDrag: false
    }
    gMeme.lines.push(line)
    gMeme.selectedLineIdx = gMeme.lines.length - 1
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

function setTextAlign(pos) {
    const currLine = gMeme.lines[gMeme.selectedLineIdx]

    if (pos === 'left') currLine.x = gElCanvas.width * 0.1
    else if (pos === 'center') currLine.x = gElCanvas.width * 0.5
    else if (pos === 'right') currLine.x = gElCanvas.width * 0.9

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

}

function checkPosition(x, y) {
    const lines = gMeme.lines
    const idx = lines.findIndex(line => x >= line.rect.x && x <= line.rect.x + line.rect.width
        && y >= line.rect.y && y <= line.rect.y + line.rect.height
    )
    if (idx !== -1) {
        gMeme.selectedLineIdx = idx
        return true
    }
    return false
}


function getKeywords() {
    gKeywords = loadFromStorage(STORAGE_KEY)
    if (!gKeywords) {
        let imgWords = gImgs.map(img => img.keywords)

        let allKeywords = imgWords.reduce((acc, keyword) => {
            if (Array.isArray(keyword)) acc.push(...keyword)
            else acc.push(keyword)

            return acc
        }, [])

        gKeywords = allKeywords.reduce((acc, keyword) => {

            if (!acc[keyword]) acc[keyword] = 0
            return acc
        }, {})
    }
    return gKeywords
}





function filterByKeywords(filter) {
    let images = gImgs.filter(img =>
        img.keywords.some(word =>
            word.toLowerCase().includes(filter.toLowerCase()))
    )
    if (filter !== '') gKeywords[filter]++

    _saveKeywordsToStorage()
    gFilteredImgs = images


}


function setFilter(filter) {
    let images = gImgs.filter(img =>
        img.keywords.some(word =>
            word.toLowerCase().includes(filter.toLowerCase()))
    )
    if (images.length === 0) gFilteredImgs = []

    else gFilteredImgs = images

    console.log(gFilteredImgs)

}

function setLineDrag(isDrag) {
    gMeme.lines[gMeme.selectedLineIdx].isDrag = isDrag
}

function moveLine(dx, dy) {
    const line = getMemeLine()
    line.x += dx
    line.y += dy
}



function _saveKeywordsToStorage() {
    saveToStorage(STORAGE_KEY, gKeywords)
}