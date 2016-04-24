// Cherry-selectList.js

import React from 'react'

export default class CherrySelectList extends React.Component {

   constructor(props) {
     super(props)
   }

  render() {

    const classes = this.props.type ? `Selectlist Selectlist-${this.props.type}` : 'Selectlist'

    return (
      <select className={classes} onChange={this.props.change}>
        {
          this.props.listOptions.map((item)=>{
            let SELECTED = this.props.optionActive === item ? item : ''
            console.log(SELECTED)
            return <option key={item} value={item}>{item}</option>
          })
        }
     </select>
    )
  }
}
