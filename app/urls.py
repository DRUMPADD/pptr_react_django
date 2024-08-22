from django.urls import path
import app.views as v
import app.categories as cat_v

urlpatterns = [
    path("", v.index, name="home"),
    path("create_permission", v.registerPermission, name="register"),
    # path("states", v.showStates, name="showStates"),
    # path("state/<str:name>", v.getState, name="showState"),
    path("regions", v.showRegions, name="showRegions"),
    path("sedes/<str:region_>", v.showSedesFromRegion, name="showSedes"),
    path("companies/<str:region>", v.showCompaniesFromRegion, name="showCompanies"),
    path("company/c_company_region", v.company_p_region, name="company_region"),
    path("company/c_company_permission", v.showCompaniesFromRegion, name="company_permission"),
    path("company/companies_w_perms", v.companies_with_perms, name="comps_w_perms"),
    path("company/all_comps_perms", v.all_comps_with_perms, name="all_comps_perms"),
    path("workers/<str:region>", v.showWorkersFromRegion, name="showWorkers"),
    path("region/<str:region>", v.getRegion, name="showRegion"),
    path("permissions", v.get_permissions_states, name="getPermissions"),
    path("permissions/<str:perm>", v.getPermission, name="getPermission"),
    path("permission/<str:perm>", v.getPermissionByPPTR, name="getPermissionPPTR"),
    path("categories", v.categories_by_region, name="categoriesByRegion"),
    path("categories_per_id", v.count_categories_per_id, name="countCategoriesPId"),
    path("getCategories/<str:cat>", cat_v.getCategories, name="getCategories"),
    path("classes_p_type", v.classes_p_type, name="getClassesPerType"),
    path("certificates", v.get_certificates, name="certificates"),
    path("createCategory", v.insert_cat, name="categories")
]