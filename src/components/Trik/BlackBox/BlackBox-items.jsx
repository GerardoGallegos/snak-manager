import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { connect } from 'react-redux'
// styles
import './BlackBox.scss'
// Actions
import {
   showEditorBlackBox,
   setItemFocusBlackBox
} from '../../../actions/snak-actions'




class BlackBoxItems extends Component {

  constructor(props) {
    super(props)

    const METHODS = [
      'filter',
      'hangleItemClick'
    ]

    METHODS.forEach((method)=>{
      this[method] = this[method].bind(this)
    })

  }

  filter (dirtyText) {
    const TXT = dirtyText

    if(TXT.match(/\n/g)) {
      if(TXT.match(/\n/g).length >= 5) {
        return this.getLines(TXT, 5)
      }
    }

    return dirtyText
  }

  getLines (text, numLines) {
    let newStr = ''
    let txt = text

    for(let i=0; i<numLines; i++) {
      let index = txt.search(/\n/g)

      newStr += txt.substring(0, index) + '\n'
      txt = txt.substring(index + 1, txt.length)

      if(i === numLines-1) {
        return newStr
      }
    }
  }

  hangleItemClick (event) {

    const ITEMS = this.props.state.blackBox.items
    const ID_TARGET = event.target.getAttribute('data-id')
    let FILE_FOCUS

    for(let i = 0; i< ITEMS.length; i++) {
      if(ITEMS[i].id === ID_TARGET) {
        FILE_FOCUS = ITEMS[i]
        i = ITEMS.length

        this.props.dispatch(showEditorBlackBox(true))
        this.props.dispatch(setItemFocusBlackBox(FILE_FOCUS))

      }
    }

  }

  getEmblema (fileType) {
    switch(fileType){
    case 'javascript':
      return 'JS'
      break

    case 'html':
      return '</>'
      break

    case 'css':
      return '#'
      break

    default:
      return 'File'
    }
  }


  render() {
    return (
      <ul className="BlackBox__items">
        {
          this.props.state.blackBox.items.map((item, i) => {
            return (
              <li data-id={ item.id } onClick={ this.hangleItemClick } key={ item.id } className="BlackBox__item">
                <div data-id={ item.id } className={`BlackBox__item__type color-${item.fileType}`}>{ this.getEmblema(item.fileType) }</div>
                <pre data-id={ item.id } className={`BlackBox__item__pre color-${item.fileType}`}>
                  {
                    this.filter(item.body)
                  }
                </pre>
              </li>
            )
          })
        }
      </ul>
    )
  }

}

function mapStateToProps(state, props) {
  return {
    state : state.snak
  }
}

export { BlackBoxItems }
export default connect(mapStateToProps)(BlackBoxItems)
