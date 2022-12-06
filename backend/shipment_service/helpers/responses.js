exports.responses = (language) => {
  const resps = {
    EN: {
      email_not_found: "Email is not found",
      orgdata_not_found: "Orgdata not found",
      config_not_found: "Configuration not found",
      supplier_not_defined: "Supplier not defined",
      receiver_not_defined: "Receiver not defined",
      orderid_not_defined: "OrderId not defined",
      product_not_updated: "Product not updated",
      supplier_not_found: "Supplier warehouse details not found",
      not_found: " not found",
      shipment_not_found: "Shipment not found",
      shipment_found: "Shipment found",
      shipment_not_saved: "Shipment Not saved",
      shipment_created: "Shipment Created Succesfully",
      tagged_error: "Tagged product quantity not available",
      product_quantity_error: "Product quantity not available",
      rec_quantity_error:
        "Received quantity cannot be greater than Actual quantity",
      shipment_received: "Shipment Received",
      shipment_cannot_receive: "Cannot receive a Shipment without SO and PO",
      status_updated: "Status Updated",
      no_permission: "User does not have enough Permissions",
      id_not_exists: "ID does not exists, please try tracking existing IDs",
    },
    ES: {
      email_not_found: "No se encuentra el correo electrónico",
      orgdata_not_found: "Orgdata no encontrada",
      config_not_found: "Configuración no encontrada",
      supplier_not_defined: "Proveedor no definido",
      receiver_not_defined: "Receptor no definido",
      orderid_not_defined: "Ordenado no definido",
      product_not_updated: "Producto no actualizado",
      supplier_not_found: "Detalles del almacén del proveedor no encontrado",
      not_found: " no encontrado",
      shipment_not_found: "Envío no encontrado",
      shipment_found: "Envio encontrado",
      shipment_not_saved: "Envío no guardado",
      shipment_created: "Envío creado con éxito",
      tagged_error: "Tagged Cantidad de producto no disponible",
      product_quantity_error: "Cantidad de producto no disponible",
      rec_quantity_error:
        "La cantidad recibida no puede ser mayor que la cantidad real",
      shipment_received: "Envío recibido",
      shipment_cannot_receive: "No puede recibir un envío sin tal y po",
      status_updated: "Estado actualizado",
      no_permission: "El usuario no tiene suficientes permisos.",
      id_not_exists:
        "La identificación no existe, intente rastrear los ID existentes",
    },
  };
  const conf = resps[language || "ES"];
  return conf;
};
