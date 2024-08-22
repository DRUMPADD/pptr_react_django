from django.shortcuts import render
<<<<<<< HEAD
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_GET, require_POST
from django.http import JsonResponse, HttpRequest
from .models import Sede, Region, Empresa, Trabajador, Permiso, Certificado, Permisos_certificado, Categoria
from django.db import connection, OperationalError, IntegrityError, InternalError, DataError, InterfaceError, NotSupportedError
import json
from django.core import serializers
from django.db.models import Count, F, Q
# Create your views here.

# ?? Functions
def check_permission(pptr):
    ''' GET
        Buscar permiso
        return object
    '''
=======
from django.views.decorators.csrf import ensure_csrf_cookie, csrf_exempt
from django.views.decorators.http import require_http_methods
from django.http import JsonResponse
from .models import Sede, Region, Empresa, Trabajador, Permiso, Certificado, Permisos_certificado, Categoria
from django.db import connection, OperationalError, IntegrityError, InternalError, DataError, InterfaceError, NotSupportedError
from django.template.exceptions import TemplateDoesNotExist, TemplateSyntaxError
from django.core.exceptions import BadRequest, SuspiciousOperation
import json
# Create your views here.
@require_http_methods(['GET'])
def index(request):
    try:
        return render(request, "index.html")
    except (TemplateDoesNotExist, TemplateSyntaxError, BadRequest, SuspiciousOperation) as e:
        print(e)

def create_company(id_comp, company, region):
    try:
        Empresa.objects.create(id_emp=id_comp, empresa=company, region_id=region)
    except (OperationalError, IntegrityError, InternalError, DataError, InterfaceError, NotSupportedError) as e:
        print(e)
def create_employee(e_area, employee, region):
    try:
        Trabajador.objects.create(id_coor=e_area, trabajador=employee, region_id=region)
    except (OperationalError, IntegrityError, InternalError, DataError, InterfaceError, NotSupportedError) as e:
        print(e)

def check_permission(pptr):
>>>>>>> e6e48eaa3257401cc6e1fe5acee4a142cbea2185
    try:
        return Permiso.objects.get(pptr=pptr)
    except (OperationalError, IntegrityError, InternalError, DataError, InterfaceError, NotSupportedError) as e:
        print(e)
<<<<<<< HEAD
        return None

def create_company(id_comp, company, region):
    '''
        Registrar compañía para volver a ser usada
    '''
    try:
        Empresa.objects.create(id_emp=id_comp, empresa=company, region_id=region)
        print(Empresa.objects.get(id_emp=id_comp))
    except (OperationalError, IntegrityError, InternalError, DataError, InterfaceError, NotSupportedError) as e:
        print(e)

def create_employee(new_emp, region):
    ''' INSERT
        Crear nuevo trabajador
    '''
    employee = new_emp
    try:
        id_new_emp = 'TR-' + ''.join([spell_emp[0] for spell_emp in str(employee).split(" ")]) + '-' + str(Trabajador.objects.count() + 1)
    except IndexError:
        id_new_emp = 'TR-' + ''.join([spell_emp[0] for spell_emp in str(employee).split(" ")]) + '-' + str(Trabajador.objects.count() + 1)
    try:
        Trabajador.objects.create(id_coor=id_new_emp, trabajador=employee, region_id=region)
        print("New employee:", id_new_emp)
        return id_new_emp
    except (OperationalError, IntegrityError, InternalError, DataError, InterfaceError, NotSupportedError) as e:
        print(e)

# ?? Certificates
@require_GET
def get_certificates(request: HttpRequest):
    try:
        certificates = list(Certificado.objects.values_list('cert_key', 'certificado'))
        return JsonResponse({"certs": certificates}, status=200)
    except (OperationalError, IntegrityError, InternalError, DataError, InterfaceError, NotSupportedError) as e:
        print(e)
        return JsonResponse({"certs": []}, status=200)

# ?? Permissions
@require_GET
def getPermission(request: HttpRequest, perm: str):
    try:
        permission = list(Permiso.objects.filter(Q(pptr__contains=perm) | Q(pptr=perm)).values_list('id_perm', 'pptr'))
        return JsonResponse({"status": "success", "msg": permission}, status=200)
    except (OperationalError, IntegrityError, InternalError, DataError, InterfaceError, NotSupportedError) as e:
        print(e)
    return JsonResponse({"status": "error", "msg": "Error del sistema"}, status=200)

@require_GET
def get_permissions_states(request: HttpRequest):
    try:
        permissions = list(Permiso.objects.values(id_e=F('estado__id_e'), status=F("estado__estado")).annotate(q_status=Count('estado__id_e')))
        
        return JsonResponse({"status": "success", "permissions": permissions}, status=200)
    except (OperationalError, IntegrityError, InternalError, DataError, InterfaceError, NotSupportedError) as e:
        print(e)
    return JsonResponse({"status": "error", "permissions": "Error del sistema"}, status=200)

@require_GET
def categories_by_region(request: HttpRequest):
    categories = list(Permiso.objects.annotate(num_cats=Count('work_cat')).values_list('num_cats', 'work_cat'))
    return JsonResponse({"status": 200, "cat": categories}, status=200)


@csrf_exempt
@require_POST
def registerPermission(request: HttpRequest):
    ''' INSERT
        Create new permission
    '''
    if request.method == 'POST':
        req_json = json.loads(request.body.decode("utf-8"))
        region: str = str(req_json["region"])
        company: str = str(req_json["empresa"])
        folio: str = str(req_json["folio_pptr"])
=======

@csrf_exempt
@require_http_methods(['POST'])
def registerPermission(request):
    if request.method == 'POST':
        req_json = json.loads(request.body.decode("utf-8"))
        employees = [req_json["enc_sit"], req_json["enc_area"], req_json["coor"]]
        region = str(req_json["region"])
        company = str(req_json["empresa"])
        folio = str(req_json["folio_pptr"])
>>>>>>> e6e48eaa3257401cc6e1fe5acee4a142cbea2185
        date_req = req_json["fecha_sol"]
        date_begin = req_json["fecha_ini"]
        date_finish = req_json["fecha_cie"]
        sup_comp = str(req_json["sup_comp"])
        tr = str(req_json["tr"])
<<<<<<< HEAD
        sit_tr: str = str(req_json["sit_tr"])
        cat_tr: str = str(req_json["cat_tr"]).split(" - ")[1]
        desc_tr: str = str(req_json["desc_tr"])
        permiso = str(req_json["clase_perm"])
        enc_sit: str = str(req_json["enc_sit"])
        enc_area: str = str(req_json["enc_area"])
        enc_coor: str = str(req_json["coor"])
        certificados = req_json["certifs"]
        inst: str = str(req_json["inst"])
        e_sit: str = ""
        e_area: str = ""
        coor: str = ""
        comp: str = ""
        
        if len(company.split(" - ")) >= 2:
            comp = company.split(" - ")[1]
        else:
            comp = 'EMP-' + ''.join([str(letter[0]).upper() for letter in str(company).split(" ")]) + '-' + str(Empresa.objects.count() + 1)
            create_company(comp, company, region)
        if enc_sit:
            if len(enc_sit.split(" - ")) >= 2: e_sit = enc_sit.split(" - ")[1]
            else: e_sit = create_employee(enc_sit, region)
        else: e_sit = ""
        if enc_area:
            if len(enc_area.split(" - ")) >= 2: e_area = enc_area.split(" - ")[1]
            else: e_area = create_employee(enc_area, region)
        else: e_area = ""
        if enc_coor:
            if len(enc_coor.split(" - ")) >= 2: coor = enc_coor.split(" - ")[1]
            else: coor = create_employee(enc_coor, region)
        else: coor = ""
        print(req_json)
        id_permission_created = ""
        try:
            if comp and e_sit and e_area and coor:
                new_permission = Permiso(date_request=date_req, date_begin_work=date_begin, date_end_work=date_finish, pptr=folio, empresa=Empresa.objects.get(id_emp=comp), work=tr, work_site=sit_tr, work_cat=Categoria.objects.get(cat_key=cat_tr), work_desc=desc_tr, coordinador=Trabajador.objects.get(id_coor=coor), resp_area=Trabajador.objects.get(id_coor=e_area), resp_sitio=Trabajador.objects.get(id_coor=e_sit), instalacion=inst)
                new_permission.save()
            
        except (Permiso.DoesNotExist, Categoria.DoesNotExist, Trabajador.DoesNotExist, OperationalError, IntegrityError, InternalError, DataError, InterfaceError, NotSupportedError) as e:
            print(e)
            return JsonResponse({"status": "error", "title": "No se pudo crear 1", "msg": "No se pudo crear el permiso",}, status=200)
=======
        sit_tr = str(req_json["sit_tr"])
        cat_tr = str(req_json["cat_tr"]).split(" - ")[1]
        desc_tr = str(req_json["desc_tr"])
        permiso = str(req_json["clase_perm"])
        enc_sit = str(req_json["enc_sit"])
        enc_area = str(req_json["enc_area"])
        enc_coor = str(req_json["coor"])
        certificados = req_json["certifs"]
        inst = str(req_json["inst"])
        e_sit =   ""
        e_area = ""
        coor = ""
        comp = ""
        print('-'.join([val for val in str(date_req).split("-")][::-1]) if date_req else "Nothing")
        print("region:",region)
        print("date_req:",date_req)
        print("date_begin:",date_begin)
        print("date_finish:",date_finish)
        print("company:",company)
        print("folio:",folio)
        print("sup_comp:",sup_comp)
        print("tr:",tr)
        print("sit_tr:",sit_tr)
        print("cat_tr:",cat_tr)
        print("desc_tr:",desc_tr)
        print("permiso:",permiso)
        print("enc_sit:",enc_sit)
        print("enc_area:",enc_area)
        print("enc_coor:",enc_coor)
        print("certifs:", certificados)
        print("inst:", inst)

        if len(company.split(" - ")) >= 2:
            comp = company.split(" - ")[1]
            print("Exist:",comp)
        else:
            comp = 'EMP-' + ''.join([str(letter[0]).upper() for letter in str(company).split(" ")]) + '-' + str(Empresa.objects.count() + 1)
            print("New company id:",comp, company)
            create_company(comp, company, region)

        if len(enc_sit.split(" - ")) >= 2:
            e_sit = enc_sit.split(" - ")[1]
            print("Exist:", e_sit)
        else:
            employee = enc_sit
            e_sit = 'TR-' + ''.join([spell_emp[0] for spell_emp in str(employee).split(" ")]) + '-' + str(Trabajador.objects.count() + 1)
            print("New enc sit:", e_sit, employee)
            create_employee(e_sit, employee, region)

        if len(enc_area.split(" - ")) >= 2:
            e_area = enc_area.split(" - ")[1]
            print("Exist:", enc_area)
        else:
            employee = enc_area
            e_area = 'TR-' + ''.join([spell_emp[0] for spell_emp in str(employee).split(" ")]) + '-' + str(Trabajador.objects.count() + int(1))
            print("New enc area:", e_area, employee)
            create_employee(e_area, employee, region)
        
        if len(enc_coor.split(" - ")) >= 2:
            coor = enc_coor.split(" - ")[1]
            print("Exist:", coor)
        else:
            employee = enc_coor
            coor = 'TR-' + ''.join([spell_emp[0] for spell_emp in str(employee).split(" ")]) + '-' + str(Trabajador.objects.count() + 1)
            print("New coor:", coor, employee)
            create_employee(coor, employee, region)
        id_permission_created = ""
        try:
            Permiso.objects.create(date_request=date_req, date_begin_work=date_begin, date_end_work=date_finish, pptr=folio, empresa=Empresa.objects.get(id_emp=comp), work=tr, work_site=sit_tr, work_cat=Categoria.objects.get(cat_key=cat_tr), work_desc=desc_tr, coordinador=Trabajador.objects.get(id_coor=coor), resp_area=Trabajador.objects.get(id_coor=e_area), resp_sitio=Trabajador.objects.get(id_coor=e_sit), instalacion=inst)
        except (Permiso.DoesNotExist, OperationalError, IntegrityError, InternalError, DataError, InterfaceError, NotSupportedError) as e:
            print(e)
>>>>>>> e6e48eaa3257401cc6e1fe5acee4a142cbea2185
        try:
            id_permission_created = Permiso.objects.get(pptr=folio)
            print(id_permission_created)
        except (PendingDeprecationWarning) as e:
            print(e)
<<<<<<< HEAD
            return JsonResponse({"status": "error", "title": "Ocurrió un error 2", "msg": "No se pudo crear el permiso"}, status=200)
=======
>>>>>>> e6e48eaa3257401cc6e1fe5acee4a142cbea2185
    
        try:
            for c in certificados:
                cert_ = Certificado.objects.get(cert_key=c)
                Permisos_certificado.objects.create(permiso=id_permission_created, certificado=cert_)
                print(c, id_permission_created)
        except(PendingDeprecationWarning, SyntaxError) as e:
            print(e)
        return JsonResponse({"status": "success", "msg": "Permiso creado"}, status=200)
    else:
        return JsonResponse({"status": "error", "msg": "Error del sistema"}, status=200)

<<<<<<< HEAD
@require_GET
def count_categories_per_id(request: HttpRequest):
    categories = list(Permiso.objects.annotate(cantidad=Count('work_cat')).values('work_cat', 'cantidad', 'work_cat__categoria', 'work_cat__clase').order_by('work_cat__cat_key'))
    return JsonResponse({"status": "success", "categories": categories}, status=200)

@require_GET
def getPermissionByPPTR(request: HttpRequest, perm: str):
    try:
        try:
            permission = list(Permiso.objects.filter(pptr=perm).values_list('id_perm', 'date_request', 'date_begin_work', 'date_end_work', 'pptr', 'empresa__empresa', 'work', 'work_site', 'work_cat__categoria', 'work_desc', 'coordinador__trabajador', 'resp_area__trabajador', 'resp_sitio__trabajador', 'estado__estado'))
            certificates = list(Permisos_certificado.objects.filter(permiso__pptr=perm).values_list('perm_cert', 'certificado__cert_key', 'certificado__certificado'))
        except (Permiso.DoesNotExist, Permisos_certificado.DoesNotExist):
            permission = []
            certificates = []
        return JsonResponse({"status": "success", "msg": permission[0], "certs": certificates}, status=200)
    except (OperationalError, IntegrityError, InternalError, DataError, InterfaceError, NotSupportedError) as e:
        print(e)
    return JsonResponse({"status": "error", "msg": "Error del sistema"}, status=200)


# ?? Sedes

# ?? Regions
@require_GET
def showRegions(request: HttpRequest):
    ''' GET
        Return all regions
    '''
    try:
        regions = list(Region.objects.values_list('id_reg', 'region'))
        return JsonResponse({"regions": regions}, status=200)
    except (OperationalError, IntegrityError, InternalError, DataError, InterfaceError, NotSupportedError) as e:
        print(e)
        return JsonResponse({"regions": []}, status=200)

@require_GET
def showCompaniesFromRegion(request: HttpRequest, region : str):
    try:
        # cursor = connection.cursor()
        # cursor.execute("SELECT id_emp, empresa FROM app_Empresa as emp, app_Region as r WHERE r.id_reg = emp.region_id and r.id_reg = %s", [region])
        # companies = cursor.fetchall()
        companies: list = list(Empresa.objects.filter(region__id_reg=region).values_list('id_emp', 'empresa'))
        return JsonResponse({"companies": companies}, status=200)
    except (OperationalError, IntegrityError, InternalError, DataError, InterfaceError, NotSupportedError) as e:
        print(e)
        return JsonResponse({"companies": []}, status=200)

@require_GET
def showWorkersFromRegion(request: HttpRequest, region: str):
    try:
        # cursor = connection.cursor()
        # cursor.execute("SELECT id_coor, trabajador FROM app_Trabajador as t, app_Region as r WHERE r.id_reg = t.region_id and r.id_reg = %s", [region])
        # workers = cursor.fetchall()
        workers = list(Trabajador.objects.filter(region=region).values_list('id_coor', 'trabajador'))
        return JsonResponse({"workers": workers}, status=200)
    except (OperationalError, IntegrityError, InternalError, DataError, InterfaceError, NotSupportedError) as e:
        print(e)
        return JsonResponse({"workers": []}, status=200)

@require_GET
def showSedesFromRegion(request: HttpRequest, region_: str):
    try:
        sedes_orm = list(Sede.objects.filter(region=region_).values_list('id_sede', 'sede'))
        return JsonResponse({"sedes": sedes_orm}, status=200)
    except (OperationalError, IntegrityError, InternalError, DataError, InterfaceError, NotSupportedError) as e:
        print(e)
        return JsonResponse({"sedes": []}, status=500)

@require_GET
def getRegion(request: HttpRequest, region: str):
    regions = list(Region.objects.filter(region__contains=region).values('id_reg', 'region'))
    return JsonResponse({"regions": regions}, status=200)


@require_GET
def index(request: HttpRequest):
    return render(request, "index.html")

=======
>>>>>>> e6e48eaa3257401cc6e1fe5acee4a142cbea2185
# def showStates(request):
#     states = serializers.serialize("json", State.objects.all())
#     data = json.loads(states)
#     return JsonResponse({"states": data}, status=200)

# def getState(request, name):
#     print(name)
#     data = serializers.serialize("json", State.objects.filter(st_name__istartswith=name))
#     state = json.loads(data)
    # return JsonResponse({"states": state}, status=200)

<<<<<<< HEAD

def insert_cat(request: HttpRequest):
=======
def showRegions(request):
    try:
        cursor = connection.cursor()
        cursor.execute("SELECT * FROM app_Region")
        regions = cursor.fetchall()
        return JsonResponse({"regions": regions}, status=200)
    except (OperationalError, IntegrityError, InternalError, DataError, InterfaceError, NotSupportedError) as e:
        print(e)
        return JsonResponse({"regions": []}, status=200)

def showCompaniesFromRegion(request, region):
    try:
        cursor = connection.cursor()
        cursor.execute("SELECT id_emp, empresa FROM app_Empresa as emp, app_Region as r WHERE r.id_reg = emp.region_id and r.id_reg = %s", [region])
        companies = cursor.fetchall()
        return JsonResponse({"companies": companies}, status=200)
    except (OperationalError, IntegrityError, InternalError, DataError, InterfaceError, NotSupportedError) as e:
        print(e)
        return JsonResponse({"companies": []}, status=200)

def showWorkersFromRegion(request, region):
    try:
        cursor = connection.cursor()
        cursor.execute("SELECT id_coor, trabajador FROM app_Trabajador as t, app_Region as r WHERE r.id_reg = t.region_id and r.id_reg = %s", [region])
        workers = cursor.fetchall()
        return JsonResponse({"workers": workers}, status=200)
    except (OperationalError, IntegrityError, InternalError, DataError, InterfaceError, NotSupportedError) as e:
        print(e)
        return JsonResponse({"workers": []}, status=200)

def showSedesFromRegion(request, region):
    try:
        cursor = connection.cursor()
        cursor.execute("SELECT id_sede, sede FROM app_Sede as s, app_Region as r WHERE r.id_reg = s.region_id and r.id_reg = %s", [region])
        sedes = cursor.fetchall()
        return JsonResponse({"sedes": sedes}, status=200)
    except (OperationalError, IntegrityError, InternalError, DataError, InterfaceError, NotSupportedError) as e:
        print(e)
        return JsonResponse({"sedes": []}, status=200)


def getRegion(request, region):
    try:
        cursor = connection.cursor()
        cursor.execute(f"SELECT id_reg, region FROM app_Region WHERE region LIKE '%{region}%'")
        region = cursor.fetchall()
        return JsonResponse({"regions": region}, status=200)
    except (OperationalError, IntegrityError, InternalError, DataError, InterfaceError, NotSupportedError) as e:
        print("Permission error:",e)
        return JsonResponse({"status": "error", "msg": "Error del sistema"}, status=200)

def getPermission(request, perm):
    try:
        print(perm)
        cursor = connection.cursor()
        cursor.execute("SELECT id_perm, pptr FROM app_Permiso where pptr LIKE '%{}%'".format(perm))
        permission = cursor.fetchall()
        print(permission)
        return JsonResponse({"status": "success", "msg": permission}, status=200)
    except (OperationalError, IntegrityError, InternalError, DataError, InterfaceError, NotSupportedError) as e:
        print("Permission error:",e)
        return JsonResponse({"status": "error", "msg": "Error del sistema"}, status=200)

def getPermissions(request):
    try:
        cursor = connection.cursor()
        cursor.execute("SELECT * FROM app_Permiso")
        permission = cursor.fetchall()
        print(permission)
        return JsonResponse({"status": "success", "msg": permission}, status=200)
    except (OperationalError, IntegrityError, InternalError, DataError, InterfaceError, NotSupportedError) as e:
        print(e)
        return JsonResponse({"status": "error", "msg": "Error del sistema"}, status=200)

def getPermissionByPPTR(request, perm):
    try:
        print(perm)
        cursor = connection.cursor()
        cursor2 = connection.cursor()
        cursor.execute("SELECT id_perm, date_request, date_begin_work, date_end_work, pptr, empresa_id, work, work_site, c.categoria, work_desc, t3.trabajador, t.trabajador, t2.trabajador, e.estado FROM app_Permiso, app_Estado as e, app_Trabajador as t, app_Trabajador as t2, app_Trabajador as t3, app_Categoria as c where pptr = '{}' and e.id_e = estado_id and t.id_coor = resp_area_id and t2.id_coor = resp_sitio_id and t3.id_coor = coordinador_id and app_Permiso.work_cat_id = c.cat_key".format(perm))
        cursor2.execute("SELECT perm_cert, p.id_perm, p.pptr, c.cert_key, c.certificado from app_Permisos_certificado as pc, app_Certificado as c, app_Permiso as p where pc.certificado_id = c.cert_key and pc.permiso_id = p.id_perm and p.pptr = '{}'".format(perm))
        permission = cursor.fetchall()
        certificates = cursor2.fetchall()
        print("Permission:",permission)
        print("Certificates:",certificates)
        return JsonResponse({"status": "success", "msg": permission, "certs": certificates}, status=200)
    except (OperationalError, IntegrityError, InternalError, DataError, InterfaceError, NotSupportedError) as e:
        print(e)
        return JsonResponse({"status": "error", "msg": "Error del sistema"}, status=200)


def categories_by_region(request):
    try:
        cursor = connection.cursor()
        cursor.execute("SELECT count(work_cat), work_cat from app_Permiso group by work_cat")
        categories = cursor.fetchall()
        return JsonResponse({"status": 200, "cat": categories}, status=200)
    except (OperationalError, IntegrityError, InternalError, DataError, InterfaceError, NotSupportedError) as e:
        print("Permission error:",e)
        return JsonResponse({"status": "error", "msg": "Error del sistema"}, status=200)


def insert_cat(request):
>>>>>>> e6e48eaa3257401cc6e1fe5acee4a142cbea2185
    categories = [
        ("A1", "Trabajos de corte y soldadura", "A"),
        ("A2", "Esmerillada en áreas clasificadas", "A"),
        ("A3", "Trabajo eléctrico en instalaciones o equipos", "A"),
        ("A4", "Entrada a tanques o espacios confinados", "A"),
        ("A5", "Manejo de sustancias y materiales riesgosos", "A"),
        ("A6", "Trabajos que afecten la disponibilidad de los equipos", "A"),
        ("A7", "Trabajos eléctricos", "A"),
        ("A8", "Trabajos que impliquen intervenir los equipos", "A"),
        ("A9", "Operaciones de izaje de equipos y materiales", "A"),
        ("A10", "Actividades de prueba y arranque de equipos", "A"),
        ("A11", "Operaciones de buceo", "A"),
        ("B20", "Limpieza con chorro de arena", "B"),
        ("B21", "Eliminación de pintura o rebabas", "B"),
        ("B22", "Uso de herramientas hidráulicas, neumáticas o manuales", "B"),
        ("B23", "Uso temporal de motores de combustión interna", "B"),
        ("B24", "Uso del equipo que no es intrinsecamente seguro", "B"),
        ("B25", "Trabajos en los que exista riesgo de caer al agua", "B"),
        ("B26", "Utilización de chorros de agua a alta presión", "B"),
        ("B27", "Aplicación de pintura de aceite", "B"),
        ("B28", "Cambio de barandales, escotillas o escaleras", "B"),
        ("B30", "Trabajos a una altura de 1.80 mts o superiores", "B"),
        ("B31", "Montaje, desmontaje de andamiaje en instalaciones", "B"),
        ("B34", "Uso de cámaras fotográficas o de vídeo", "B"),
        ("B36", "Pruebas de presión", "B"),
        ("B39", "Excavaciones con profundidad de más de 30 cm", "B"),
        ("B40", "Arriado e izaje de botes de salvamento", "B"),
        ("B41", "Trabajos en registros eléctricos subterráneos", "B"),
        ("B42", "Maniobras y transporte de equipo o material", "B"),
    ]
<<<<<<< HEAD
    cursor = connection.cursor()
    for category in categories:
        cursor.execute("INSERT INTO app_Categoria (cat_key, categoria, clase) values(%s, %s, %s)", [category[0], category[1], category[2]])
    return JsonResponse({"cats": categories}, status=200)

@require_GET
def classes_p_type(request: HttpRequest):
    try:
        classes = list(Permiso.objects.all().values('work_cat__clase').annotate(clases=Count('work_cat__clase')))
        if len(classes) > 0:
            return JsonResponse({"classes": classes}, status=200)
        return JsonResponse({"classes": []}, status=404)
    except (Permiso.DoesNotExist, Permiso.MultipleObjectsReturned) as e:
        print(e)
        return JsonResponse({"classes": []}, status=500)

@require_GET
def company_p_region(request: HttpRequest):
    companies = list(Empresa.objects.all().values('region__id_reg', 'region__region').annotate(cantidad=Count('empresa')))
    return JsonResponse({"companies": companies}, status=200)

@require_GET
def companies_with_perms(request: HttpRequest):
    companies = list(Permiso.objects.all().values('empresa__id_emp', 'empresa__empresa').annotate(cantidad=Count('empresa')))
    return JsonResponse({"companies": companies}, status=200)

@require_GET
def all_comps_with_perms(request: HttpRequest):
    try:
        companies = list(Permiso.objects.values('pptr', 'empresa__id_emp'))
        return JsonResponse({'companies': companies}, status=200)
    except (IntegrityError, DataError, OperationalError) as e:
        print(e)
        return JsonResponse({'companies': []}, status=500)
=======

    cursor = connection.cursor()
    for category in categories:
        cursor.execute("INSERT INTO app_Categoria (cat_key, categoria, clase) values(%s, %s, %s)", [category[0], category[1], category[2]])
        # print(category[1])
    return JsonResponse({"cats": categories}, status=200)

def insertCertf(request):
    try:
        cursor = connection.cursor()
        cursor.execute("SELECT * FROM app_Certificado")
        return JsonResponse({"certs": cursor.fetchall()}, status=200)
    except (OperationalError, IntegrityError, InternalError, DataError, InterfaceError, NotSupportedError) as e:
        print(e)
        return JsonResponse({"certs": []}, status=200)
>>>>>>> e6e48eaa3257401cc6e1fe5acee4a142cbea2185
