'use strict'

function renderGallery() {
    const elGallery = document.querySelector('.image-gallery')
    let stringHTML
    const imgs = getImgs()
    if (!imgs.length) {
        stringHTML = `<p>No Images to Display </p>`
        elGallery.innerHTML = stringHTML
    }
    else {
        stringHTML = imgs.map(img => `<article class = "image-box"><img onclick="onImgSelect(${img.id})" src="imgs/meme-imgs (square)/${img.id}.jpg" alt=""></article>`)

        elGallery.innerHTML = stringHTML.join('')
    }
    renderSearchSelector()
}

function onImgSelect(id) {
    gElEditor.style.display = 'grid'
    gElGallery.style.display = 'none'
    gElSearchBlock.style.display = 'none'
    resizeCanvas()

    setImg(id)
    renderMeme()
}


function onShowGallery() {
    gElEditor.style.display = 'none'
    gElGallery.style.display = 'grid'
    gElSearchBlock.style.display = 'grid'


}

function onSearchBy(filter) {
    setFilter(filter)
    renderGallery()
}

function onSearchByKeyword(filter) {

    // gElBtnContainer.style.height = gElBtnContainer.offsetHeight + 1 + 'px'
    filterByKeywords(filter)
    renderGallery()
}


function onClearFilter(filter) {
    filterByKeywords(filter)
    renderGallery()
    gElSearchInputText.value = ''
}


function onImgInput(ev) {
    loadImageFromInput(ev, renderImg)
    gElEditor.style.display = 'grid'
    gElGallery.style.display = 'none'
    gElSearchBlock.style.display = 'none'

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


function renderSearchSelector() {
    const keywords = getKeywords()

    let stringHTML = ''

    for (const key in keywords) {
        let value = keywords[key]


        stringHTML += `<button style = "font-size: calc(1em + ${value}px)" class = "keyword-btn" onclick="onSearchByKeyword(this.innerText)" >${key}</button>`

    }
    gElBtnContainer.innerHTML = stringHTML

}


function onShowMore(elBtn) {
    gElBtnContainer.classList.toggle('show-more')

    if (elBtn.innerText === 'More...') elBtn.innerText = 'Less...'
    else elBtn.innerText = 'More...'


}


