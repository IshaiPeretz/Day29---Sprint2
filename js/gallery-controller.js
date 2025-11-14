'use strict'


function renderGallery() {
    const elGallery = document.querySelector('.image-gallery')

    const imgs = getImgs()

    let stringHTML = imgs.map(img => `<article class = "image-box"><img onclick="onImgSelect(${img.id})" src="imgs/meme-imgs (square)/${img.id}.jpg" alt=""></article>`)

    elGallery.innerHTML = stringHTML.join('')
}

function onImgSelect(id) {
    gElEditor.style.display = 'grid'
    gElGallery.style.display = 'none'
    gElSearchBar.style.display = 'none'
    resizeCanvas()
    
    setImg(id)
    renderMeme()
}


function onShowGallery() {
    gElEditor.style.display = 'none'
    gElGallery.style.display = 'grid'
    gElSearchBar.style.display = 'grid'


}

function onSearchBy(filter) {
    setFilter(filter)
    renderGallery()
}




function onImgInput(ev) {
    loadImageFromInput(ev, renderImg)
    gElEditor.style.display = 'grid'
    gElGallery.style.display = 'none'
    gElSearchBar.style.display = 'none'

}

function loadImageFromInput(ev, onImageReady) {
    const reader = new FileReader()

    reader.onload = function (event) {
        const img = new Image()
        img.onload = () => {
            onImageReady(img)
        }
        img.src = event.target.result
    }
    reader.readAsDataURL(ev.target.files[0])
}

