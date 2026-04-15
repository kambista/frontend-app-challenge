export type ApiListResponse<T> = {
    success: boolean;
    data: T;
};

export type ApiErrorBody = {
    success: false;
    data: {
        name: string;
        title: string;
        message: string;
    };
};
