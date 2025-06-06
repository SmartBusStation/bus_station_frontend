/*export interface TravelAgency  {
    organisationId: string
    short_name: string
    long_name: string
    description: string
    location: string
    business_domains: string[]
    transferable: boolean
    images: string[]
    greeting_message: string
    registration_date: string
    average_revenue: number
    capital_share: number
    registration_number: string
    social_network: string
    tax_number: string
}
*/

export interface TravelAgency
{
    "agencyId": string,
    "organisationId": string,
    "userId": string,
    "longName": string,
    "shortName": string,
    "location": string,
    "socialNetwork": string,
    "description": string,
    "greetingMessage": string
}
