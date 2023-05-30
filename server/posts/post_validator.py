from wvalidate import Validate as v

data_post = v.dict({
  "content": v.string(min=1)
})