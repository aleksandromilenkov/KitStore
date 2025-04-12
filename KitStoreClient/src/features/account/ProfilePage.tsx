import UpdateEmailForm from "./UpdateEmailForm";
import UpdateImageForm from "./UpdateImageForm";
import UpdatePasswordForm from "./UpdatePasswordForm";

const ProfilePage = () => {
    return (
        <>
            <UpdateImageForm/>
            <UpdateEmailForm />
            <UpdatePasswordForm />
        </>
    );
};

export default ProfilePage;
