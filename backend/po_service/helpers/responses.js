exports.responses = (language) => {
    const resps = {
        EN: {
            po_status: "PO Status",
            success: "Success",
            not_authorized: "You are not authorised to change the status",
            no_permission: "User does not have enough Permissions",
            upload_result: "Upload Result",
            inserted_ex_duplicates: "Inserted excluding Duplicate Values",
            supplier_not_defined: "Supplier not defined",
            receiver_not_defined: "Receiver not defined",
            created_order: "Created order",
            invalid_excel: "Uploaded excel file is invalid",
        },
        ES: {
            po_status: "Por estado",
            success: "Éxito",
            not_authorized: "No estás autorizado para cambiar el estado.",
            no_permission: "El usuario no tiene suficientes permisos.",
            upload_result: "Resultado de carga",
            inserted_ex_duplicates: "Insertado excluyendo valores duplicados",
            supplier_not_defined: "Proveedor no definido",
            receiver_not_defined: "Receptor no definido",
            created_order: "Orden creado",
            invalid_excel: "El archivo de Excel subido no es válido",
        }
    };
    const conf = resps[language || 'ES'];
    return conf;
}
