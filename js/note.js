import {DnD} from './dnd'

export class Note {
  constructor(button) {
    this.button = button
    this.data = []
    
    this.container = document.querySelector('.container')
    this._handleClickButton = this._clickButton.bind(this)
    this.setCoords = this._setCoords.bind(this)
    this._init()
  }

  _init() {
    this.button.addEventListener('click', this._handleClickButton)
  }

  _setCoords(note, coords) {
    const index = note.getAttribute('data-index')
    
    this.data[index].left = coords.x
    this.data[index].top = coords.y
    
  }

  _constructor(content, top, left) {
    return {
      content,
      top,
      left
    }
  }

  _clickButton() {
    const newNoteObj = this._constructor('Hello', 50, 100)
    
    this.data.push(newNoteObj)
    
    this.render()

  }  

  _clickCloseBtn(index) {
    this.data.splice(index, 1)

    this.render()

  }

  _editNote(textareaNode, contentNode, index) {    
    if (textareaNode.hidden) {
      textareaNode.hidden = false
      contentNode.hidden = true
    } else {
      textareaNode.hidden = true
      contentNode.hidden = false

      this.data[index].content = textareaNode.value
      
      this.render()
    }
    
  }

  _btnEdit(textareaNode, index) {
    if (textareaNode.hidden) {
      textareaNode.hidden = false
    } else {
      textareaNode.hidden = true

      this.data[index].content = textareaNode.value
      
      this.render()     
    }

  }

  _createNote(data,index) {
    const noteNode = document.createElement('div')
    noteNode.setAttribute('data-index', index)
    noteNode.classList.add('note')
    noteNode.style.cssText = `position: absolute; left: ${data.left}px; top: ${data.top}px;`
    new DnD(noteNode, this.setCoords)
    noteNode.addEventListener('dblclick', () => {
      this._editNote(textareaNode, contentNode, index)
    })

    const btnCloseNode = document.createElement('button')
    btnCloseNode.classList.add('note__close')
    btnCloseNode.innerHTML = '<i class="far fa-times-circle"></i>'
    btnCloseNode.addEventListener('click', () => {
      this._clickCloseBtn(index)
    })

    const contentNode = document.createElement('div')
    contentNode.classList.add('note__content')
    contentNode.innerHTML = 'Hello'

    const textareaNode = document.createElement('textarea')
    textareaNode.classList.add('note__textarea')
    textareaNode.value = data.content
    textareaNode.hidden = true

    const btnEditNode = document.createElement('button')
    btnEditNode.classList.add('note__edit')
    btnEditNode.innerHTML = 'Редактировать'
    btnEditNode.addEventListener('click', () => {
      this._btnEdit(textareaNode, index)  
    })

    noteNode.append(btnCloseNode,contentNode,textareaNode,btnEditNode)

    return noteNode
  }

  render() {
    this.container.innerHTML = '';
    
    this.data.forEach((noteObj, index) => {
      const noteNode = this._createNote(noteObj, index)
      
      this.container.append(noteNode)
    })
    
  }
}