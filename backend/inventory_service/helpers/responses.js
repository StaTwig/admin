exports.responses = (language) => {
    const resps = {
        EN: {
            updated_success: "Updated successfully",
            success: "Success",
            validation_error: "Validation Error",
            not_assigned_to_org: "Employee not assigned to any organization",
            cant_find_warehouse_inv: "Cannot find inventory to this employee warehouse",
            duplicated_sno: "Duplicate Serial Numbers found",
            batchExists: function (duplicateBatchNo) {
                return `A batch with batch number ${duplicateBatchNo} exists in the inventory`
            },
            added_inventory_products: "Added products to the inventories",
            no_permission: "User does not have enough Permissions",
            inventory_details: "Inventory Details",
            warehouse_not_found: "Cannot find warehouse for this employee",
            product_doesnt_exist: "Product Doesn't exist in the inventory.",
            invalid_excel: "Uploaded excel file is invalid",
        },
        ES: {
            updated_success: "Actualizado con éxito",
            success: "Éxito",
            validation_error: "Error de validacion",
            not_assigned_to_org: "Empleado no asignado a ninguna organización",
            cant_find_warehouse_inv: "No puede encontrar inventario a este almacén de empleados",
            duplicated_sno: "Números de serie duplicados encontrados",
            batchExists: function (duplicateBatchNo) {
                return `Un lote con número de lote ${duplicateBatchNo} existe en el inventario`
            },
            added_inventory_products: "Productos añadidos a los inventarios.",
            no_permission: "El usuario no tiene suficientes permisos.",
            inventory_details: "Detalles del inventario",
            warehouse_not_found: "No puede encontrar almacén para este empleado",
            product_doesnt_exist: "El producto no existe en el inventario.",
            invalid_excel: "El archivo de Excel subido no es válido",
        }
    };
    const conf = resps[language || 'ES'];
    return conf;
}
