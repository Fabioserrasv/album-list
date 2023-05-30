from django.db import models
from user_api.models import AppUser as User
from album.models import Album
from posts.models import Post
from django.utils.translation import gettext_lazy as _

# Create your models here.
class AlbumComment(models.Model):
  album = models.ForeignKey(Album, on_delete=models.CASCADE)
  text = models.CharField(max_length=500)
  context = models.ForeignKey("self", null=True, blank=True, related_name="children", on_delete=models.CASCADE)
  user = models.ForeignKey(User, on_delete=models.CASCADE)
  
  def get_tree(self):
    self.descendents = list(self.children.all())
    self.likes = self.comment_children.filter(type=AlbumCommentLikes.TypeLike.UP_LIKE).count()
    self.deslikes = self.comment_children.filter(type=AlbumCommentLikes.TypeLike.DOWN_LIKE).count()
    for child in self.descendents:
      child.get_tree()

class AlbumCommentLikes(models.Model):
  class TypeLike(models.IntegerChoices):
    UP_LIKE = 1, _("up_like")
    DOWN_LIKE = -1, _("down_like")
    
  user = models.ForeignKey(User, on_delete=models.CASCADE)
  comment = models.ForeignKey(AlbumComment, related_name="comment_children", on_delete=models.CASCADE)
  type = models.IntegerField(choices=TypeLike.choices, default=TypeLike.UP_LIKE)

# ---------------------------

class PostComment(models.Model):
  post = models.ForeignKey(Post, on_delete=models.CASCADE)
  text = models.CharField(max_length=500)
  context = models.ForeignKey("self", null=True, blank=True, related_name="children", on_delete=models.CASCADE)
  user = models.ForeignKey(User, on_delete=models.CASCADE)
  
  def get_tree(self):
    self.descendents = list(self.children.all())
    self.likes = self.comment_children.filter(type=PostCommentLikes.TypeLike.UP_LIKE).count()
    self.deslikes = self.comment_children.filter(type=PostCommentLikes.TypeLike.DOWN_LIKE).count()
    for child in self.descendents:
      child.get_tree()

class PostCommentLikes(models.Model):
  class TypeLike(models.IntegerChoices):
    UP_LIKE = 1, _("up_like")
    DOWN_LIKE = -1, _("down_like")
    
  user = models.ForeignKey(User, on_delete=models.CASCADE)
  comment = models.ForeignKey(PostComment, related_name="comment_children", on_delete=models.CASCADE)
  type = models.IntegerField(choices=TypeLike.choices, default=TypeLike.UP_LIKE)