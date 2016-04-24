import STORE from '../../../store/snak-store'
import uid from 'uid'

import {addRegion, dragRegion, clickRegion} from '../../../actions/snak-actions'


export default function(wavesurfer, type) {

  let start = wavesurfer.getCurrentTime()
  let end = wavesurfer.getCurrentTime() + 5
  let _regionId = uid()

  wavesurfer.addRegion({
    start: start,
    end: end,
    resize: true,
    color: 'rgba(26,88,135,0.5)',
    type: type,
    regionId: _regionId,
    onDragFunc: function(regionData){
      //STORE.dispatch(dragRegion(regionData))
    },
    onClickFunc: function(regionData){
      //STORE.dispatch(clickRegion(regionData))
    }
  })

  let newRegionData = (()=>{

    let _obj = {
      type : type,
      from : start,
      to : end,
      regionId : _regionId
    }

    //_obj[type] = {}

    if(type === 'code') {
      _obj[type] = {
        body : '',
        fileType : 'javascript'
      }
    }

    else if(type === 'instructions') {
      _obj[type] = {
        body : '',
        title : ''
      }
    }

    else if(type === 'image') {
      _obj[type] = {
        url : '',
        flag : '',
        file : ''
      }
    }

    return _obj

  })()

  STORE.dispatch(addRegion(newRegionData))

}
