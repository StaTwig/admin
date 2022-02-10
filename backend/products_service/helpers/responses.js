exports.responses = (language) => {
    const resps = {
        EN: {
            orgid_not_found: function (orgid){
                return `Organization of id ${orgid} not found`
            },
            no_permission: "User does not have enough Permissions",

        },
        ES: {
            orgid_not_found: function (orgid){
                return `Organización de ID ${orgid} No se encontró`
            },
            no_permission: "El usuario no tiene suficientes permisos.",

        }
    };
    const conf = resps[language || 'ES'];
    return conf;
}
