async function fetchHitokoto() {
  const response = await fetch('https://international.v1.hitokoto.cn/?c=l')
  const data = await response.json()
  // const hitokoto = document.querySelector('#hitokoto_text')
  // hitokoto.href = `https://hitokoto.cn/?uuid=${uuid}`
  // hitokoto.innerText = hitokotoText
  const hitokoto = await (data.hitokoto +
    ' — ' +
    (data.from_who ? data.from_who : data.from))
  return hitokoto
}

export const hitokoto = await fetchHitokoto()
