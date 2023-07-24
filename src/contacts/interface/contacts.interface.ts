export interface ContactsIterface {
    name: string;
    email: string;
    mobileNumber: string;
    countryCode: string;
    company: string;
    title: string;
    socialMediaProfiles: Array <string>;
    address: string;
    notes: string;
    relationships: Array <string>;
    activityHistory: Array <Object>;
    verified?: boolean;
    isDeleted: boolean;
}