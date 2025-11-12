const gFirstLinePos = 50

var gImgs = [
    { id: 1, url: 'imgs/meme-imgs (square)/1.jpg', keywords: ['funny', 'cat'] },
    { id: 2, url: 'imgs/meme-imgs (square)/2.jpg', keywords: ['funny', 'cat'] },
    { id: 3, url: 'imgs/meme-imgs (square)/3.jpg', keywords: ['funny', 'cat'] },
    { id: 4, url: 'imgs/meme-imgs (square)/4.jpg', keywords: ['funny', 'cat'] },
    { id: 5, url: 'imgs/meme-imgs (square)/5.jpg', keywords: ['funny', 'cat'] },
    { id: 6, url: 'imgs/meme-imgs (square)/6.jpg', keywords: ['funny', 'cat'] },
    { id: 7, url: 'imgs/meme-imgs (square)/7.jpg', keywords: ['funny', 'cat'] },
    { id: 8, url: 'imgs/meme-imgs (square)/8.jpg', keywords: ['funny', 'cat'] },
    { id: 9, url: 'imgs/meme-imgs (square)/9.jpg', keywords: ['funny', 'cat'] },
    { id: 10, url: 'imgs/meme-imgs (square)/10.jpg', keywords: ['funny', 'cat'] },

]

var gMeme = {
    selectedImgId: 1,
    selectedLineIdx: 0,
    lines:
        [{
            txt: 'Enter Top Text here',
            size: 20,
            color: 'white',
            pos: 'top'
        }, {
            txt: 'Enter Bottom Text here',
            size: 20,
            color: 'yellow',
            pos: 'bottom'
        }
        ]
}

function getImgs() {
    return gImgs
}

function getMeme() {
    return gMeme
}

function addLine() {
    const line = {
        txt: 'Enter Extra Text here',
        size: 20,
        color: 'white',
        pos: 'center'
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

function setImg(id) {
    gMeme.selectedImgId = id
}

function checkPosition(x, y) {
    const lines = gMeme.lines
    const idx = lines.findIndex(line => line.rect.x <= x && x <= line.rect.x + line.rect.width
        && line.rect.y <= y && y <= line.rect.y + line.rect.height
    )
    if (idx !== -1) {
        gMeme.selectedLineIdx = idx
        renderMeme()
    }
}