export interface Log {
    id?: string;
    date: string;
    action: Array<Action>;
    userId: string;
}

export interface Action {
    id?: string;
    action: number; // 1 in ; 0 out
    timeStamp: string;
}