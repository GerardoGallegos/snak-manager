jest.disableAutomock()

import {
  audioProgress,
  addRegion,
  clickRegion,
  dragRegion,
  zoomWave,
  updateInstruction,
  updateCode,
  changeSyntax,
  addImage,
  showPreview,
  showWorkingArea,
} from '../snak-actions'



const REGION_TEST = {
  IMAGE : {
    'type': 'image',
    'from': 21.197037535271342,
    'to': 26.197037535271342,
    'regionId': 'k27ri91',
    'image': {
      'file': {
        'preview': 'blob:http%3A//localhost%3A3000/72286512-9d9b-4b80-9795-4790fe7b6c8d'
      }
    },
    'active': true
  },

  CODE : {
    'type': 'code',
    'from': 18.62769965220815,
    'to': 23.62769965220815,
    'regionId': 'wscf1qv',
    'code': {
      'title': 'file',
      'text': 'let name = "snak cool"',
      'body': 'let name = "snak cool"',
      'fileType': 'javascript'
    },
    'active': true
  },

  INSTRUCTIONS : {
    'type': 'instructions',
    'from': 9.040262921889013,
    'to': 14.040262921889013,
    'regionId': 'dnay5qq',
    'instructions': {
      'title': 'file',
      'text': 'Buny text',
      'body': 'Buny text'
    },
    'active': true
  },


}


describe('Component <WorkingArea />', () => {

  it('Should create an action type AUDIO_PROGRESS' , () => {
    expect(audioProgress(33)).toEqual({
      type: 'AUDIO_PROGRESS',
      time : 33
    })
  })

  it('Should create actions type REGION' , () => {

    expect(addRegion(REGION_TEST.IMAGE)).toEqual( {
      type: 'ADD_REGION',
      regionData : REGION_TEST.IMAGE
    })

    expect(clickRegion(REGION_TEST.IMAGE)).toEqual( {
      type: 'CLICK_REGION',
      regionData : REGION_TEST.IMAGE
    })

    expect(dragRegion(REGION_TEST.IMAGE)).toEqual( {
      type: 'DRAG_REGION',
      regionData : REGION_TEST.IMAGE
    })

  })

  it('Should create actions type ZOOM_WAVE' , () => {
    expect(zoomWave(-1)).toEqual({
      type: 'ZOOM_WAVE',
      deltaY : -1
    })
  })

  it('Should create actions type UPDATE_INSTRUCTION' , () => {
    expect(updateInstruction(REGION_TEST.INSTRUCTIONS, 'TEST TEXT')).toEqual({
      type: 'UPDATE_INSTRUCTION',
      regionData : REGION_TEST.INSTRUCTIONS,
      text : 'TEST TEXT'
    })
  })

  it('Should create actions type CODE' , () => {
    const OBJCODE = {
      body : 'let code = true',
      fileType : 'javascript'
    }
    expect(updateCode(REGION_TEST.CODE, OBJCODE)).toEqual({
      type: 'UPDATE_CODE',
      regionData : REGION_TEST.CODE,
      objData : OBJCODE
    })

    const TEXT_SYNTAX = 'html'
    expect(changeSyntax(REGION_TEST.CODE, TEXT_SYNTAX)).toEqual({
      type: 'CHANGE_SYNTAX',
      regionData : REGION_TEST.CODE,
      textSyntax : TEXT_SYNTAX
    })
  })

  it('Should create actions type ADD_IMAGE' , () => {
    const FILE_FAKE = {}
    expect(addImage(REGION_TEST.IMAGE, FILE_FAKE)).toEqual({
      type: 'ADD_IMAGE',
      regionData : REGION_TEST.IMAGE,
      objData : FILE_FAKE
    })
  })

  it('Should create actions type SHOW_PREVIEW' , () => {
    expect(showPreview()).toEqual({
      type: 'SHOW_PREVIEW'
    })
  })

  it('Should create actions type SHOW_WORKING_AREA' , () => {
    expect(showWorkingArea()).toEqual({
      type: 'SHOW_WORKING_AREA'
    })
  })


})
