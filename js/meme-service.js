var gImgs = [
    { id: 1, url: 'imgs/meme-imgs (square)/1.jpg', keywords: ['funny', 'cat'] },
    { id: 2, url: 'imgs/meme-imgs (square)/2.jpg', keywords: ['funny', 'cat'] },
    { id: 3, url: 'imgs/meme-imgs (square)/3.jpg', keywords: ['funny', 'cat'] },
]

var gMeme = {
    selectedImgId: 1,
    selectedLineIdx: 0,
    lines:
        [{
            txt: '',
            size: 20,
            color: 'white'
        }]
}

function getImgs(){
    return gImgs
}
function getMeme() {

    return gMeme
}



function getImgURL(id) {
    return gImgs.find(img => img.id === id)
}

function setLineText(text) {
    gMeme.lines[gMeme.selectedLineIdx].txt = text

}

function setMemeTxtColor(color){
    gMeme.lines[gMeme.selectedLineIdx].color = color
}
 
function setFontSize(val){
     gMeme.lines[gMeme.selectedLineIdx].size += val

}

function setImg(id){
    gMeme.selectedImgId = id
}

