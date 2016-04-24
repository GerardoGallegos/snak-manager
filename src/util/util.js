
export function setOrderList (array) {
  return array.sort((a,b)=>{
      return a.from - b.from
  })
}



export function getBodyObj (textBody) {
  var titlePattert = new RegExp(/\/{3}(\s|\w|\.|\-|\_|$)+\n/)
  var _title = 'file'

  var cleanTitle = (dirtyTitle) => {
    var pattenClean = new RegExp(/\/|\s|\n/g)
    return dirtyTitle.replace(pattenClean, '')
  }

  var _body = textBody.replace(titlePattert, (titleFind)=>{
    if(titleFind === undefined) {
      return ''
    }
    else {
      _title = cleanTitle(titleFind)
      return ''
    }
  })

  return {
    title : _title,
    body : _body
  }
}
