from django.db import models
from django.utils import timezone
# Create your models here.
class Region(models.Model):
    id_reg = models.CharField(primary_key=True, max_length=50)
    region = models.CharField(max_length=150)

    def __str__(self):
        return f"{self.region}"

class Sede(models.Model):
    id_sede = models.CharField(primary_key=True, max_length=30)
    sede = models.CharField(max_length=150, null=False)
    region = models.ForeignKey(Region, on_delete=models.CASCADE, default="")

    def __str__(self):
        return f"{self.sede}, {self.region}"

class Trabajador(models.Model):
    id_coor = models.CharField(primary_key=True, max_length=30)
    trabajador = models.CharField(max_length=300, null=False)
    region = models.ForeignKey(Region, on_delete=models.CASCADE)

    def __str__(self):
        return f"{self.id_coor}"

class Empresa(models.Model):
    id_emp = models.CharField(primary_key=True, max_length=30)
    empresa = models.CharField(max_length=150, null=False)
    region = models.ForeignKey(Region, on_delete=models.CASCADE)

    def __str__(self):
        return f"{self.id_emp}"

class Estado(models.Model):
    id_e = models.AutoField(primary_key=True)
    estado = models.CharField(max_length=20, blank=False)

    def __str__(self):
        return f"{self.estado}"

class Certificado(models.Model):
    cert_key = models.AutoField(primary_key=True)
    certificado = models.CharField(max_length=150, blank=True)

    def __str__(self):
        return f'{self.cert_key}'

class Categoria(models.Model):
    cat_key = models.CharField(max_length=5, primary_key=True)
    categoria = models.CharField(max_length=150, null=False, blank=False)
    clase = models.CharField(max_length=1, blank=False)

    def __str__(self):
        return f'{self.cat_key}'

class Permiso(models.Model):
    id_perm = models.AutoField(primary_key=True)
<<<<<<< HEAD
    date_request = models.DateField(default=timezone.now)
    date_begin_work = models.DateField(default=timezone.now)
    date_end_work = models.DateField(default=timezone.now)
=======
    date_request = models.DateField(default=timezone.now())
    date_begin_work = models.DateField(default=timezone.now())
    date_end_work = models.DateField(default=timezone.now())
>>>>>>> e6e48eaa3257401cc6e1fe5acee4a142cbea2185
    type_permission = models.CharField(max_length=30, default="", blank=True)
    pptr = models.CharField(max_length=50, default="", unique=True)
    empresa = models.ForeignKey(Empresa, on_delete=models.CASCADE)
    work = models.CharField(max_length=200, default="", blank=True)
    work_site = models.CharField(max_length=200, default="", blank=True)
    # work_cat = models.CharField(max_length=200, default="", blank=True)
    work_cat = models.ForeignKey(Categoria, on_delete=models.CASCADE, blank=True)
    work_desc = models.TextField(blank=True)
    coordinador = models.ForeignKey(Trabajador, on_delete=models.CASCADE, related_name="coordinador")
    resp_area = models.ForeignKey(Trabajador, on_delete=models.CASCADE, related_name="resp_area")
    resp_sitio = models.ForeignKey(Trabajador, on_delete=models.CASCADE, related_name="resp_sitio")
    estado = models.ForeignKey(Estado, on_delete=models.CASCADE, default=1)
    instalacion = models.TextField(blank=True)
    def __str__(self):
        return f"{self.id_perm}"

<<<<<<< HEAD
# class Permiso_terminado(models.Model):
#     id = models.CharField(primary_key=True, max_length=30)
#     folio = models.ForeignKey(Permiso, on_delete=models.CASCADE, related_name='permission_finished')
#     motivo = models.CharField(max_length=500)

#     def __str__(self):
#         return f"{self.folio} - {self.motivo}"

class Permiso_Region(models.Model):
    permiso = models.ForeignKey(Permiso, on_delete=models.CASCADE, related_name='permission_region')
=======
class Permiso_terminado(models.Model):
    id = models.CharField(primary_key=True, max_length=30)
    folio = models.ForeignKey(Permiso, on_delete=models.CASCADE)
    motivo = models.CharField(max_length=500)

    def __str__(self):
        return f"{self.folio} - {self.motivo}"

class Permiso_Region(models.Model):
    permiso = models.ForeignKey(Permiso, on_delete=models.CASCADE)
>>>>>>> e6e48eaa3257401cc6e1fe5acee4a142cbea2185
    region = models.ForeignKey(Region, on_delete=models.CASCADE)

class Permisos_certificado(models.Model):
    perm_cert = models.AutoField(primary_key=True)
<<<<<<< HEAD
    permiso = models.ForeignKey(Permiso, on_delete=models.CASCADE, related_name='permission_w_cert')
    certificado = models.ForeignKey(Certificado, on_delete=models.CASCADE, related_name='cert')
=======
    permiso = models.ForeignKey(Permiso, on_delete=models.CASCADE)
    certificado = models.ForeignKey(Certificado, on_delete=models.CASCADE)
>>>>>>> e6e48eaa3257401cc6e1fe5acee4a142cbea2185
