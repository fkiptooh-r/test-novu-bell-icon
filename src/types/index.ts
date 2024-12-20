export interface Notification {
    id: string;
    title: string;
    message: string;
    timestamp: Date;
    isRead: boolean;
}

export interface UserNotification extends Notification {
    userId: string;
    userName: string;
}