import UpdateUsernameForm from "./UpdateUsernameForm";
import UpdateImageForm from "./UpdateImageForm";
import UpdatePasswordForm from "./UpdatePasswordForm";

const ProfilePage = () => {
    return (
        <>
            <UpdateImageForm/>
            <UpdateUsernameForm />
            <UpdatePasswordForm />
        </>
    );
};

export default ProfilePage;
