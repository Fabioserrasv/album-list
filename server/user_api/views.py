from django.contrib.auth import get_user_model, login, logout
from rest_framework.authentication import SessionAuthentication
from rest_framework.views import APIView
from rest_framework.response import Response
from .serializers import UserRegisterSerializer, UserLoginSerializer, UserSerializer
from rest_framework import permissions, status
from .validations import custom_validation, validate_email, validate_password
from posts.models import Post
from posts.serializers import convertPosts
from album.models import Album, UserAlbuns
from album.serializers import convertUserAlbumList
UserModel = get_user_model()

class UserRegister(APIView):
	permission_classes = (permissions.AllowAny,)
	def post(self, request):
		clean_data = custom_validation(request.data)
		serializer = UserRegisterSerializer(data=clean_data)
		if serializer.is_valid(raise_exception=True):
			user = serializer.create(clean_data)
			if user:
				return Response(serializer.data, status=status.HTTP_201_CREATED)
		return Response(status=status.HTTP_400_BAD_REQUEST)


class UserLogin(APIView):
	permission_classes = (permissions.AllowAny,)
	authentication_classes = (SessionAuthentication,)
	##
	def post(self, request):
		data = request.data
		assert validate_email(data)
		assert validate_password(data)
		serializer = UserLoginSerializer(data=data)
		if serializer.is_valid(raise_exception=True):
			user = serializer.check_user(data)
			login(request, user)
			return Response(serializer.data, status=status.HTTP_200_OK)


class UserLogout(APIView):
	permission_classes = (permissions.AllowAny,)
	authentication_classes = ()
	def post(self, request):
		logout(request)
		return Response(status=status.HTTP_200_OK)


class UserView(APIView):
	permission_classes = (permissions.IsAuthenticated,)
	authentication_classes = (SessionAuthentication,)
	##
	def get(self, request):
		serializer = UserSerializer(request.user)
		print(serializer.data)
		return Response({'user': serializer.data}, status=status.HTTP_200_OK)

	def put(self, request):
		data = request.data
		request.user.about_me = data['about_me']
		if not UserModel.objects.filter(username=data['username']):
			request.user.username = data['username']
		request.user.save()
		return Response({},status=status.HTTP_200_OK)

class UserChangePicture(APIView):
	permission_classes = (permissions.IsAuthenticated,)
	authentication_classes = (SessionAuthentication,)
	def post(self, request):
  #  lembrar validar png e jpg
		files = request.FILES
		image = files.get("image")
		image.name = 'pfp.jpg'
		request.user.profile_pic = image
		request.user.save()
		return Response(status=status.HTTP_200_OK)

class UserProfile(APIView):
	permission_classes = (permissions.IsAuthenticated,)
	authentication_classes = (SessionAuthentication,)
	##
	def get(self, request):
		data = request.GET
		
		user = UserModel.objects.filter(user_id=data['user_id']).last();
		user_posts = Post.objects.filter(user=user).order_by('-id')[0:10]
		posts = []
		for post in user_posts:
			post.get_likes()
			posts.append(convertPosts(post))
		
		user_albums = UserAlbuns.objects.filter(user=user)		
  
		serializer = UserSerializer(request.user)

		result = {
			**serializer.data,
			"posts": posts,
			"albums": [convertUserAlbumList(album.album, album.score) for album in user_albums]
		}

		return Response(result, status=status.HTTP_200_OK)