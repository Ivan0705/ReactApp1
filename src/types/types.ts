export  type MessagesDataType = { id: number, message: string, likeCount: number }
type ContactsType = {
    github: string,
    vk: string,
    facebook: string,
    instagram: string,
    twitter: string,
    website: string,
    youtube: string,
    mainLink: string

}

export type ProfileType = {
    userId: number,
    lookingForAJob: boolean,
    lookingForAJobDescription: string,
    fullName: string,
    contacts: ContactsType
    aboutMe: string,
    photos: PhotosType

}

export type PhotosType = {
    small: string | null,
    large: string | null
};
export type UserType = {
    id: number,
    name: string,
    status: string,
    photos: PhotosType,
    followed: boolean

}