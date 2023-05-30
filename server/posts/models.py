from django.db import models
from user_api.models import AppUser as User
from album.models import Album
from django.utils.translation import gettext_lazy as _

# Create your models here.
class Post(models.Model):
  text = models.TextField()
  user = models.ForeignKey(User, on_delete=models.CASCADE)
  
  def get_likes(self):
    self.likes = self.post_children.filter(type=PostLikes.TypeLike.UP_LIKE).count()
    self.deslikes = self.post_children.filter(type=PostLikes.TypeLike.DOWN_LIKE).count()

class PostLikes(models.Model):
  class TypeLike(models.IntegerChoices):
    UP_LIKE = 1, _("up_like")
    DOWN_LIKE = -1, _("down_like")
    
  user = models.ForeignKey(User, on_delete=models.CASCADE)
  post = models.ForeignKey(Post, related_name="post_children", on_delete=models.CASCADE)
  type = models.IntegerField(choices=TypeLike.choices, default=TypeLike.UP_LIKE)