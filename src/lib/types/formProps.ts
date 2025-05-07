import {Organization} from "@/lib/types/models/Organization";
import {TravelAgency} from "@/lib/types/models/Agency";







export interface BusinessActorFormProps extends ContinueProps {
    changeStep: (step: number) => void
    //register?: UseFormRegister<BusinessActorFormType>,
   // errors?:  Partial<FieldErrorsImpl<DeepRequired<BusinessActorFormType>>> & {root?: Record<string, GlobalError> & GlobalError}
}






export interface OrganizationFormProps  extends ContinueProps{
    createAgency: boolean,
    setCreateAgency: (param: boolean) => void,
    changeStep: (step: number) => void
}



export interface TravelAgencyFormProps extends ContinueProps{
    agencyData: TravelAgency,
    updateAgencyData: (param: (prev: TravelAgency) => TravelAgency) => void
    organizationData: Partial<Organization>
}



export interface ContinueProps{
    agreeTerms: boolean
    step: number
    goBack: ()=>void
    setAgreeTerms: (param: boolean)=> void,
    createAgency?: boolean
}