export class DnD {
  constructor(elem, methodSetCoords) {
    this.elem = elem
    this.methodSetCoords = methodSetCoords || null
    
    this._handleMouseDown = this._mouseDown.bind(this)
    this._handleMouseUp = this._mouseUp.bind(this)
    this._handleMouseMove = this._mouseMove.bind(this)
    
    this._init()
  }

  _init() {
    this._setPositionAbsolute()
    this.elem.addEventListener('mousedown', this._handleMouseDown)

  }

  _setPositionAbsolute() {
    this.elem.style.position = 'absolute'
  }

  _mouseDown() {
    this.shiftX = event.clientX - this.elem.getBoundingClientRect().left
    this.shiftY = event.clientY - this.elem.getBoundingClientRect().top
    
    document.addEventListener('mousemove', this._handleMouseMove)
    document.addEventListener('mouseup', this._handleMouseUp)

  }

  _mouseUp() {
    document.removeEventListener('mousemove', this._handleMouseMove)
    document.removeEventListener('mouseup', this._handleMouseUp)
    
    if(this.methodSetCoords != null) {
        this.methodSetCoords(this.elem, {x: this.left, y: this.top})
    }
  }

  _mouseMove(event) {
    this._trackMouse(event.pageX, event.pageY)
       
  }

  _trackMouse(pageX, pageY) {
    this.left = pageX - this.shiftX
    this.top = pageY - this.shiftY    
    
    this.elem.style.left = pageX - this.shiftX + 'px'
    this.elem.style.top = pageY - this.shiftY + 'px'    
  }
}