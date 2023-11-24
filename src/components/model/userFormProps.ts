interface IUserFormProps {
    setUserData: (data: any) => void;
    userData: IUser;
    handleClose: () => void;
    submitting: boolean;
    open: boolean;
    handleSubmit: () => void;
}