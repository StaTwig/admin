const apiResponse = require("../utils/apiResponse");
const Organisation = require("../models/organisationModel");
const EmployeeModel = require("../models/employeeModel");
const auth = require("../middlewares/jwt");
const { customAlphabet } = require("nanoid");
const nanoid = customAlphabet("1234567890abcdef", 10);
const checkToken = require("../middlewares/middleware").checkToken;

exports.pendingRequests = [
  auth,
  async (req, res) => {
    try {
      checkToken(req, res, async (result) => {
        if (result.success) {
          const { organisationId } = req.user;
          await Organisation.aggregate([
            {
              $match: {
                id: organisationId,
                "affiliations.request_status": "PENDING",
              },
            },
            { $unwind: "$affiliations" },
            {
              $lookup: {
                from: "employees",
                let: { employee: "$affiliations" },
                pipeline: [
                  {
                    $match: {
                      $expr: {
                        $and: [
                          { $eq: ["$id", "$$employee.employee_id"] },
                          { $eq: ["$$employee.request_status", "PENDING"] },
                        ],
                      },
                    },
                  },
                ],
                as: "user",
              },
            },
            {
              $unwind: {
                path: "$user",
                includeArrayIndex: "arrayIndex",
              },
            },
            {
              $lookup: {
                from: "organisations",
                localField: "user.organisationId",
                foreignField: "id",
                as: "user.org",
              },
            },
            {
              $unwind: {
                path: "$user.org",
                includeArrayIndex: "arrayIndex",
              },
            },
            {
              $project: {
                _id: 0,
                affiliations: 1,
                name: 1,
                user: {
                  walletAddress: 1,
                  firstName: 1,
                  lastName: 1,
                  photoId: 1,
                  emailId: 1,
                  org: {
                    name: 1,
                  },
                },
              },
            },
            {
              $sort: { "affiliations.request_date": -1 },
            },
          ])
            .then((affliations) => {
              return apiResponse.successResponseWithData(
                res,
                "Pending Requests",
                affliations
              );
            })
            .catch((err) => {
              return apiResponse.ErrorResponse(res, err);
            });
        } else {
          res.status(403).json("Auth failed");
        }
      });
    } catch (err) {
      return apiResponse.ErrorResponse(res, err);
    }
  },
];

exports.sentRequests = [
  auth,
  async (req, res) => {
    try {
      checkToken(req, res, async (result) => {
        if (result.success) {
          const { organisationId } = req.user;
          await Organisation.aggregate([
            { $match: { organisationId: { $ne: organisationId } } },
            { $unwind: "$affiliations" },
            {
              $lookup: {
                from: "employees",
                let: { employee: "$affiliations" },
                pipeline: [
                  {
                    $match: {
                      $expr: {
                        $and: [
                          { $eq: ["$id", "$$employee.employee_id"] },
                          { $eq: ["$organisationId", organisationId] },
                        ],
                      },
                    },
                  },
                ],
                as: "user",
              },
            },
            {
              $project: {
                _id: 0,
                affiliations: 1,
                name: 1,
                user: {
                  walletAddress: 1,
                  firstName: 1,
                  lastName: 1,
                  photoId: 1,
                  emailId: 1,
                },
              },
            },
            {
              $unwind: {
                path: "$user",
                includeArrayIndex: "arrayIndex",
              },
            },
            {
              $sort: { "affiliations.request_date": -1 },
            },
          ])
            .then((affliations) => {
              return apiResponse.successResponseWithData(
                res,
                "Sent Requests",
                affliations
              );
            })
            .catch((err) => {
              return apiResponse.ErrorResponse(res, err);
            });
        } else {
          res.status(403).json("Auth failed");
        }
      });
    } catch (err) {
      return apiResponse.ErrorResponse(res, err);
    }
  },
];

exports.affiliateOrg = [
  auth,
  async (req, res) => {
    try {
      const { organisationId } = req.user;
      await Organisation.aggregate([
        {
          $match: {
            id: organisationId,
            $or: [
              { "affiliations.request_status": "APPROVED" },
              { "affiliations.request_status": "PENDING" },
            ],
          },
        },
        { $unwind: "$affiliations" },
        {
          $lookup: {
            from: "employees",
            let: { employee: "$affiliations" },
            pipeline: [
              {
                $match: {
                  $expr: { $eq: ["$id", "$$employee.employee_id"] },
                },
              },
            ],
            as: "user",
          },
        },
        {
          $unwind: {
            path: "$user",
            includeArrayIndex: "arrayIndex",
          },
        },
        {
          $lookup: {
            from: "organisations",
            localField: "user.organisationId",
            foreignField: "id",
            as: "user.org",
          },
        },
        {
          $unwind: {
            path: "$user.org",
            includeArrayIndex: "arrayIndex",
          },
        },
        {
          $project: {
            _id: 0,
            affiliations: 1,
            user: {
              walletAddress: 1,
              firstName: 1,
              lastName: 1,
              photoId: 1,
              emailId: 1,
              org: {
                id: 1,
                name: 1,
                postalAddress: 1,
              },
            },
          },
        },
        {
          $sort: { "affiliations.request_date": -1 },
        },
        {
          $group: {
            _id: "$user.org.name",
            user: { $first: "$user" },
            affiliations: { $push: "$$ROOT" },
            // orgs: { $push: "$$ROOT" },
          },
        },
      ])
        .then((affliations) => {
          return apiResponse.successResponseWithData(
            res,
            "Affliated Organisations Details",
            affliations
          );
        })
        .catch((err) => {
          return apiResponse.ErrorResponse(res, err);
        });
    } catch (err) {
      return apiResponse.ErrorResponse(res, err);
    }
  },
];

exports.allAffiliateOrgs = [
  auth,
  async (req, res) => {
    try {
      await EmployeeModel.find({ organisationId: req.user.organisationId })
        .select("affiliatedOrganisations")
        .then((orgs) => {
          var orgSet = new Set();
          orgs.map((item) => {
            item.affiliatedOrganisations.map((e) => {
              orgSet.add(e);
            });
          });
          if (orgSet.size > 0) {
            var orgArray = [...orgSet];
            Organisation.find({ id: { $in: orgArray } })
              .then((Organisations) => {
                return apiResponse.successResponseWithData(
                  res,
                  "All Affliated Organisations Details",
                  Organisations
                );
              })
              .catch((err) => {
                return apiResponse.ErrorResponse(res, err);
              });
          } else {
            return apiResponse.notFoundResponse(
              res,
              " No Affiliated Organisations Found"
            );
          }
        })
        .catch((err) => {
          return apiResponse.ErrorResponse(res, err);
        });
    } catch (err) {
      return apiResponse.ErrorResponse(res, err);
    }
  },
];

exports.acceptAffiliate = [
  auth,
  async (req, res) => {
    try {
      checkToken(req, res, async (result) => {
        if (result.success) {
          const { organisationId } = req.user;
          const { employee_id } = req.query;
          await Organisation.updateOne(
            {
              $and: [
                { id: organisationId },
                { "affiliations.request_status": "PENDING" },
                { "affiliations.employee_id": employee_id },
              ],
            },
            {
              $set: {
                "affiliations.$.request_status": "APPROVED",
                "affiliations.$.last_updated_on": new Date(),
              },
            }
          )
            .then((resUpdate) => {
              let res_message = "Affiliation request approved";
              if (resUpdate.nModified == 0)
                res_message =
                  "Affiliation request not approved. Refresh the page and try again!!!";
              return apiResponse.successResponseWithData(
                res,
                res_message,
                resUpdate
              );
            })
            .catch((err) => {
              return apiResponse.ErrorResponse(res, err);
            });
        } else {
          res.status(403).json("Auth failed");
        }
      });
    } catch (err) {
      return apiResponse.ErrorResponse(res, err);
    }
  },
];

exports.rejectAffiliate = [
  auth,
  async (req, res) => {
    try {
      checkToken(req, res, async (result) => {
        if (result.success) {
          const { organisationId } = req.user;
          const { employee_id } = req.query;
          await Organisation.updateOne(
            {
              $and: [
                { id: organisationId },
                { "affiliations.request_status": "PENDING" },
                { "affiliations.employee_id": employee_id },
              ],
            },
            {
              $set: {
                "affiliations.$.request_status": "REJECTED",
                "affiliations.$.last_updated_on": new Date(),
              },
            }
          )
            .then((resUpdate) => {
              let res_message = "Affiliation request rejected";
              if (resUpdate.nModified == 0)
                res_message =
                  "Affiliation request not rejected. Refresh the page and try again!!!";
              return apiResponse.successResponseWithData(
                res,
                res_message,
                resUpdate
              );
            })
            .catch((err) => {
              return apiResponse.ErrorResponse(res, err);
            });
        } else {
          res.status(403).json("Auth failed");
        }
      });
    } catch (err) {
      return apiResponse.ErrorResponse(res, err);
    }
  },
];

exports.unAffiliate = [
  auth,
  async (req, res) => {
    try {
      const { id } = req.query;
      await Organisation.update(
        {},
        {
          $pull: {
            affiliations: {
              employee_id: id,
            },
          },
        },
        { multi: true }
      )
        .then((employee) => {
          return apiResponse.successResponseWithData(
            res,
            "UnAffliated employee",
            employee
          );
        })
        .catch((err) => {
          return apiResponse.ErrorResponse(res, err);
        });
    } catch (err) {
      return apiResponse.ErrorResponse(res, err);
    }
  },
];

exports.unAffiliateOrg = [
  auth,
  async (req, res) => {
    try {
      const { organisationId } = req.user;
      const { orgId, emp } = req.body;
      await Organisation.updateOne(
        { id: organisationId },
        {
          $pull: {
            affiliations: {
              employee_id: { $in: emp },
              request_status: "APPROVED",
            },
          },
        }
      )
        .then((affliatedOrgs) => {
          if (affliatedOrgs.ok) {
            return apiResponse.successResponse(res, `Organisation unaffliated`);
          } else {
            return apiResponse.ErrorResponse(res, "Please try again");
          }
        })
        .catch((err) => {
          return apiResponse.ErrorResponse(res, err);
        });
    } catch (err) {
      return apiResponse.ErrorResponse(res, err);
    }
  },
];

exports.affiliate = [
  auth,
  async (req, res) => {
    const dateTimeNow = new Date();
    try {
      const { employee, org } = req.body;
      Organisation.updateOne(
        { id: org, "affiliations.employee_id": { $ne: employee } },
        {
          $push: {
            affiliations: {
              employee_id: employee,
              request_date: dateTimeNow,
              request_status: "PENDING",
              last_updated_on: dateTimeNow,
            },
          },
        },
        {
          new: true,
        }
      )
        .then((orgResponse) => {
          let res_message = "Affliation Request Sent";
          if (orgResponse.nModified == 0)
            res_message = "User already affliated to the organisation";
          return apiResponse.successResponseWithData(
            res,
            res_message,
            orgResponse
          );
        })
        .catch((err) => {
          return apiResponse.ErrorResponse(res, err);
        });
    } catch (err) {
      return apiResponse.ErrorResponse(res, err);
    }
  },
];

exports.getAllOrg = [
  auth,
  async (req, res) => {
    try {
      const { organisationId } = req.user;
      const organisations = await Organisation.find({
        id: { $ne: organisationId },
      }).select("name id");
      return apiResponse.successResponseWithData(
        res,
        "All organisations",
        organisations
      );
    } catch (err) {
      return apiResponse.ErrorResponse(res, err);
    }
  },
];
