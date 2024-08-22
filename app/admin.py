from django.contrib import admin
from .models import Region, Empresa, Sede, Trabajador, Estado, Permiso, Permiso_terminado, Categoria, Certificado, Permisos_certificado
# Register your models here.
admin.site.register((Region, Empresa, Sede, Estado, Permiso_terminado))

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

    list_display = ("cert_key", "certificado")

@admin.register(Trabajador)
class TrabajadorAdmin(admin.ModelAdmin):
    model = Trabajador
    list_display = ("id_coor", "trabajador", "region")
