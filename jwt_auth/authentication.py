import rest_framework
from rest_framework.authentication import BasicAuthentication
from rest_framework.exceptions import PermissionDenied
from django.contrib.auth import get_user_model
from django.conf import settings
import jwt
User = get_user_model()


class JWTAuthentication(BasicAuthentication):
    def authenticate(self, request):
        print("**********authenticate started**********")
        header = request.headers.get('Authorization')
        print(header)
        print("***********1**********")
        if not header:
            return None
        print("***********2**********")
        if header.startswith('Basic'):
            return None
        print("***********3**********")
        if not header.startswith('Bearer'):
            raise PermissionDenied({'message': 'Invalid authorization header'})
        print("***********4**********")
        print("********** cleared if statements **********")
        token = header.replace('Bearer ', '')
        print("***********5**********")
        try:
            payload = jwt.decode(
                token, settings.SECRET_KEY, algorithms=['HS256'])
            user = User.objects.get(pk=payload.get('sub'))
        except jwt.exceptions.InvalidTokenError:
            raise PermissionDenied({'message': 'Invalid Token'})
        except User.DoesNotExist:
            raise PermissionDenied({'message': 'User Not Found'})
        return (user, token)
