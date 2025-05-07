export type OrganizationType = "SOLE_PROPRIETORSHIP" | "CORPORATION" | "PARTNERSHIP" | "LLC" | "NONPROFIT";



export interface Organization  {
    long_name: string
    short_name: string
    email: string
    description: string
    business_domains: string[]
    logo_url: string
    type: OrganizationType
    web_site_url: string
    social_network: string
    business_registration_number: string
    tax_number: string
    capital_share: number
    registration_date: string
    ceo_name: string
    year_founded: string
    keywords: string[]
    number_of_employees: number
}