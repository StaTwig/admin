// Code generated by go-swagger; DO NOT EDIT.

package operations

// This file was generated by the swagger tool.
// Editing this file might prove futile when you re-run the swagger generate command

import (
	"net/http"

	"github.com/go-openapi/errors"
	"github.com/go-openapi/runtime"
	"github.com/go-openapi/runtime/middleware"
	"github.com/go-openapi/strfmt"
	"github.com/go-openapi/swag"
)

// NewGetVaccinatorsParams creates a new GetVaccinatorsParams object
// no default values defined in spec.
func NewGetVaccinatorsParams() GetVaccinatorsParams {

	return GetVaccinatorsParams{}
}

// GetVaccinatorsParams contains all the bound params for the get vaccinators operation
// typically these are obtained from a http.Request
//
// swagger:parameters getVaccinators
type GetVaccinatorsParams struct {

	// HTTP Request Object
	HTTPRequest *http.Request `json:"-"`

	/*Facility Code
	  In: query
	*/
	FacilityCode *string
	/*
	  In: query
	*/
	Limit *float64
	/*Vaccinator Name
	  In: query
	*/
	Name *string
	/*
	  In: query
	*/
	Offset *float64
}

// BindRequest both binds and validates a request, it assumes that complex things implement a Validatable(strfmt.Registry) error interface
// for simple values it will use straight method calls.
//
// To ensure default values, the struct must have been initialized with NewGetVaccinatorsParams() beforehand.
func (o *GetVaccinatorsParams) BindRequest(r *http.Request, route *middleware.MatchedRoute) error {
	var res []error

	o.HTTPRequest = r

	qs := runtime.Values(r.URL.Query())

	qFacilityCode, qhkFacilityCode, _ := qs.GetOK("facilityCode")
	if err := o.bindFacilityCode(qFacilityCode, qhkFacilityCode, route.Formats); err != nil {
		res = append(res, err)
	}

	qLimit, qhkLimit, _ := qs.GetOK("limit")
	if err := o.bindLimit(qLimit, qhkLimit, route.Formats); err != nil {
		res = append(res, err)
	}

	qName, qhkName, _ := qs.GetOK("name")
	if err := o.bindName(qName, qhkName, route.Formats); err != nil {
		res = append(res, err)
	}

	qOffset, qhkOffset, _ := qs.GetOK("offset")
	if err := o.bindOffset(qOffset, qhkOffset, route.Formats); err != nil {
		res = append(res, err)
	}

	if len(res) > 0 {
		return errors.CompositeValidationError(res...)
	}
	return nil
}

// bindFacilityCode binds and validates parameter FacilityCode from query.
func (o *GetVaccinatorsParams) bindFacilityCode(rawData []string, hasKey bool, formats strfmt.Registry) error {
	var raw string
	if len(rawData) > 0 {
		raw = rawData[len(rawData)-1]
	}

	// Required: false
	// AllowEmptyValue: false
	if raw == "" { // empty values pass all other validations
		return nil
	}

	o.FacilityCode = &raw

	return nil
}

// bindLimit binds and validates parameter Limit from query.
func (o *GetVaccinatorsParams) bindLimit(rawData []string, hasKey bool, formats strfmt.Registry) error {
	var raw string
	if len(rawData) > 0 {
		raw = rawData[len(rawData)-1]
	}

	// Required: false
	// AllowEmptyValue: false
	if raw == "" { // empty values pass all other validations
		return nil
	}

	value, err := swag.ConvertFloat64(raw)
	if err != nil {
		return errors.InvalidType("limit", "query", "float64", raw)
	}
	o.Limit = &value

	return nil
}

// bindName binds and validates parameter Name from query.
func (o *GetVaccinatorsParams) bindName(rawData []string, hasKey bool, formats strfmt.Registry) error {
	var raw string
	if len(rawData) > 0 {
		raw = rawData[len(rawData)-1]
	}

	// Required: false
	// AllowEmptyValue: false
	if raw == "" { // empty values pass all other validations
		return nil
	}

	o.Name = &raw

	return nil
}

// bindOffset binds and validates parameter Offset from query.
func (o *GetVaccinatorsParams) bindOffset(rawData []string, hasKey bool, formats strfmt.Registry) error {
	var raw string
	if len(rawData) > 0 {
		raw = rawData[len(rawData)-1]
	}

	// Required: false
	// AllowEmptyValue: false
	if raw == "" { // empty values pass all other validations
		return nil
	}

	value, err := swag.ConvertFloat64(raw)
	if err != nil {
		return errors.InvalidType("offset", "query", "float64", raw)
	}
	o.Offset = &value

	return nil
}