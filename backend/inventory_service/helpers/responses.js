exports.responses = (language) => {
    const resps = {
        EN: {
            updated_success: "Updated successfully",
            success: "Success",
            validation_error: "Validation Error",
            not_assigned_to_org: "Employee not assigned to any organization",
            cant_find_warehouse_inv: "Cannot find inventory to this employee warehouse",
            duplicated_sno: "Duplicate Serial Numbers found",
            batchExists: function(duplicateBatchNo) {
                return `A batch with batch number ${duplicateBatchNo} exists in the inventory`
            },
            added_inventory_products: "Added products to the inventories",
            no_permission: "User does not have enough Permissions",

        },
        ES: {
            updated_success: "Actualizado con éxito",
            success: "Éxito",
            validation_error: "Error de validacion",
            not_assigned_to_org: "Empleado no asignado a ninguna organización",
            cant_find_warehouse_inv: "No puede encontrar inventario a este almacén de empleados",
            duplicated_sno: "Números de serie duplicados encontrados",
            batchExists: function(duplicateBatchNo) {
                return `Un lote con número de lote ${duplicateBatchNo} existe en el inventario`
            },
            added_inventory_products: "Productos añadidos a los inventarios.",
            no_permission: "El usuario no tiene suficientes permisos.",

        }
    };
    const conf = resps[language];
    return conf;
}
