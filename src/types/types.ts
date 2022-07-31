export type userInfoType = {
    userName: string;
    userId: string;
}

export type messageType = userInfoType & {
    messageId: string;
    messageText: string;
    created_at: number;
}