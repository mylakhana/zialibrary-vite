import { z } from "zod";

const addressSchema = z.object({
  country: z.string(),
  city_id: z.string().min(1, "validation.cityRequired"),
  city_name: z.string().min(3, "validation.cityRequired"),
  district: z
    .string({
      required_error: "validation.districtRequired",
      invalid_type_error: "validation.districtInvalid",
    })
    .min(3, "validation.districtMinLength"),
  street_name: z.string().optional(),
  building_no: z.string().optional(),
  zip_code: z.string().optional(),
});

// Validation schemas for each step
const step1Schema = z.object({
  sender: z.object({
    name: z.string(),
  }),
  customer: z.object({
    name: z
      .string({
        required_error: "validation.nameRequired",
      })
      .min(3, "validation.nameMinLength"),
    mobile: z
      .string({
        required_error: "validation.mobileRequired",
        invalid_type_error: "validation.mobileInvalid",
      })
      .min(9, "validation.mobileInvalid"),
    mobile_country: z.string(),
    country: z.string({
      required_error: "validation.countryRequired",
      invalid_type_error: "validation.countryRequired",
    }),
    city_id: z.string({
      required_error: "validation.cityRequired",
      invalid_type_error: "validation.cityInvalid",
    }),
    district: z
    .string({
      required_error: "validation.districtRequired",
      invalid_type_error: "validation.districtInvalid",
    })
    .min(3, "validation.districtMinLength"),

    // short_address: z.string().regex(/^[A-Za-z]{4}[0-9]{4}$/, "validation.shortAddressInvalid").optional(),
  }),
  addressType: z.enum(["manual", "short"]),
});

const step2Schema = z.object({
  packages: z
    .array(
      z.object({
        length: z.string().optional(),
        width: z.string().optional(),
        height: z.string().optional(),
        weight: z.number().min(0.1, "Weight must be greater than 0"),
      })
    )
    .min(1, "At least one package is required"),
  description: z.string().min(1, "Description is required"),
  declared_value: z
    .number()
    .min(1, "Declared value must be greater than or equal to 1"),
  is_cod: z.boolean(),
  carrier: z.string({
    required_error: "validation.carrierRequired",
  }),
});

const accountTypePersonalSchema = z.object({
  account_type: z.string(),
});

const bankSchema = z.object({
  name: z.string().min(1, "validation.bankNameRequired"),
  holder: z.string().min(1, "validation.bankHolderRequired"),
  account_number: z.string().min(1, "validation.bankAccountNumberRequired"),
  swift_code: z.string().optional(),
  iban: z.string().min(1, "validation.bankIbanRequired"),
});

const accountTypeFreelancerSchema = z.object({
  account_type: z.string(),
  freelancer_id: z.string().min(1, "validation.freelancerIdRequired"),
  freelancer_certificate: z
    .string()
    .min(1, "validation.freelancerCertificateRequired"),
  // freelancer_document: z.object().optional(),
  // civil_id: z.array(z.instanceof(File)).optional(),
  bank: bankSchema,
  address: addressSchema,
});

const accountTypeCompanySchema = z.object({
  account_type: z.string(),
  company_cr: z.string().min(1, "validation.companyCrRequired"),
  unified_national_number: z.string().min(1, "validation.unifiedNationalNumberRequired"),
  vat_id: z.string().optional(),
  bank: bankSchema,
  address: addressSchema,
});

export {
  accountTypeFreelancerSchema,
  accountTypePersonalSchema,
  accountTypeCompanySchema,
  addressSchema,
  step1Schema,
  step2Schema,
};
