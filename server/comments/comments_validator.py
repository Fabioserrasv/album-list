from wvalidate import Validate as v

validateId = v.integer(min=1)

data_album_comment = v.dict({
  "artist_name": v.string(min=1),
	"album_name": v.string(min=1),
	"context": v.nullable(v.integer(min=1)),
	"text": v.string(min=2)
})

data_post_comment = v.dict({
  "post_id": validateId,
	"context": v.nullable(v.integer(min=1)),
	"text": v.string(min=2)
})

data_list_album_comments = v.dict({
  "artist_name": v.string(min=1),
	"album_name": v.string(min=1)
})

data_put_like = v.dict({
  "comment_id": validateId,
	"like_type": v.enum(["like", "deslike"])
})