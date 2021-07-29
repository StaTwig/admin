// Code generated by go-swagger; DO NOT EDIT.

package operations

// This file was generated by the swagger tool.
// Editing this file might prove futile when you re-run the swagger generate command

import (
	"net/http"

	"github.com/go-openapi/errors"
	"github.com/go-openapi/runtime/middleware"
	"github.com/go-openapi/strfmt"
)

// NewDeleteRecipientProgramParams creates a new DeleteRecipientProgramParams object
// no default values defined in spec.
func NewDeleteRecipientProgramParams() DeleteRecipientProgramParams {

	return DeleteRecipientProgramParams{}
}

// DeleteRecipientProgramParams contains all the bound params for the delete recipient program operation
// typically these are obtained from a http.Request
//
// swagger:parameters deleteRecipientProgram
type DeleteRecipientProgramParams struct {

	// HTTP Request Object
	HTTPRequest *http.Request `json:"-"`

	/*
	  Required: true
	  In: path
	*/
	EnrollmentOsid string
	/*
	  Required: true
	  In: path
	*/
	ProgramID string
}

// BindRequest both binds and validates a request, it assumes that complex things implement a Validatable(strfmt.Registry) error interface
// for simple values it will use straight method calls.
//
// To ensure default values, the struct must have been initialized with NewDeleteRecipientProgramParams() beforehand.
func (o *DeleteRecipientProgramParams) BindRequest(r *http.Request, route *middleware.MatchedRoute) error {
	var res []error

	o.HTTPRequest = r

	rEnrollmentOsid, rhkEnrollmentOsid, _ := route.Params.GetOK("enrollment_osid")
	if err := o.bindEnrollmentOsid(rEnrollmentOsid, rhkEnrollmentOsid, route.Formats); err != nil {
		res = append(res, err)
	}

	rProgramID, rhkProgramID, _ := route.Params.GetOK("program_id")
	if err := o.bindProgramID(rProgramID, rhkProgramID, route.Formats); err != nil {
		res = append(res, err)
	}

	if len(res) > 0 {
		return errors.CompositeValidationError(res...)
	}
	return nil
}

// bindEnrollmentOsid binds and validates parameter EnrollmentOsid from path.
func (o *DeleteRecipientProgramParams) bindEnrollmentOsid(rawData []string, hasKey bool, formats strfmt.Registry) error {
	var raw string
	if len(rawData) > 0 {
		raw = rawData[len(rawData)-1]
	}

	// Required: true
	// Parameter is provided by construction from the route

	o.EnrollmentOsid = raw

	return nil
}

// bindProgramID binds and validates parameter ProgramID from path.
func (o *DeleteRecipientProgramParams) bindProgramID(rawData []string, hasKey bool, formats strfmt.Registry) error {
	var raw string
	if len(rawData) > 0 {
		raw = rawData[len(rawData)-1]
	}

	// Required: true
	// Parameter is provided by construction from the route

	o.ProgramID = raw

	return nil
}
