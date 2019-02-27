export default (obj, {prefix, subfix, str, type}, $vm) => {
  const startPos = obj.selectionStart
  const endPos = obj.selectionEnd
  const tmpStr = obj.value
  const len = tmpStr.length
  const str_before = tmpStr.substring(0, startPos)
  const str_selection = tmpStr.substring(startPos, endPos)
  const str_after = tmpStr.substring(endPos, len)

  // undefined measure
  prefix = prefix || ''
  subfix = subfix || ''
  str = str || ''

  if (startPos === endPos) {
    // insert directly
    obj.value = str_before + prefix + str + subfix + str_after

    $vm.$nextTick(function () {
      obj.setSelectionRange(startPos + prefix.length, endPos + prefix.length + str.length)
    })
  } else {
    // insert prefix & subfix around selection
    obj.value = str_before + prefix + str_selection + subfix + str_after

    $vm.$nextTick(function () {
      obj.setSelectionRange(startPos + prefix.length, endPos + prefix.length)
    })
  }
}
