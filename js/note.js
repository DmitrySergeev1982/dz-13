export class Note {
  constructor(button) {
    console.log(button)
    this.button = button
    this.data = []
    this._handleClickButton =this._clickButton.bind(this)
    this._init()
  }

  _init() {
    this.button.addEventListener('click', this._handleClickButton)
  }

  _clickButton() {
    const newNoteObj = this._constructor('Hello', 50, 100)
    console.log(newNoteObj)
    this.data.push(newNoteObj)
    console.log(this.data)
    this.render()

  }

  _constructor(content, top, left) {
    return {
      content,
      top,
      left
    }
  }

  _createElement(data,index) {
    const noteNode = document.createElement('div')
    noteNode.setAttribute('data-index', index)
    noteNode.classList.add('note')
    noteNode.style.cssText = `position: absolute; top: ${data.top}px; left: ${data.left}px`

    const btnCloseNode = document.createElement('button')
    btnCloseNode.classList.add('note_close')
    btnCloseNode.innerHTML = 'X'

    const contentNode = document.createElement('div')
    contentNode.classList.add('note_content')
    contentNode.innerHTML = data.content

    const textareaNode = document.createElement('textarea')
    textarea.setAttribute('hidden')

    const btnEditNode = document.createElement('button')
    btnEditNode.classList.add('note_edit')
    btnEditNode.innerHTML = 'Редактировать'

    noteNode.append(btnCloseNode,contentNode,textareaNode,btnEditNode)

    return noteNode
  }

  render() {
    // console.log(noteObj, index)
    this.data.forEach(noteObj, index) {
      const noteNode = this._createElement(noteObj, index)
      console.log(noteNode)
    }
  }
}