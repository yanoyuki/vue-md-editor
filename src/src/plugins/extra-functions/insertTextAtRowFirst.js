// this plugin might cause bags in IE or something
// only tested in Chrome

export default (obj, {prefix, str}, $vm) => {
  const startPos = obj.selectionStart
  const endPos = obj.selectionEnd
  const tmpStr = obj.value
  const len = tmpStr.length
  const rows = tmpStr.split('\n')

  // undefined measure
  prefix = prefix || ''

  // returns {index, startPos, endPos}
  function getCurrentRow (arr, pos) {
    let sum = 0

    for (let i = 0; i < arr.length; i++) {
      const oldPos = sum
      sum += arr[i].length

      if (i !== 0) sum ++

      if (sum >= pos) {
        return {
          index: i,
          startPos: oldPos + 1,
          endPos: sum,
        }
      }
    }
  }

  const currentRow = getCurrentRow(rows, startPos)
  const str_before = tmpStr.substring(0, currentRow.startPos)
  const str_after = tmpStr.substring(currentRow.startPos, len)


  obj.setSelectionRange(currentRow.startPos, currentRow.endPos)

  if (currentRow.startPos === currentRow.endPos) {
    // insert directly (select str)
    obj.value = str_before + prefix + str + str_after

    $vm.$nextTick(() => {
      obj.setSelectionRange(currentRow.startPos + prefix.length, currentRow.startPos + prefix.length + str.length)
    })
  } else {
    // insert prefix at row first
    obj.value = str_before + prefix + str_after

    if (startPos === endPos) {
      // select row
      $vm.$nextTick(() => {
        obj.setSelectionRange(currentRow.startPos + prefix.length, currentRow.endPos + prefix.length)
      })
    } else {
      // keep selected words
      $vm.$nextTick(() => {
        obj.setSelectionRange(startPos + prefix.length, endPos + prefix.length)
      })
    }
  }
}
