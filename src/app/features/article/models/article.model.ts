import { Profile } from "../../profile/models/profile.models";

export interface Article {
    slug: string;
    title: string;
    description: string;
    body: string;
    tagList: string[];
    createdAt: string;
    updatedAt: string;
    favorited: boolean;
    favoriesCount: number;
    author: Profile;
}