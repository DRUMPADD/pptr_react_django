from django.contrib import admin
<<<<<<< HEAD
from django.contrib.auth.models import Group
from .models import Region, Empresa, Sede, Trabajador, Estado, Permiso, Categoria, Certificado, Permisos_certificado, Permiso_Region
# Register your models here.
admin.site.register((Region, Empresa, Sede, Estado, Permiso_Region, ))
=======
from .models import Region, Empresa, Sede, Trabajador, Estado, Permiso, Permiso_terminado, Categoria, Certificado, Permisos_certificado
# Register your models here.
admin.site.register((Region, Empresa, Sede, Trabajador, Estado, Permiso_terminado))
>>>>>>> e6e48eaa3257401cc6e1fe5acee4a142cbea2185

@admin.register(Permiso)
class PermisoAdmin(admin.ModelAdmin):
    model = Permiso
    list_display = ("id_perm", "date_request", "date_begin_work", "date_end_work", "pptr", "empresa", "work", "work_site", "work_cat", "work_desc", "coordinador", "resp_area", "resp_sitio", "estado")

@admin.register(Categoria)
class CategoriaAdmin(admin.ModelAdmin):
    model = Categoria
    list_display = ("cat_key", "categoria", "clase")

@admin.register(Permisos_certificado)
class Certificado_PermisoAdmin(admin.ModelAdmin):
    model = Permisos_certificado
    list_display = ("perm_cert", "permiso", "certificado")

@admin.register(Certificado)
class CategoriaAdmin(admin.ModelAdmin):
    model = Certificado
<<<<<<< HEAD
    list_display = ("cert_key", "certificado")

@admin.register(Trabajador)
class TrabajadorAdmin(admin.ModelAdmin):
    model = Trabajador
    list_display = ("id_coor", "trabajador", "region")

admin.site.unregister(Group)
=======
    list_display = ("cert_key", "certificado")
>>>>>>> e6e48eaa3257401cc6e1fe5acee4a142cbea2185
