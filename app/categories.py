from django.http import JsonResponse
from django.db import connection, OperationalError, IntegrityError

def getCategories(request, cat):
    print("category:",cat)
    try:
        if cat != "":
            cursor = connection.cursor()
            cursor.execute("SELECT cat_key, categoria, clase FROM app_categoria WHERE clase = %s", [cat])
            cats = cursor.fetchall()
            print(cats)
            return JsonResponse({"categories": cats}, status=200)
        else:
            return JsonResponse({"categories": []}, status=200)
    except (OperationalError, IntegrityError) as e:
        print(e)
        return JsonResponse({"categories": []}, status=200)