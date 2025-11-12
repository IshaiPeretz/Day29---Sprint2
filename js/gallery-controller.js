'use strict'


function renderGallery() {
    const elGallery = document.querySelector('.image-gallery')

    const imgs = getImgs()

    let stringHTML = imgs.map(img => `<article class = "image-box"><img onclick="onImgSelect(${img.id})" src="/imgs/meme-imgs (square)/${img.id}.jpg" alt=""></article>`)

    elGallery.innerHTML = stringHTML.join('')
}

function onImgSelect(id){
    setImg(id)
    renderMeme()
}